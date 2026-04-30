import Layout from "../PhaseLayout";
import ReviewPhasePlayerScoreCard from "../../../shared/tags/ReviewPhasePlayerScoreCard";

function ReviewPhase() {
  const category = "Animal";
  const playerAnswers = [
    { name: "Bon", answer: "Bear", score: 100 },
    { name: "Bonney", answer: "Bee", score: 50 },
    { name: "Vivi", answer: "Bee", score: 50 },
    { name: "Marco", answer: "Beaver", score: 33 },
    { name: "Karoo", answer: "", score: 0 },
    { name: "Ivan", answer: "Beaver", score: 33 },
    { name: "Imu", answer: "Beaver", score: 33 },
  ];
  return (
    <Layout phaseName="Review Phase">
      <div className="flex flex-row justify-center w-full ">
        <div className="flex flex-col w-[80%] bg-white border-none rounded-xl p-4">
          <div className="flex flex-row gap-1">
            <p className="mb-2 text-sm font-thin tracking-wide">Category:</p>
            <p className="mb-2 text-sm font-semibold tracking-wide">
              {category}
            </p>
          </div>
          <div className="w-full grid gap-[1.25rem] grid-cols-2">
            {/* answers per player and score */}
            {playerAnswers.map((player) => (
              <ReviewPhasePlayerScoreCard
                key={player.name}
                isHost={false}
                playerName={player.name}
                playerAnswer={player.answer}
                playerScore={player.score}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ReviewPhase;
