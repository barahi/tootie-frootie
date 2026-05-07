import Timer from "../icons/Timer";

interface VoteAnswerCardProps {
  category: string;
  player: string;
  answerToReview: string;
  submitVoteDecision: (username: string, decision: boolean) => void;
  isReviewed: boolean;
}

export default function VoteAnswerCard({
  category,
  player,
  answerToReview,
  submitVoteDecision,
  isReviewed,
}: VoteAnswerCardProps) {
  const username = sessionStorage.getItem("username");
  return (
    <div className="fixed top-0 left-0 z-50 flex flex-col items-center justify-center w-full h-full bg-black bg-opacity-50">
      <div className="flex flex-col w-full max-w-sm gap-4 p-6 bg-white rounded-xl">
        <div className="flex flex-row items-center justify-between gap-2">
          <p className="font-medium tracking-wide text-md">Review Answer</p>
          <Timer
            color={isReviewed ? "#01040ca5" : ""}
            totalSeconds={30}
            onTimeExpire={() => {}}
          />
        </div>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row justify-start w-full gap-[40%]">
            <div className="flex flex-col">
              <p className="font-light text-md">Category</p>
              <span
                className={`
                px-2 py-[0.25rem] text-center text-sm rounded-lg text-md
                ${isReviewed ? "bg-gray-90 text-white font-normal" : "bg-blue-50 font-light"}
              `}
              >
                {category}
              </span>
            </div>
            <div className="flex flex-col">
              <p className="font-light text-md">Player</p>
              <div className="flex flex-row items-center gap-2">
                <p
                  className={`${isReviewed ? "bg-gray-90 text-white font-normal" : "bg-blue-50 font-normal"} p-1.5 text-xs text-center text-white border-none rounded-full`}
                >
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
              <button
                onClick={() => submitVoteDecision(username!, true)}
                className={` ${isReviewed ? "bg-gray-90" : "bg-blue-90 hover:bg-blue-50"} w-full px-1 py-2 text-white rounded-lg`}
              >
                Approve
              </button>
              <button
                onClick={() => submitVoteDecision(username!, false)}
                className={` ${isReviewed ? "bg-gray-90" : "bg-red-90 hover:bg-red-50"} w-full px-1 py-2 text-white rounded-lg`}
              >
                Invalidate
              </button>
            </div>
          </div>
        </div>
        {isReviewed && (
          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-row w-full gap-2 pt-4 mt-1 border-t border-gray-90">
              <div className="flex flex-col items-center justify-center w-full gap-[2px] p-[0.75rem] rounded-lg bg-blue-50">
                <p className="text-sm font-light">Accepted</p>
                <p className="text-sm font-semibold">5</p>
              </div>
              <div className="flex flex-col items-center justify-center w-full gap-[2px] p-[0.75rem] rounded-lg bg-gray-50">
                <p className="text-sm font-light">Invalidated</p>
                <p className="text-sm font-semibold">2</p>
              </div>
            </div>
            <span className="w-full p-1 mt-4 font-light text-center text-md">{`${player}'s answer was invalidated`}</span>
          </div>
        )}
      </div>
    </div>
  );
}
