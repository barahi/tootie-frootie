import Layout from "../PhaseLayout";
import { useState } from "react";
import ReviewPhasePlayerScoreCard from "../../../shared/tags/ReviewPhasePlayerScoreCard";
import PlainColoredButton from "../../../shared/buttons/PlainColoredButton";
import VoteAnswerCard from "../../../shared/cards/VoteAnswerCard";
import {
  ReviewRoundScore,
  CategoryReviewRoundCompilation,
} from "../../../../sockets/types";
import { useGameSocket } from "../../../../sockets/useGameSocket";

type ReviewPhaseProps = {
  gameData: ReturnType<typeof useGameSocket>;
};

function ReviewPhase({ gameData }: ReviewPhaseProps) {
  const currUsername = sessionStorage.getItem("username");
  const [categoryIdx, setCategoryIdx] = useState<number>(0);
  const [votingAllowed, setVotingAllowed] = useState<boolean>(true);

  const { sendMessage, votePhaseActive, flaggedAnswer, resetFlaggedAnswer } =
    gameData;
  console.log("ReviewPhase Render Check:", { votePhaseActive, flaggedAnswer });

  const showVoteCard = votePhaseActive && flaggedAnswer !== null;

  const roundScores = gameData.roundScores;
  const roundScoreMap = roundScores?.roundScoreMap || {};

  const formattedRoundScoreData: CategoryReviewRoundCompilation[] =
    Object.entries(roundScoreMap).map(
      ([category, playerAnswerFull]: [string, any]) => {
        const results: ReviewRoundScore[] = Object.entries(
          playerAnswerFull,
        ).map(([username, answerToPoints]: [string, any]) => ({
          username: username,
          answer: answerToPoints.answer || "No Answer",
          points: answerToPoints.points || 0,
        }));
        return {
          category: category,
          playerAnswers: results,
        };
      },
    );

  const currentCategoryData = formattedRoundScoreData[categoryIdx];
  const isLastCategory = categoryIdx === formattedRoundScoreData.length - 1;

  const handleNextCategory = () => {
    if (!isLastCategory) {
      setCategoryIdx(categoryIdx + 1);
    } else {
      console.log("End of categories");
      resetFlaggedAnswer();
    }
  };

  const flagAnswer = (playerName: string, playerAnswer: string) => {
    const payload = {
      category: currentCategoryData.category,
      targetedPlayer: playerName,
      triggeredByPlayer: currUsername,
      answer: playerAnswer,
    };
    console.log("flagging answer: " + JSON.stringify(payload));
    sendMessage("BEGIN_VOTE_PHASE", payload);
  };

  const submitVoteDecision = (username: string, decision: boolean) => {
    if (!votingAllowed) {
      alert("Already voted");
      return;
    }
    // TO DO: add function to submit results to backend
    console.log(username + ` ${decision ? "approved" : "invalidated"}`);
  };

  // TO DO: fetch results from backend
  const results = {
    acceptedVotes: 3,
    rejectedVotes: 5,
  };

  return (
    <Layout phaseName="Review Phase">
      <div>
        {showVoteCard && (
          <VoteAnswerCard
            category={flaggedAnswer.category}
            targetedPlayer={flaggedAnswer.targetedPlayer}
            triggeredByPlayer={flaggedAnswer.triggeredByPlayer}
            answerToReview={flaggedAnswer.answer}
            submitVoteDecision={submitVoteDecision}
            isReviewed={votingAllowed}
            setIsReviewed={setVotingAllowed}
            results={results}
          />
        )}

        <div className="flex flex-row justify-center w-full">
          <div className="flex flex-col w-[80%] max-w-3xl bg-white border-none rounded-xl p-6 gap-2">
            <div className="flex flex-row gap-1">
              <p className="mb-2 text-sm font-thin tracking-wide">Category:</p>
              <p className="mb-2 text-sm font-semibold tracking-wide">
                {currentCategoryData.category}
              </p>
            </div>

            <div className="w-full grid gap-y-[1rem] gap-x-[4rem] grid-cols-2">
              {currentCategoryData.playerAnswers.map((player) => (
                <ReviewPhasePlayerScoreCard
                  key={player.username}
                  isMe={player.username === currUsername}
                  playerName={player.username}
                  playerAnswer={player.answer}
                  playerScore={player.points}
                  flaggingFunction={() =>
                    flagAnswer(player.username, player.answer)
                  }
                />
              ))}

              <div className="flex justify-end col-span-2 mt-4">
                <PlainColoredButton
                  buttonTitle={
                    isLastCategory ? "Finish Review" : "Review next category"
                  }
                  nextFunction={handleNextCategory}
                  className="w-full h-[2rem]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ReviewPhase;
