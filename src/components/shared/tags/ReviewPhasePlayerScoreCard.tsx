import { Megaphone } from "lucide-react";

interface ReviewPhasePlayerScoreCardProps {
  isHost: boolean;
  playerName: string;
  playerScore: number;
  playerAnswer: string;
}

export default function ReviewPhasePlayerScoreCard({
  isHost,
  playerName,
  playerScore,
  playerAnswer,
}: ReviewPhasePlayerScoreCardProps) {
  return (
    <div className="flex flex-row w-full h-full gap-[0.25rem]">
      <div className=" w-[80%] flex flex-row items-center gap-4 px-[0.50rem] rounded-lg border-none bg-honeydew-90">
        <p className="text-xs text-center bg-blue-90 text-white border-none rounded-[9999px] p-[0.35rem]">
          {playerName.slice(0, 2).toUpperCase()}
        </p>
        <div>
          <p className="text-[clamp(0.8rem,1.2vw,1rem)] font-thin tracking-wider text-gray-99">
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
        <button className="flex flex-row items-center justify-center w-full gap-1 p-1 text-xs font-normal text-center border-none rounded-lg bg-gray-50 text-gray-99 hover:bg-red-50">
          <Megaphone size="clamp(0.8rem,1.2vw,1rem)" /> Flag
        </button>
      </div>
    </div>
  );
}
