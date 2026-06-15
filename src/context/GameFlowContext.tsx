import { createContext, useContext, useState } from "react";

// define the params in game context state
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
  isInitialized: boolean;
  setIsInitialized: React.Dispatch<React.SetStateAction<boolean>>;
}

const GameFlowContext = createContext<GameFlowState | undefined>(undefined);

export function GameSetupProvider({ children }: { children: React.ReactNode }) {
  const [gameConfig, setGameConfig] = useState<GameFlowParams | null>(null);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  return (
    <GameFlowContext.Provider
      value={{
        gameConfig,
        setGameConfig,
        isInitialized,
        setIsInitialized,
      }}
    >
      {children}
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
