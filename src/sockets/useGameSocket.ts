import { useEffect, useRef, useState } from "react";
import { Player, RoomSettings } from "./types";

const SOCKET_BASE_URL = "ws://localhost:8081/ws/tootiefrootie/";

export function useGameSocket(
  playerId: string,
  roomId: string,
  roomPassword?: string,
) {
  const ws = useRef<WebSocket | null>(null);
  const [connection, setConnection] = useState<boolean>(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [settings, setSettings] = useState<RoomSettings | null>(null);

  useEffect(() => {
    if (!playerId || !roomId) return;

    let socketUrl = `${SOCKET_BASE_URL}${playerId}?roomId=${roomId}`;
    if (roomPassword) {
      socketUrl += `&roomPassword=${encodeURIComponent(roomPassword)}`;
    }

    const socket = new WebSocket(socketUrl);
    ws.current = socket;

    socket.onopen = () => {
      console.log("web socket connection established");
      setConnection(true);
    };

    socket.onmessage = (event) => {
      try {
        const eventData = JSON.parse(event.data);
        console.log("Web socket event received: ", eventData);
        if (eventData.type === "PLAYER_JOINED" && eventData.payload) {
          if (eventData.payload.players) {
            setPlayers(eventData.payload.players);
          }
          if (eventData.payload.settings) {
            setSettings(eventData.payload.settings);
          }
        }
      } catch (error) {
        console.error("Error parsing web socket message: ", error);
      }
    };

    socket.onclose = () => {
      console.log("web socket connection closed");
      setConnection(false);
    };

    socket.onerror = (error) => {
      console.log("web socket error: ", error);
    };

    return () => {
      if (
        socket.readyState === WebSocket.OPEN ||
        socket.readyState === WebSocket.CONNECTING
      ) {
        console.log("Cleaning up socket connection");
        socket.close();
      }
    };
  }, [playerId, roomId, roomPassword]);
  return { connection, players, settings };
}
