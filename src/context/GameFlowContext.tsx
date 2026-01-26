import { createContext, useContext, useState } from "react";

// define the params in game context state
export interface GameFlowParams {
  numberOfPlayers?: number;
  numberOfRounds?: number;
  numberOfCategories?: number;
  categories?: string[];
  timeLimit?: number;
  passwordRequirement?: boolean;
  password: string;
  letterExclusion?: boolean;
  letters: string[];
}

const initialConfig: GameFlowParams = {
  numberOfPlayers: undefined,
  numberOfRounds: undefined,
  numberOfCategories: undefined,
  categories: [],
  timeLimit: undefined,
  passwordRequirement: false,
  password: "",
  letterExclusion: false,
  letters: [],
};

interface GameFlowState {
  gameConfig: GameFlowParams;
  setGameConfig: React.Dispatch<React.SetStateAction<GameFlowParams>>;
}

const GameFlowContext = createContext<GameFlowState | undefined>(undefined);

export function GameSetupProvider({ children }: { children: React.ReactNode }) {
  const [gameConfig, setGameConfig] = useState<GameFlowParams>(initialConfig);

  return (
    <GameFlowContext.Provider value={{ gameConfig, setGameConfig }}>
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
