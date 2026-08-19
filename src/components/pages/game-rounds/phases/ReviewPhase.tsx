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
  const [alreadyVoted, setAlreadyVoted] = useState<boolean>(false);
  const [isReviewed, setIsReviewed] = useState<boolean>(false);
  const [closeButtonVisible, setCloseButtonVisible] = useState<boolean>(false);

  const {
    sendMessage,
    votePhaseActive,
    flaggedAnswer,
    resetFlaggedAnswer,
    voteResults,
  } = gameData;

  const showVoteCard = votePhaseActive && flaggedAnswer !== null;
  console.log("show vote card? " + showVoteCard);

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

  const flagAnswer = (
    playerName: string,
    playerAnswer: string,
    category: string,
  ) => {
    console.log("got answer: " + playerAnswer.trim());
    if (
      playerAnswer.trim() === "No Answer" ||
      playerAnswer.trim().length === 0
    ) {
      console.log("Cannot flag empty answer");
      return;
    }
    const payload = {
      category: category,
      targetedPlayer: playerName,
      triggeredByPlayer: currUsername,
      answer: playerAnswer,
    };
    sendMessage("BEGIN_VOTE_PHASE", payload);
  };

  const submitVoteDecision = (username: string, decision: boolean) => {
    if (alreadyVoted) {
      alert("Already voted");
      return;
    }

    const payload = {
      category: flaggedAnswer!.category,
      targetPlayer: flaggedAnswer!.targetedPlayer,
      voterPlayer: currUsername,
      vote: decision,
    };
    sendMessage("SUBMIT_VOTE", payload);
    setAlreadyVoted(true);
  };

  const onTimeExpire = () => {
    setCloseButtonVisible(true);
    const payload = {
      category: flaggedAnswer!.category,
      targetPlayer: flaggedAnswer!.targetedPlayer,
      answer: flaggedAnswer!.answer,
    };
    sendMessage("END_VOTE_ROUND", payload);
    setIsReviewed(true);
  };

  const handleCloseButton = () => {
    resetFlaggedAnswer();
    setCloseButtonVisible(false);
    setAlreadyVoted(true);
    handleEndReview();
  };

  const handleEndReview = () => {
    sendMessage("END_ROUND");
    resetFlaggedAnswer();
  };

  return (
    <Layout phaseName="Review Phase">
      <div>
        {showVoteCard && (
          <VoteAnswerCard
            category={flaggedAnswer!.category}
            targetedPlayer={flaggedAnswer!.targetedPlayer}
            triggeredByPlayer={flaggedAnswer!.triggeredByPlayer}
            answerToReview={flaggedAnswer!.answer}
            submitVoteDecision={submitVoteDecision}
            isReviewed={isReviewed}
            approvingVotes={voteResults?.validAnswerVotes}
            invalidatingVotes={voteResults?.invalidAnswerVotes}
            closeButtonVisible={closeButtonVisible}
            handleButtonClose={handleCloseButton}
            onTimeExpire={onTimeExpire}
          />
        )}

        <div className="flex justify-center w-full">
          <div className="flex flex-col gap-8">
            {formattedRoundScoreData.map(
              (categoryData: CategoryReviewRoundCompilation) => (
                <div className="flex flex-col max-w-3xl gap-2 p-6 bg-white border-none rounded-xl">
                  <div className="flex flex-row gap-1">
                    <p className="mb-2 text-sm font-thin tracking-wide">
                      Category:
                    </p>
                    <p className="mb-2 text-sm font-semibold tracking-wide">
                      {categoryData.category}
                    </p>
                  </div>

                  <div className="w-full grid gap-y-[1rem] gap-x-[4rem] grid-cols-2">
                    {categoryData.playerAnswers.map(
                      (playerAnswer: ReviewRoundScore) => (
                        <ReviewPhasePlayerScoreCard
                          key={playerAnswer.username}
                          isMe={playerAnswer.username === currUsername}
                          playerName={playerAnswer.username}
                          playerAnswer={playerAnswer.answer}
                          playerScore={playerAnswer.points}
                          flaggingFunction={() =>
                            flagAnswer(
                              playerAnswer.username,
                              playerAnswer.answer,
                              categoryData.category,
                            )
                          }
                        />
                      ),
                    )}
                  </div>
                </div>
              ),
            )}
            <div className="flex justify-end col-span-2">
              <PlainColoredButton
                buttonTitle={"Finish Review"}
                nextFunction={handleEndReview}
                className="w-full h-[2rem] "
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ReviewPhase;
