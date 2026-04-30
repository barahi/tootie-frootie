import { Megaphone } from "lucide-react";

interface ReviewPhasePlayerScoreCardProps {
  playerId: number;
  isMe: boolean;
  playerName: string;
  playerScore: number;
  playerAnswer: string;
  flaggingFunction: (
    playerId: number,
    playerName: string,
    playerAnswer: string,
  ) => void;
}

export default function ReviewPhasePlayerScoreCard({
  playerId,
  isMe,
  playerName,
  playerScore,
  playerAnswer,
  flaggingFunction,
}: ReviewPhasePlayerScoreCardProps) {
  return (
    <div className="flex flex-row w-full h-full gap-[0.25rem]">
      <div
        className={`${isMe ? "bg-blue-10" : "bg-honeydew-90"} w-full flex flex-row items-center gap-4 px-[0.50rem] rounded-lg border-none`}
      >
        <p
          className={`${isMe ? "bg-honeydew-10 text-gray-99" : "bg-blue-90 text-white"} text-xs text-center border-none rounded-[9999px] p-[0.35rem]`}
        >
          {playerName.slice(0, 2).toUpperCase()}
        </p>
        <div>
          <p
            className={`${isMe ? "font-normal" : "font-thin"} text-[clamp(0.8rem,1.2vw,1rem)] tracking-wider text-gray-99`}
          >
            {playerName}
          </p>
          <p
            className={`text-sm font-light tracking-wide ${playerAnswer !== "" ? "text-black" : "text-gray-99 italic"}`}
          >
            {playerAnswer !== "" ? playerAnswer : "No answer"}
          </p>
        </div>
      </div>
      <div className=" w-[20%] flex flex-col items-center justify-center gap-1">
        <span className="w-full p-1 text-xs font-medium text-center text-white border-none rounded-lg bg-blue-90">
          {playerScore} pts
        </span>
        <button
          disabled={isMe}
          className={`${isMe ? "" : "hover:bg-red-50"} flex flex-row items-center justify-center w-full gap-1 p-1 text-xs font-normal text-center border-none rounded-lg bg-gray-50 text-gray-99`}
          onClick={() => flaggingFunction(playerId, playerName, playerAnswer)}
        >
          <Megaphone size="clamp(0.8rem,1.2vw,1rem)" /> Flag
        </button>
      </div>
    </div>
  );
}
