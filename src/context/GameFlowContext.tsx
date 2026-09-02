import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import { useGameSocket } from "../sockets/useGameSocket";
import { Outlet, useParams } from "react-router-dom";
import { RoomSettings } from "../sockets/types";

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
  currentPhase: "SUBMIT" | "REVIEW" | "SCORE" | "FINAL";
  isInitialized: boolean;
  setIsInitialized: React.Dispatch<React.SetStateAction<boolean>>;
  currentRound: number;
  changeRound: () => void;
  connection: boolean;
  players: any[];
  cumulativeScores: Map<string, number> | null;
  settings: any | null;
  sendMessage: (type: string, payload?: any) => void;
  error: string | null;
  clearError: () => void;
  startRoundData: any | null;
  earlyStop: any | null;
  isTimeUp: boolean;
  roundScores: any | null;
  resetRoundState: () => void;
  votePhaseActive: boolean;
  flaggedAnswer: any | null;
  resetFlaggedAnswer: () => void;
  voteResults: any | null;
  resetVoteResults: () => void;
  roundResults: any | null;
  endGameData: any | null;
}

const GameFlowContext = createContext<GameFlowState | undefined>(undefined);

export function GameSetupProvider({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [gameConfig, setGameConfig] = useState<GameFlowParams | null>(null);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const [currentRound] = useState<number>(1);

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
    const s: RoomSettings = socket.settings!;
    if (socket.settings) {
      setGameConfig({
        roomId: s.id || activeRoomId || "",
        hostPlayerId: s.hostPlayerId || "",
        numberOfPlayers: s.maxPlayers || 0,
        numberOfRounds: s.numberOfRounds || 0,
        numberOfCategories: s.categories?.length || 0,
        categories: s.categories || [],
        timeLimit: s.roundDuration || 0,
        passwordRequirement: Boolean(s.password && s.password.trim() !== ""),
        password: s.password || activePassword || "",
        letterExclusion: Boolean(
          s.excludedLetters && s.excludedLetters.length > 0,
        ),
        letters: s.excludedLetters ?? [],
      });
    }
  }, [socket.settings, activeRoomId, activePassword]);

  const totalRounds =
    socket.settings?.numberOfRounds ?? gameConfig?.numberOfRounds ?? 0;

  const currentPhase: "SUBMIT" | "REVIEW" | "SCORE" | "FINAL" = useMemo(() => {
    if (socket.endGameData) return "FINAL";
    if (socket.roundResults) return "SCORE";
    if (socket.roundScores) return "REVIEW";
    return "SUBMIT";
  }, [socket.endGameData, socket.roundResults, socket.roundScores]);

  const changeRound = useCallback(() => {
    if (currentRound < totalRounds) {
      socket.sendMessage("START_ROUND");
    } else {
      socket.sendMessage("END_GAME");
    }
  }, [currentRound, socket, totalRounds]);

  return (
    <GameFlowContext.Provider
      value={{
        gameConfig,
        setGameConfig,
        currentPhase,
        isInitialized,
        setIsInitialized,
        currentRound,
        changeRound,
        connection: socket.connection,
        players: socket.players,
        cumulativeScores: socket.cumulativeScores,
        settings: socket.settings,
        sendMessage: socket.sendMessage,
        error: socket.error,
        clearError: socket.clearError,
        startRoundData: socket.startRoundData,
        earlyStop: socket.earlyStop,
        isTimeUp: socket.isTimeUp,
        roundScores: socket.roundScores,
        resetRoundState: socket.resetRoundState,
        votePhaseActive: socket.votePhaseActive,
        flaggedAnswer: socket.flaggedAnswer,
        resetFlaggedAnswer: socket.resetFlaggedAnswer,
        voteResults: socket.voteResults,
        resetVoteResults: socket.resetVoteResults,
        roundResults: socket.roundResults,
        endGameData: socket.endGameData,
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
