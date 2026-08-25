import Layout from "../PhaseLayout";
import { Trophy, Crown } from "lucide-react";
import PlainColoredButton from "../../../shared/buttons/PlainColoredButton";
import { useGameSocket } from "../../../../sockets/useGameSocket";
import { useNavigate } from "react-router-dom";

type FinalScorePhaseProps = {
  gameData: ReturnType<typeof useGameSocket>;
};

function FinalScorePhase({ gameData }: FinalScorePhaseProps) {
  const { endGameData, roundResults } = gameData;
  const navigate = useNavigate();

  const gameWinner = endGameData?.gameWinner || [];
  const playerScores = roundResults?.playerScores;

  const sortedScores: [string, number][] = Object.entries(playerScores!).sort(
    ([, scoreA], [, scoreB]) => scoreB - scoreA,
  );

  const returnHome = () => {
    navigate("/");
  };

  return (
    <Layout>
      <div className="flex justify-center w-full">
        <div className="flex flex-col items-center w-full gap-8">
          <div className="flex flex-col items-center justify-center w-full gap-4">
            <span className="p-4 border-2 rounded-full bg-gray-50 border-gray-90">
              <Trophy color="#AEB7B3"></Trophy>
            </span>
            <p className="text-xl font-thin tracking-wide text-gray-99">
              Game Over!
            </p>
          </div>
          <div className="flex flex-col gap-2 w-[50%]">
            {sortedScores.map(([username, score], index) => (
              <div
                key={username}
                className={`${
                  gameWinner.includes(username) ? "bg-yellow-10" : "bg-white"
                } flex w-full items-center justify-between p-4 rounded-2xl`}
              >
                <div className="flex items-center gap-8">
                  <span className="font-thin text-gray-99"> #{index + 1}</span>
                  <div className="flex items-center gap-2">
                    <span
                      className={`${gameWinner.includes(username) ? "bg-yellow-50" : "bg-blue-50"} p-2 rounded-full`}
                    >
                      {username.slice(0, 2).toUpperCase()}
                    </span>
                    <span className="font-thin">{username}</span>
                  </div>
                  <Crown
                    color={
                      gameWinner.includes(username) ? "#686764" : "#ffffff"
                    }
                    fontSize="10rem"
                    className="w-4 h-4"
                  />
                </div>

                <span className="font-thin text-gray-99">{score} points</span>
              </div>
            ))}
            <PlainColoredButton
              buttonTitle="Return home"
              nextFunction={returnHome}
              className="w-full mt-4"
            ></PlainColoredButton>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default FinalScorePhase;
