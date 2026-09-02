import SubmitPhase from "./phases/SubmitPhase";
import ReviewPhase from "./phases/ReviewPhase";
import ScorePhase from "./phases/ScorePhase";
import FinalScorePhase from "./phases/FinalScorePhase";
import { useGameSetup } from "../../../context/GameFlowContext";
import TimesUpCard from "../../shared/cards/TimesUpCard";
import { useState, useEffect } from "react";

function GameRound() {
  const gameData = useGameSetup();
  const { currentPhase, isTimeUp, earlyStop } = gameData;

  const [overlayMessage, setOverlayMessage] = useState<string>("");
  const [showOverlay, setShowOverlay] = useState<boolean>(false);
  const [triggeredByUser, setTriggeredByUser] = useState<string>("");

  useEffect(() => {
    if (earlyStop != null) {
      setOverlayMessage("Early stop");
      setTriggeredByUser(earlyStop.triggeredBy);
      setShowOverlay(true);

      const timer = setTimeout(() => {
        setShowOverlay(false);
      }, 2500);

      return () => clearTimeout(timer);
    } else if (isTimeUp) {
      setOverlayMessage("Time's up");
      setTriggeredByUser("");
      setShowOverlay(true);

      const timer = setTimeout(() => {
        setShowOverlay(false);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [earlyStop, isTimeUp]);

  if (!gameData.settings || gameData.players.length === 0) {
    return <div className="mt-10 text-center">Loading game room state...</div>;
  }

  return (
    <TimesUpCard
      message={overlayMessage}
      triggeredBy={triggeredByUser}
      showCard={showOverlay}
    >
      {(() => {
        switch (currentPhase) {
          case "SUBMIT":
            return <SubmitPhase gameData={gameData} />;
          case "REVIEW":
            return <ReviewPhase gameData={gameData} />;
          case "SCORE":
            return <ScorePhase gameData={gameData} />;
          case "FINAL":
            return <FinalScorePhase gameData={gameData} />;
          default:
            return <SubmitPhase gameData={gameData} />;
        }
      })()}
    </TimesUpCard>
  );
}

export default GameRound;
