import Layout from "../PhaseLayout";
import { useGameSetup } from "../../../../context/GameFlowContext";
import PlayerInfoTag from "../../../shared/tags/PlayerInfoTag";

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
    <Layout phaseName={`Round ${currRound}/${totalRounds} `}>
      <div className="flex flex-row w-full items-center gap-[2%]">
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
        <div className="flex flex-col w-[68%] bg-white border-none rounded-xl p-4"></div>
      </div>
    </Layout>
  );
}

export default SubmitPhase;
