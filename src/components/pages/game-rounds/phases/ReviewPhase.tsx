import Layout from "../PhaseLayout";
import ReviewPhasePlayerScoreCard from "../../../shared/tags/ReviewPhasePlayerScoreCard";
import PlainColoredButton from "../../../shared/buttons/PlainColoredButton";

function ReviewPhase() {
  const currUsername = sessionStorage.getItem("username");
  const category = "Animal";
  const playerAnswers = [
    { playerId: 1, name: currUsername, answer: "Bear", score: 100 },
    { playerId: 2, name: "Bonney", answer: "Bee", score: 50 },
    { playerId: 3, name: "Vivi", answer: "Bee", score: 50 },
    { playerId: 4, name: "Marco", answer: "Beaver", score: 33 },
    { playerId: 5, name: "Karoo", answer: "", score: 0 },
    { playerId: 6, name: "Ivan", answer: "Beaver", score: 33 },
    { playerId: 7, name: "Imu", answer: "Beaver", score: 33 },
  ];

  const flagAnswer = (
    playerId: number,
    playerName: string,
    playerAnswer: string,
  ) => {
    // Implementation for flagging an answer
    console.log(`Flagging answer from ${playerName}: ${playerAnswer}`);
  };

  return (
    <Layout phaseName="Review Phase">
      <div className="flex flex-row justify-center w-full">
        <div className="flex flex-col w-[80%] max-w-3xl bg-white border-none rounded-xl p-6 gap-2">
          <div className="flex flex-row gap-1">
            <p className="mb-2 text-sm font-thin tracking-wide">Category:</p>
            <p className="mb-2 text-sm font-semibold tracking-wide">
              {category}
            </p>
          </div>
          <div className="w-full grid gap-y-[1rem] gap-x-[4rem] grid-cols-2">
            {/* answers per player and score */}
            {playerAnswers.map((player) =>
              player.name !== currUsername ? (
                <ReviewPhasePlayerScoreCard
                  key={player.playerId}
                  playerId={player.playerId}
                  isHost={false}
                  playerName={player.name!}
                  playerAnswer={player.answer}
                  playerScore={player.score}
                  flaggingFunction={() =>
                    flagAnswer(player.playerId, player.name!, player.answer)
                  }
                />
              ) : (
                <ReviewPhasePlayerScoreCard
                  key={player.playerId}
                  playerId={player.playerId}
                  isHost={true}
                  playerName={player.name!}
                  playerAnswer={player.answer}
                  playerScore={player.score}
                  flaggingFunction={() =>
                    flagAnswer(player.playerId, player.name!, player.answer)
                  }
                />
              ),
            )}
            <PlainColoredButton
              buttonTitle="Review next category"
              nextFunction={() => console.log("Next category")}
              className="w-full h-[2rem] mt-2"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ReviewPhase;
