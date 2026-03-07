import { Cog } from "lucide-react";

type GameConfigurationProps = {
  gameParams: {
    categories: string[];
    numberOfRounds: number;
    letters: string[];
    numberOfPlayers: number;
    password: string;
  };
};

function GameLobbyTop({ gameParams }: GameConfigurationProps) {
  return (
    <>
      {/* Part 1: Game Configuration area */}
      <div className="flex flex-col w-full p-4 bg-white border-none rounded-xl">
        <div className="flex flex-row w-full gap-2">
          <Cog className="w-5" />
          <p className="text-sm font-thin tracking-wide">Game Configuration</p>
        </div>
        <div className="flex flex-col w-full mt-3 ml-1">
          <p className="text-sm font-thin tracking-wide text-gray-99">
            Categories
          </p>
          <div className="flex flex-row w-full gap-2 pb-3 mt-1 border-b border-gray-50">
            {gameParams.categories.map((cat: string, idx: number) => (
              <p
                key={idx}
                className="p-1 pl-3 pr-3 text-sm font-light text-black border-none rounded-lg bg-blue-50 text-start "
              >
                {cat}
              </p>
            ))}
          </div>
        </div>

        {/* rounds/letter exclusion div */}
        <div className="flex flex-row w-full gap-[10%] mt-3">
          <div className="flex flex-col w-full ml-1">
            <p className="text-sm font-thin tracking-wide text-gray-99">
              Rounds
            </p>
            <p className="mt-1 font-light tracking-wide text-black text-md ">
              {gameParams.numberOfRounds}
            </p>
          </div>
          <div className="flex flex-col w-full ml-1">
            <p className="text-sm font-thin tracking-wide text-gray-99">
              Letter Exclusions
            </p>
            <div className="flex flex-row flex-wrap gap-2 mt-1">
              {gameParams.letters.length === 0 ? (
                <p className="text-sm font-light tracking-wide text-black">
                  None
                </p>
              ) : (
                gameParams.letters.map((letter: string, idx: number) => (
                  <p
                    key={idx}
                    className="w-6 p-1 text-sm font-light text-center text-black rounded-lg border-gray-90 border-1"
                  >
                    {letter.toUpperCase()}
                  </p>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default GameLobbyTop;
