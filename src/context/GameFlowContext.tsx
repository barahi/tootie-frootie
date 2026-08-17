import { createContext, useContext, useEffect, useState } from "react";
import { useGameSocket } from "../sockets/useGameSocket";
import { Outlet, useParams } from "react-router-dom";

export interface GameFlowParams {
  roomId: string;
  hostPlayerId: string;
  numberOfPlayers: number;
  numberOfRounds: number;
  numberOfCategories: number;
  categories: string[];
  timeLimit: number;
  passwordRequirement: boolean;
  password: string;
  letterExclusion: boolean;
  letters: string[];
}

interface GameFlowState {
  gameConfig: GameFlowParams | null;
  setGameConfig: React.Dispatch<React.SetStateAction<GameFlowParams | null>>;
  currentPhase: "SUBMIT" | "REVIEW" | "SCORE";
  setCurrentPhase: React.Dispatch<
    React.SetStateAction<"SUBMIT" | "REVIEW" | "SCORE">
  >;
  isInitialized: boolean;
  setIsInitialized: React.Dispatch<React.SetStateAction<boolean>>;
  connection: boolean;
  players: any[];
  settings: any | null;
  sendMessage: (type: string, payload?: any) => void;
  error: string | null;
  clearError: () => void;
  startRoundData: any | null;
  isTimeUp: boolean;
  roundScores: any | null;
  resetRoundState: () => void;
  votePhaseActive: boolean;
  flaggedAnswer: any | null;
  resetFlaggedAnswer: () => void;
  voteResults: any | null;
  resetVoteResults: () => void;
  roundResults: any | null;
  resetRoundResults: () => void;
}

const GameFlowContext = createContext<GameFlowState | undefined>(undefined);

export function GameSetupProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [gameConfig, setGameConfig] = useState<GameFlowParams | null>(null);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  const [currentPhase, setCurrentPhase] = useState<
    "SUBMIT" | "REVIEW" | "SCORE"
  >("SUBMIT");

  const playerId = sessionStorage.getItem("id") || "";
  const { roomId: urlRoomId } = useParams<{ roomId: string }>();

  const activeRoomId =
    urlRoomId || gameConfig?.roomId || sessionStorage.getItem("roomId") || "";

  const activePassword = gameConfig?.password || undefined;

  const shouldConnect =
    !!activeRoomId &&
    activeRoomId !== "undefined" &&
    activeRoomId !== "" &&
    !!playerId;

  const socket = useGameSocket(
    playerId,
    activeRoomId,
    activePassword,
    shouldConnect,
  );

  useEffect(() => {
    if (socket.roundScores) {
      setCurrentPhase("REVIEW");
    }
  }, [socket.roundScores]);

  useEffect(() => {
    if (socket.roundResults) {
      setCurrentPhase("SCORE");
    }
  }, [socket.roundResults]);

  return (
    <GameFlowContext.Provider
      value={{
        gameConfig,
        setGameConfig,
        currentPhase,
        setCurrentPhase,
        isInitialized,
        setIsInitialized,
        connection: socket.connection,
        players: socket.players,
        settings: socket.settings,
        sendMessage: socket.sendMessage,
        error: socket.error,
        clearError: socket.clearError,
        startRoundData: socket.startRoundData,
        isTimeUp: socket.isTimeUp,
        roundScores: socket.roundScores,
        resetRoundState: socket.resetRoundState,
        votePhaseActive: socket.votePhaseActive,
        flaggedAnswer: socket.flaggedAnswer,
        resetFlaggedAnswer: socket.resetFlaggedAnswer,
        voteResults: socket.voteResults,
        resetVoteResults: socket.resetVoteResults,
        roundResults: socket.roundResults,
        resetRoundResults: socket.resetRoundResults,
      }}
    >
      {children ? children : <Outlet />}
    </GameFlowContext.Provider>
  );
}

export function useGameSetup() {
  const gameContext = useContext(GameFlowContext);
  if (!gameContext) {
    throw new Error("useGameSetup must be used inside a GameSetupProvider");
  }
  return gameContext;
}
