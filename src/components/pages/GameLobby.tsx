import Header from "../shared/bars/Header";
import BlackButton from "../shared/buttons/BlackButton";
import PlayerInfoTag from "../shared/tags/PlayerInfoTag";
import CopyTag from "../shared/tags/CopyTag";
import { Cog, User } from "lucide-react";
import { useGameSetup } from "../../context/GameFlowContext";
import { useNavigate } from "react-router-dom";

function GameLobby() {
  const { gameConfig } = useGameSetup();
  const categories = gameConfig.categories || [];
  const rounds = gameConfig.numberOfRounds || 2;
  const letterExclusions = gameConfig.letters || [];
  const players = gameConfig.playerCount || 1;
  const password = gameConfig.password || "";

  const currPlayerNum = 3; // Placeholder for current number of players joined, will need to get live number of joined players in room
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/submit");
  };
  return (
    <div className="relative w-full h-screen">
      <h1 className="absolute top-0 left-0 w-full z-10">
        <Header />
      </h1>
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="flex flex-col w-[55%] items-center gap-4 border-solid border-none border-1 rounded-3xl p-10">
          <p className="font-thin text-lg p-2 pr-4 pl-4 bg-gray-50 opacity-80 border-none rounded-xl tracking-wider">
            Game Lobby
          </p>
          {/* Part 1: Game Configuration area */}
          <div className="flex flex-col w-full bg-white border-none rounded-xl p-4">
            {/* title */}
            <div className="flex flex-row w-full gap-2">
              <Cog className="w-5" />
              <p className="font-thin tracking-wide text-sm">
                Game Configuration
              </p>
            </div>
            {/* categories tags part */}
            <div className="flex flex-col w-full mt-3 ml-1">
              <p className="font-thin tracking-wide text-sm text-gray-99">
                Categories
              </p>
              <div className="flex flex-row w-full gap-2 mt-1 border-b border-gray-50 pb-3">
                {categories.map((cat: string, idx: number) => (
                  <p
                    key={idx}
                    className="bg-blue-50 text-black
                     font-light text-sm text-start p-1 pl-3 pr-3 rounded-lg border-none "
                  >
                    {cat}
                  </p>
                ))}
              </div>
            </div>
            {/* rounds/letter exclusion div */}
            <div className="flex flex-row w-full gap-[10%] mt-3">
              <div className="flex flex-col w-full ml-1">
                <p className="font-thin tracking-wide text-sm text-gray-99">
                  Rounds
                </p>
                <p className="font-light tracking-wide text-md text-black mt-1 ">
                  {rounds}
                </p>
              </div>
              <div className="flex flex-col w-full ml-1">
                <p className="font-thin tracking-wide text-sm text-gray-99">
                  Letter Exclusions
                </p>
                <div className="flex flex-row flex-wrap gap-2 mt-1">
                  {letterExclusions.length === 0 ? (
                    <p className="font-light tracking-wide text-sm text-black">
                      None
                    </p>
                  ) : (
                    letterExclusions.map((letter: string, idx: number) => (
                      <p
                        key={idx}
                        className="w-6 text-black font-light text-sm text-center p-1 rounded-lg border-gray-90 border-1"
                      >
                        {letter.toUpperCase()}
                      </p>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row w-full h-full gap-4">
            {/* Part 2: Player list area */}
            <div className="flex flex-col w-[55%] h-full bg-white border-none rounded-xl p-4">
              {/* title */}
              <div className="flex flex-row w-full gap-2 mb-2">
                <div className="flex flex-row w-full items-center gap-2">
                  <User className="w-5" />
                  <p className="font-thin text-base tracking-wide text-sm">
                    Players
                  </p>
                </div>
                <p className="font-thin text-sm tracking-widest bg-honeydew-50 py-1 px-3 border-none rounded-lg">{`${currPlayerNum}/${players}`}</p>
              </div>
              {/* player tags */}
              <div className="flex flex-col w-full gap-2">
                <PlayerInfoTag number={1} />
              </div>
            </div>
            <div className="flex flex-col w-[45%] gap-6">
              {/* Part 3: Lobby info area */}
              <div className="flex flex-col w-full bg-white border-none rounded-xl p-4">
                {/* title */}
                <div className="flex flex-row w-full gap-2 mb-1">
                  <div className="flex flex-col w-full gap-4">
                    <CopyTag title={"Room Code"} copyableTag={"ABCD1234"} />
                    {password && (
                      <CopyTag
                        title={"Password"}
                        copyableTag={password}
                        isPassword={true}
                      />
                    )}
                  </div>
                </div>
              </div>
              <BlackButton
                buttonTitle="Start Game"
                nextFunction={handleNext}
                className="w-full p-[4px] text-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameLobby;
