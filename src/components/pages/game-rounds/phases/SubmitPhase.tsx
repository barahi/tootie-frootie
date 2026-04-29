import Layout from "../PhaseLayout";
import { useEffect, useState } from "react";
import { useGameSetup } from "../../../../context/GameFlowContext";
import PlayerInfoTag from "../../../shared/tags/PlayerInfoTag";
import { CategoryInput } from "../../../shared/user-input/basic-label-input/CategoryInput";
import PlainColoredButton from "../../../shared/buttons/PlainColoredButton";
import Timer from "../../../shared/icons/Timer";
import { useNavigate } from "react-router-dom";

function SubmitPhase() {
  const navigate = useNavigate();
  const { isInitialized, gameConfig } = useGameSetup();

  useEffect(() => {
    if (!isInitialized) {
      navigate("/");
    }
  }, [isInitialized, navigate]);

  const [answersAllowed, setAnswersAllowed] = useState<boolean>(false);
  const totalRounds = gameConfig.numberOfRounds;
  const categories = gameConfig.categories;
  const timeLimit = gameConfig.timeLimit;

  let currRound = 1; // This should be derived from game state
  // fetch player[] from backend
  const players = [
    { id: 1, name: "Bon" },
    { id: 2, name: "Bonney" },
    { id: 3, name: "Vivi" },
    { id: 4, name: "Marco" },
    { id: 5, name: "Karoo" },
    { id: 6, name: "Ivan" },
    { id: 7, name: "Imu" },
  ];

  return (
    <Layout phaseName={`Round ${currRound}/${totalRounds} `}>
      <div className="flex flex-row w-full items-start justify-center gap-[2%]">
        {/* LeaderBoard Part */}
        <div className="flex flex-col w-[30%] bg-white border-none rounded-xl p-4">
          <p className="mb-2 text-sm font-thin tracking-wide"> Leaderboard</p>
          <div className="flex flex-col w-full gap-2">
            {players.map((p) => (
              <PlayerInfoTag
                key={p.id}
                number={p.id}
                name={p.name}
                className="border-none`"
              />
            ))}
          </div>
        </div>
        {/* User answers Part */}
        <div className="flex flex-col w-[68%] bg-white border-none rounded-xl px-4 py-4">
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
                  A
                </span>
              </div>
            </div>
            <Timer
              totalSeconds={timeLimit}
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
                input={""}
                canAddInput={answersAllowed}
                setInput={() => {}}
              />
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <PlainColoredButton
              buttonTitle="Finish"
              nextFunction={() => {
                // submit answers to backend
              }}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default SubmitPhase;
