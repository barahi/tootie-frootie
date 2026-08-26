import { useGameSetup } from "../../../../context/GameFlowContext";
import { useGameSocket } from "../../../../sockets/useGameSocket";
import PlainColoredButton from "../../../shared/buttons/PlainColoredButton";
import Layout from "../PhaseLayout";

type ScorePhaseProps = {
  gameData: ReturnType<typeof useGameSocket>;
};

function ScorePhase({ gameData }: ScorePhaseProps) {
  const currUsername = sessionStorage.getItem("username");
  const numberOfRounds = gameData.settings?.numberOfRounds || 0;

  const { roundResults } = gameData;
  console.log("in here, round results + " + JSON.stringify(roundResults));
  const { changeRound } = useGameSetup();

  return (
    <Layout
      phaseName={`Round ${roundResults?.roundNumber}/${numberOfRounds} - Scores`}
    >
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="gap-4 bg-white border-none rounded-2xl w-[35%]">
          {/* content goes here */}
          <div className="flex flex-col w-full gap-[0.75rem] p-4">
            {roundResults &&
              Object.entries(roundResults.playerScores).map(
                ([player, score]) => (
                  <div
                    key={player}
                    className={`${currUsername !== player ? "bg-honeydew-90" : " bg-blue-90"} flex items-center justify-between px-[1rem] py-2 rounded-xl`}
                  >
                    <div className="flex flex-row gap-4">
                      <p
                        className={`${currUsername !== player ? "bg-blue-90 text-white" : "bg-white text-blue-90"} flex items-center justify-center font-medium border-none rounded-[99px] p-[3px] text-xs`}
                      >
                        {player.slice(0, 2).toUpperCase()}
                      </p>
                      <p
                        className={`${currUsername !== player ? "text-black" : "text-white"} text-[clamp(1rem,1.2vw,1.25rem)] font-thin tracking-wider`}
                      >
                        {player}
                      </p>
                    </div>

                    <p
                      className={`${currUsername !== player ? "text-black" : "text-white"} text-[clamp(0.9rem,1vw,1.15rem)] font-thin tracking-wide`}
                    >{`${score} points`}</p>
                  </div>
                ),
              )}
            <PlainColoredButton
              buttonTitle="Continue"
              nextFunction={changeRound}
              className="w-full p-2 text-sm font-thin mt-[0.5rem]"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ScorePhase;
