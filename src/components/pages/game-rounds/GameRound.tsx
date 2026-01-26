import SubmitPhase from "./phases/SubmitPhase";
import ReviewPhase from "./phases/ReviewPhase";
import VotePhase from "./phases/VotePhase";
import ScorePhase from "./phases/ScorePhase";

type RoundPhase = "SUBMIT" | "REVIEW" | "VOTE" | "SCORE";

type GamePhase = {
  round: Number;
  totalRounds: Number;
  roundPhase: RoundPhase;
  // TODO: ADD players, answers, categories, scores from backend
};

function GameRound({ gamePhase }: { gamePhase: GamePhase }) {
  switch (gamePhase.roundPhase) {
    case "SUBMIT":
      return <SubmitPhase />;
    case "REVIEW":
      return <ReviewPhase />;
    case "VOTE":
      return <VotePhase />;
    case "SCORE":
      return <ScorePhase />;
    default:
      return <div>Invalid Phase</div>;
  }
}

export default GameRound;
