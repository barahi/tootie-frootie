import { useEffect, useRef, useState, useCallback } from "react";
import {
  Player,
  RoomSettings,
  RoundScoresPayload,
  StartRoundPayload,
  FlaggedAnswerPayload,
  VoteRoundResultPayload,
  RoundResultsPayload,
  EndGamePayload,
  EarlyStopPayload,
} from "./types";

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
  const [cumulativeScores, setCumulativeScores] = useState<Map<
    string,
    number
  > | null>(new Map());
  const [settings, setSettings] = useState<RoomSettings | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [startRoundData, setStartRoundData] =
    useState<StartRoundPayload | null>(null);
  const [earlyStop, setEarlyStop] = useState<EarlyStopPayload | null>(null);
  const [isTimeUp, setIsTimeUp] = useState<boolean>(false);
  const [roundScores, setRoundScores] = useState<RoundScoresPayload | null>(
    null,
  );
  const [votePhaseActive, setVotePhaseActive] = useState<boolean>(false);
  const [flaggedAnswer, setFlaggedAnswer] =
    useState<FlaggedAnswerPayload | null>(null);
  const [voteResults, setVoteResults] = useState<VoteRoundResultPayload | null>(
    null,
  );
  const [roundResults, setRoundResults] = useState<RoundResultsPayload | null>(
    null,
  );
  const [endGameData, setEndGameData] = useState<EndGamePayload | null>(null);

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
              setError(eventData.payload.message);
            }
            break;

          case "START_ROUND": {
            const startRoundPayload = eventData.payload as StartRoundPayload;

            setEarlyStop(null);
            setIsTimeUp(false);
            setRoundScores(null);
            setRoundResults(null);
            setVotePhaseActive(false);
            setFlaggedAnswer(null);
            setVoteResults(null);
            setStartRoundData(startRoundPayload);
            break;
          }
          case "EARLY_STOP":
            const earlyStopPayload = eventData.payload as EarlyStopPayload;
            setEarlyStop(earlyStopPayload);
            break;

          case "TIME_UP":
            setIsTimeUp(true);
            break;

          case "ROUND_SCORES":
            const roundScoresPayload = eventData.payload as RoundScoresPayload;
            setRoundScores(roundScoresPayload);
            break;

          case "FLAGGED_ANSWER":
            const flaggedAnswerPayload =
              eventData.payload as FlaggedAnswerPayload;
            setFlaggedAnswer(flaggedAnswerPayload);
            setVotePhaseActive(true);
            break;

          case "VOTE_RESULTS":
            const voteResultsPayload =
              eventData.payload as VoteRoundResultPayload;

            setVoteResults(voteResultsPayload);
            break;

          case "ROUND_RESULTS": {
            console.log(
              "Received round results from backend:",
              eventData.payload,
            );
            const roundResultsPayload =
              eventData.payload as RoundResultsPayload;

            setEarlyStop(null);
            setIsTimeUp(false);
            setRoundScores(null);
            setRoundResults(roundResultsPayload);

            if (roundResultsPayload.playerScores) {
              setCumulativeScores(roundResultsPayload.playerScores);
            }
            break;
          }

          case "END_GAME":
            const endGamePayload = eventData.payload as EndGamePayload;
            setEndGameData(endGamePayload);
            break;
        }
      } catch (error) {
        console.error("Error parsing web socket message: ", error);
      }
    };

    socket.onclose = (event) => {
      console.log(
        `Web socket connection closed. Code: ${event.code}, Reason: ${event.reason}`,
      );
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
      const messageLoad: any = { type: type };

      if (payload !== undefined) {
        messageLoad.payload = payload;
      }
      console.log("sending socket message: " + JSON.stringify(messageLoad));
      ws.current.send(JSON.stringify(messageLoad));
    } else {
      console.error("Socket not open, cannot send message " + type);
    }
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const resetRoundState = useCallback(() => {
    setStartRoundData(null);
    setIsTimeUp(false);
  }, []);

  const resetFlaggedAnswer = useCallback(() => {
    setVotePhaseActive(false);
    setFlaggedAnswer(null);
  }, []);

  const resetVoteResults = useCallback(() => {
    setVoteResults(null);
  }, []);

  return {
    connection,
    players,
    cumulativeScores,
    settings,
    error,
    startRoundData,
    earlyStop,
    isTimeUp,
    roundScores,
    votePhaseActive,
    flaggedAnswer,
    voteResults,
    roundResults,
    endGameData,
    sendMessage,
    clearError,
    resetRoundState,
    resetFlaggedAnswer,
    resetVoteResults,
  };
}
