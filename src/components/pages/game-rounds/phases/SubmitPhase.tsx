import { useEffect, useState } from "react";
import PlayerInfoTag from "../../../shared/tags/PlayerInfoTag";
import { CategoryInput } from "../../../shared/user-input/basic-label-input/CategoryInput";
import PlainColoredButton from "../../../shared/buttons/PlainColoredButton";
import Timer from "../../../shared/icons/Timer";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useGameSocket } from "../../../../sockets/useGameSocket";
import PhaseLayout from "../PhaseLayout";
import LoadingAnimation from "../../../shared/cards/LoadingAnimation";
import TimesUpCard from "../../../shared/cards/TimesUpCard";

function SubmitPhase() {
  const navigate = useNavigate();
  const location = useLocation();
  const { roomId } = useParams<{ roomId: string }>();
  const playerId = sessionStorage.getItem("id")!;

  const [answersAllowed, setAnswersAllowed] = useState<boolean>(true);
  const [categoryAnswers, setCategoryAnswers] = useState<Map<string, string>>(
    new Map(),
  );

  const { players, settings, isTimeUp } = useGameSocket(playerId, roomId!);
  const { roundLetter, roundNumber } = location.state;

  useEffect(() => {
    if (isTimeUp) {
      console.log("Time's up!");
      setAnswersAllowed(false);
    }
  }, [isTimeUp]);

  useEffect(() => {
    const serverCategories = settings?.categories;
    if (
      serverCategories &&
      serverCategories.length > 0 &&
      categoryAnswers.size === 0
    ) {
      const initialMap = new Map<string, string>();
      serverCategories.forEach((cat: string) => initialMap.set(cat, ""));
      setCategoryAnswers(initialMap);
    }
  }, [settings, categoryAnswers.size]);

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

  const changeRound = () => {
    navigate(`/review/${roomId}`);
  };

  return (
    <LoadingAnimation serverLoading={!settings} minimumTime={700}>
      <TimesUpCard showCard={isTimeUp}>
        <PhaseLayout phaseName={`Round ${roundNumber}/${totalRounds} `}>
          <div className="flex flex-row w-full items-start justify-center gap-[2%]">
            {/* LeaderBoard Part */}
            <div className="flex flex-col w-[20%] bg-white border-none rounded-xl p-4">
              <p className="mb-2 text-sm font-thin tracking-wide">
                {" "}
                Leaderboard
              </p>
              <div className="flex flex-col w-full gap-2">
                {players.map((p, idx) => (
                  <PlayerInfoTag
                    key={p.id}
                    number={idx + 1}
                    name={p.username}
                    className="border-none`"
                  />
                ))}
              </div>
            </div>
            {/* User answers Part */}
            <div className="flex flex-col w-[50%] bg-white border-none rounded-xl px-4 py-4">
              <div className="flex justify-between w-full">
                <div className="flex flex-col">
                  <p className="font-light tracking-wide font-small text-md text-gray-99">
                    Enter your answers
                  </p>
                  <div className="flex flex-row items-center justify-start gap-2">
                    <p className="font-thin tracking-wide text-gray-900 text-md">
                      All answers must start with the letter
                    </p>
                    <span className="px-[10px] py-[5px] rounded-xl font-md text-md bg-gray-50">
                      {roundLetter.toUpperCase()}
                    </span>
                  </div>
                </div>
                <Timer
                  totalSeconds={timeLimit!}
                  onTimeExpire={() => setAnswersAllowed(false)}
                />
                {/* timer componenet */}
              </div>
              <div className="flex flex-col w-full gap-4 mt-2 mb-2">
                {Array.from({ length: categories.length }).map((_, idx) => (
                  <CategoryInput
                    key={idx}
                    name={categories[idx]}
                    num={idx}
                    input={categoryAnswers.get(categories[idx]) || ""}
                    canAddInput={answersAllowed}
                    setInput={(value) => {
                      addCategoryAnswer(categories[idx], value);
                    }}
                  />
                ))}
              </div>
              <div className="flex justify-center mt-4">
                <PlainColoredButton
                  buttonTitle="Finish"
                  nextFunction={() => {
                    changeRound();
                  }}
                />
              </div>
            </div>
          </div>
        </PhaseLayout>
      </TimesUpCard>
    </LoadingAnimation>
  );
}

export default SubmitPhase;
