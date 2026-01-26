import { User } from "lucide-react";
import PlayerInfoTag from "../../shared/tags/PlayerInfoTag";
import CopyTag from "../../shared/tags/CopyTag";
import BlackButton from "../../shared/buttons/BlackButton";

type GameLobbyBottomProps = {
  password: string;
  numberOfPlayers: number;
  roomCode: string;
  handleNext: () => void;
};

function GameLobbyBottom({
  password,
  numberOfPlayers,
  roomCode,
  handleNext,
}: GameLobbyBottomProps) {
  // TO DO: Get number of players in lobby from backend
  const currPlayerNum = 1;
  return (
    <div className="flex flex-row w-full h-full gap-4">
      {/* Part 2: Player list area */}
      <div className="flex flex-col w-[55%] h-full bg-white border-none rounded-xl p-4">
        {/* title */}
        <div className="flex flex-row w-full gap-2 mb-2">
          <div className="flex flex-row items-center w-full gap-2">
            <User className="w-5" />
            <p className="text-sm text-base font-thin tracking-wide">Players</p>
          </div>
          <p className="px-3 py-1 text-sm font-thin tracking-widest border-none rounded-lg bg-honeydew-50">{`${currPlayerNum}/${numberOfPlayers}`}</p>
        </div>
        {/* player tags */}
        <div className="flex flex-col w-full gap-2">
          <PlayerInfoTag number={1} />
        </div>
      </div>
      <div className="flex flex-col w-[45%] gap-6">
        {/* Part 3: Lobby info area */}
        <div className="flex flex-col w-full p-4 bg-white border-none rounded-xl">
          {/* title */}
          <div className="flex flex-row w-full gap-2 mb-1">
            <div className="flex flex-col w-full gap-4">
              <CopyTag title="Room Code" copyableTag={roomCode} />
              {password && (
                <CopyTag
                  title="Password"
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
  );
}

export default GameLobbyBottom;
