import Timer from "../icons/Timer";

interface VoteAnswerCardProps {
  category: string;
  player: string;
  answerToReview: string;
}

export default function VoteAnswerCard({
  category,
  player,
  answerToReview,
}: VoteAnswerCardProps) {
  return (
    <div className="fixed top-0 left-0 z-50 flex flex-col items-center justify-center w-full h-full bg-black bg-opacity-50">
      <div className="flex flex-col w-full max-w-sm gap-4 p-6 bg-white rounded-xl">
        <div className="flex flex-row items-center justify-between gap-2">
          <p className="font-medium tracking-wide text-md">Review Answer</p>
          <Timer totalSeconds={30} onTimeExpire={() => {}} />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row justify-start w-full gap-[40%]">
            <div className="flex flex-col">
              <p className="font-light text-md">Category</p>
              <span className="px-2 py-[0.25rem] font-light text-center text-sm rounded-lg bg-blue-10 text-md">
                {category}
              </span>
            </div>
            <div className="flex flex-col">
              <p className="font-light text-md">Player</p>
              <div className="flex flex-row items-center gap-2">
                <p className="p-1.5 text-xs text-center text-white border-none rounded-full bg-blue-90">
                  {player.slice(0, 2).toUpperCase()}
                </p>
                <p className="font-light tracking-wide text-md">{player}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <p className="font-light text-md">Answer to review</p>
            <span className="px-[1rem] py-[0.35rem] rounded-lg text-start bg-gray-50 text-gray-99 tracking-wide text-sm ">
              {answerToReview}
            </span>
          </div>
          <div className="flex flex-col gap-2 pt-4 mt-1 border-t border-gray-90">
            <div className="flex flex-row items-center gap-1 ">
              <p className="font-normal text-md text-gray-99">Cast vote -</p>
              <p className="font-normal text-md text-gray-90">
                You are only allowed to vote once
              </p>
            </div>
            <div className="flex flex-row justify-between gap-4 mt-2 i items-centerw-full">
              <button className="w-full px-1 py-2 text-white rounded-lg bg-blue-90 hover:bg-blue-50">
                Approve
              </button>
              <button className="w-full px-1 py-2 text-white rounded-lg bg-red-90 hover:bg-red-50">
                Invalidate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
