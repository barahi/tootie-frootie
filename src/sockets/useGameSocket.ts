import { useEffect, useRef, useState, useCallback } from "react";
import { Player, RoomSettings, StartRoundPayload } from "./types";
import { useNavigate } from "react-router-dom";

const SOCKET_BASE_URL = "ws://localhost:8081/ws/tootiefrootie/";

export function useGameSocket(
  playerId: string,
  roomId: string,
  roomPassword?: string,
  shouldConnect: boolean = true,
) {
  const ws = useRef<WebSocket | null>(null);
  const [connection, setConnection] = useState<boolean>(false);
  const [players, setPlayers] = useState<Player[]>([]);
  const [settings, setSettings] = useState<RoomSettings | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!shouldConnect || !playerId || !roomId) return;

    let socketUrl = `${SOCKET_BASE_URL}${playerId}?roomId=${roomId}`;
    if (roomPassword && roomPassword.trim() !== "") {
      socketUrl += `&roomPassword=${encodeURIComponent(roomPassword)}`;
    }

    const socket = new WebSocket(socketUrl);
    ws.current = socket;

    socket.onopen = () => {
      setConnection(true);
    };

    socket.onmessage = (event) => {
      try {
        const eventData = JSON.parse(event.data);
        console.log("Web socket event received: ", eventData);
        switch (eventData.type) {
          case "PLAYER_JOINED":
            if (eventData.payload.players) {
              setPlayers(eventData.payload.players);
            }
            if (eventData.payload.settings) {
              setSettings(eventData.payload.settings);
            }
            break;

          case "ERROR":
            if (eventData.payload?.message) {
              console.error(
                "Server verification failed:",
                eventData.payload.message,
              );
              setError(eventData.payload.message);
            }
            break;

          case "START_ROUND":
            const startRoundPayload = eventData.payload as StartRoundPayload;
            console.log(
              "got letter: " +
                startRoundPayload.roundLetter +
                " and round number " +
                startRoundPayload.roundNumber,
            );
            navigate(`/submit/${roomId}`);
            break;

          case "TIME_UP":
            //TODO: Stop players from changing or adding answers and make up json body of answers
            break;

          case "SUBMIT_ANSWERS":
            //TODO: Send over round answers
            break;
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
        socket.close();
      }
    };
  }, [playerId, roomId, roomPassword, shouldConnect]);

  const sendMessage = useCallback((type: string, payload?: any) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      const messageLoad = { type: payload };
      console.log("sending socket message: " + messageLoad);
      ws.current.send(JSON.stringify(messageLoad));
    } else {
      console.error("Socket not open, cannot send message");
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return { connection, players, settings, sendMessage, error, clearError };
}
