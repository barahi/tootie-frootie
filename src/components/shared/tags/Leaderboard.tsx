type LeaderboardProps = {
  username: string;
  scores: [string, number][];
};
export function Leaderboard({ username, scores }: LeaderboardProps) {
  return (
    <div className="flex flex-col w-full gap-2">
      {scores.map(([player, score], idx) => (
        <div
          className={`${player !== username ? "bg-honeydew-90" : "bg-blue-90"} flex items-center justify-between w-full p-2 rounded-lg`}
        >
          <div className="flex items-center gap-4">
            <span
              className={`${player !== username ? "text-gray-90" : "text-white font-light"} text-sm`}
            >
              #{idx + 1}
            </span>
            <div className="flex items-center gap-2">
              <span
                className={`${player !== username ? "bg-blue-90 text-white" : "bg-white text-blue-90"} rounded-full w-full px-[0.25rem] font-light`}
              >
                {player.slice(0, 1).toUpperCase()}
              </span>
              <span
                className={`${player !== username ? "text-gray-99" : "text-white"} font-thin text-sm`}
              >
                {player}
              </span>
            </div>
          </div>
          <span
            className={`${player !== username ? "text-gray-99" : "text-white"} font-thin text-sm`}
          >
            {score} pts
          </span>
        </div>
      ))}
    </div>
  );
}
