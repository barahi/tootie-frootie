import SubmitPhase from "./SubmitPhase";
import ReviewPhase from "./ReviewPhase";
import VotePhase from "./VotePhase";
import ScorePhase from "./ScorePhase";

type RoundPhase = "SUBMIT" | "REVIEW" | "VOTE" | "SCORE";

type GamePhase = {
  round: Number;
  totalRounds: Number;
  roundPhase: RoundPhase;
  // players: Player[],
  // answers: Answer[],
  // scores: scoreMap,
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
