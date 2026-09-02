import { useEffect, useRef, useState } from "react";
import PlayerInfoTag from "../../../shared/tags/PlayerInfoTag";
import { CategoryInput } from "../../../shared/user-input/basic-label-input/CategoryInput";
import PlainColoredButton from "../../../shared/buttons/PlainColoredButton";
import Timer from "../../../shared/icons/Timer";
import PhaseLayout from "../PhaseLayout";
import LoadingAnimation from "../../../shared/cards/LoadingAnimation";
import { useGameSocket } from "../../../../sockets/useGameSocket";
import { Leaderboard } from "../../../shared/tags/Leaderboard";
import ErrorMessageCard from "../../../shared/cards/ErrorMessageCard";

type SubmitPhaseProps = {
  gameData: ReturnType<typeof useGameSocket>;
};

function SubmitPhase({ gameData }: SubmitPhaseProps) {
  const playerId = sessionStorage.getItem("id")!;
  const username = sessionStorage.getItem("username")!;

  const [answersAllowed, setAnswersAllowed] = useState<boolean>(true);
  const [categoryAnswers, setCategoryAnswers] = useState<Map<string, string>>(
    new Map(),
  );
  const [errorMessage, setErrorMessage] = useState<string>("");

  const {
    startRoundData,
    players,
    settings,
    isTimeUp,
    earlyStop,
    sendMessage,
    cumulativeScores,
  } = gameData;

  const roundLetter = startRoundData?.letterForRound || "";
  const roundNumber = startRoundData?.roundNumber || 1;

  let scores: [string, number][] = [];
  if (roundNumber > 1 && cumulativeScores) {
    scores = Object.entries(cumulativeScores).sort(
      ([, scoreA], [, scoreB]) => scoreB - scoreA,
    );
  }

  const answersSubmittedForRound = useRef<number | null>(null);

  useEffect(() => {
    setAnswersAllowed(true);
  }, [roundNumber]);

  useEffect(() => {
    const isStopped = earlyStop != null || isTimeUp;
    if (!isStopped || answersSubmittedForRound.current === roundNumber) return;

    answersSubmittedForRound.current = roundNumber;
    setAnswersAllowed(false);

    const roundAnswers = Object.fromEntries(categoryAnswers);
    const payload = {
      roundNumber: roundNumber,
      playerId: playerId,
      roundAnswers: roundAnswers,
    };
    sendMessage("SUBMIT_ANSWERS", payload);
  }, [
    earlyStop,
    isTimeUp,
    categoryAnswers,
    playerId,
    roundNumber,
    sendMessage,
  ]);

  useEffect(() => {
    if (settings?.categories) {
      const initialMap = new Map<string, string>();
      settings.categories.forEach((cat: string) => {
        initialMap.set(cat, "");
      });
      setCategoryAnswers(initialMap);
    }
  }, [settings?.categories, roundNumber]);

  const totalRounds = settings?.numberOfRounds;
  const categories = settings?.categories || [];
  const timeLimit = settings?.roundDuration;

  const addCategoryAnswer = (category: string, answer: string) => {
    if (!answersAllowed) return;
    setCategoryAnswers((prev) => {
      const updated = new Map(prev);
      updated.set(category, answer);
      return updated;
    });
  };

  const endRound = () => {
    for (const [, val] of categoryAnswers) {
      const formatted = (val || "").trim().toUpperCase();
      const targetLetter = (roundLetter || "").toUpperCase();
      if (!formatted.startsWith(targetLetter) || formatted.length < 1) {
        setErrorMessage(
          "Answers must start with the chosen letter and be longer than 1 character",
        );
        return;
      }
    }
    sendMessage("TRIGGER_STOP", username);
  };

  if (!gameData) {
    return (
      <div className="p-8 text-center">
        Connecting to socket infrastructure...
      </div>
    );
  }

  return (
    <LoadingAnimation
      serverLoading={!settings || settings === undefined}
      minimumTime={700}
    >
      <PhaseLayout phaseName={`Round ${roundNumber}/${totalRounds}`}>
        <div className="flex flex-row w-full items-start justify-center gap-[2%]">
          {/* Leaderboard Part */}
          <div className="flex flex-col w-[20%] bg-white border-none rounded-xl p-4">
            <p className="mb-2 text-sm font-thin tracking-wide">Leaderboard</p>
            <div className="flex flex-col w-full gap-2">
              {roundNumber > 1 ? (
                <Leaderboard username={username} scores={scores} />
              ) : (
                players.map((p: any, idx: number) => (
                  <PlayerInfoTag
                    key={p.id || idx}
                    number={idx + 1}
                    name={p.username}
                    className="border-none"
                  />
                ))
              )}
            </div>
          </div>

          {/* Category Inputs Part */}
          <div className="flex flex-col w-[50%] bg-white border-none rounded-xl px-4 py-4">
            <div className="flex justify-between w-full">
              <div className="flex flex-col">
                <p className="font-light tracking-wide text-gray-900 text-md">
                  Enter your answers
                </p>
                <div className="flex flex-row items-center justify-start gap-2">
                  <p className="font-thin tracking-wide text-gray-900 text-md">
                    All answers must start with the letter
                  </p>
                  <span className="px-[10px] py-[5px] rounded-xl font-medium text-md bg-gray-50">
                    {roundLetter.toUpperCase()}
                  </span>
                </div>
              </div>
              {!isTimeUp && !earlyStop ? (
                <Timer
                  key={roundNumber}
                  totalSeconds={timeLimit || 30}
                  onTimeExpire={() => setAnswersAllowed(false)}
                />
              ) : (
                <div className="font-bold tracking-wide">00:00</div>
              )}
            </div>

            <div className="flex flex-col w-full gap-4 mt-2 mb-2">
              {categories.map((cat: string, idx: number) => (
                <CategoryInput
                  key={idx}
                  name={cat}
                  num={idx}
                  input={categoryAnswers.get(cat) || ""}
                  canAddInput={answersAllowed}
                  setInput={(value) => {
                    addCategoryAnswer(cat, value);
                  }}
                />
              ))}
            </div>
            <div className="flex items-center justify-center text-align">
              {errorMessage && <ErrorMessageCard message={errorMessage} />}
            </div>
            <div className="flex justify-center mt-4">
              <PlainColoredButton
                buttonTitle="Finish"
                nextFunction={endRound}
              />
            </div>
          </div>
        </div>
      </PhaseLayout>
    </LoadingAnimation>
  );
}

export default SubmitPhase;
