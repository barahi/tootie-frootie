import Header from "../../shared/bars/Header";
import { useGameSetup } from "../../../context/GameFlowContext";
import PlayerInfoTag from "../../shared/tags/PlayerInfoTag";

function SubmitPhase() {
  const { gameConfig } = useGameSetup();
  const totalRounds = gameConfig?.numberOfRounds || 7;
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
    <div className="relative w-full h-screen">
      <h1 className="absolute top-0 left-0 w-full z-10">
        <Header />
      </h1>
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="flex flex-col w-[55%] items-center gap-4 border-solid border-none border-1 rounded-3xl p-10">
          <p className="font-thin text-lg p-2 pr-4 pl-4 bg-gray-50 opacity-80 border-none rounded-xl tracking-wider">
            {`Round ${currRound}/${totalRounds} `}
          </p>
          <div className="flex flex-row w-full items-center gap-[2%]">
            {/* LeaderBoard Part */}
            <div className="flex flex-col w-[30%] bg-white border-none rounded-xl p-4">
              <p className="font-thin tracking-wide text-sm mb-2">
                {" "}
                Leaderboard
              </p>
              <div className="flex flex-col w-full gap-2">
                {players.map((p) => (
                  <PlayerInfoTag
                    number={p.id}
                    name={p.name}
                    className="border-none`"
                  />
                ))}
              </div>
            </div>
            {/* User answers Part */}
            <div className="flex flex-col w-[68%] bg-white border-none rounded-xl p-4"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubmitPhase;
