import SubmitPhase from "./phases/SubmitPhase";
import ReviewPhase from "./phases/ReviewPhase";
import ScorePhase from "./phases/ScorePhase";
import FinalScorePhase from "./phases/FinalScorePhase";
import { useGameSetup } from "../../../context/GameFlowContext";

function GameRound() {
  const gameData = useGameSetup();

  if (!gameData.settings || gameData.players.length === 0) {
    return <div className="mt-10 text-center">Loading game room state...</div>;
  }

  switch (gameData.currentPhase) {
    case "SUBMIT":
      return <SubmitPhase gameData={gameData} />;
    case "REVIEW":
      return <ReviewPhase gameData={gameData} />;
    case "SCORE":
      return <ScorePhase gameData={gameData} />;
    case "FINAL":
      return <FinalScorePhase gameData={gameData} />;
    default:
      throw new Error("404: Page not found");
  }
}

export default GameRound;
