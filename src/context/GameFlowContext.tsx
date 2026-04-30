import { createContext, useContext, useState } from "react";

// define the params in game context state
export interface GameFlowParams {
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

export const initialConfig: GameFlowParams = {
  numberOfPlayers: 2,
  numberOfRounds: 3,
  numberOfCategories: 5,
  categories: [],
  timeLimit: 60,
  passwordRequirement: false,
  password: "",
  letterExclusion: false,
  letters: [],
};

interface GameFlowState {
  gameConfig: GameFlowParams;
  setGameConfig: React.Dispatch<React.SetStateAction<GameFlowParams>>;
  isInitialized: boolean;
  setIsInitialized: React.Dispatch<React.SetStateAction<boolean>>;
}

const GameFlowContext = createContext<GameFlowState | undefined>(undefined);

export function GameSetupProvider({ children }: { children: React.ReactNode }) {
  const [gameConfig, setGameConfig] = useState<GameFlowParams>(initialConfig);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  return (
    <GameFlowContext.Provider
      value={{ gameConfig, setGameConfig, isInitialized, setIsInitialized }}
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
