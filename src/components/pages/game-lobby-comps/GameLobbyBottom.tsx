import { User } from "lucide-react";
import PlayerInfoTag from "../../shared/tags/PlayerInfoTag";
import CopyTag from "../../shared/tags/CopyTag";
import PlainColoredButton from "../../shared/buttons/PlainColoredButton";
import { Player } from "../../../sockets/types";

type GameLobbyBottomProps = {
  password: string;
  numberOfPlayers: number;
  roomCode: string;
  handleNext: () => void;
  exitGame: () => void;
  players: Player[];
  hostPlayerId: string;
};

function GameLobbyBottom({
  password,
  numberOfPlayers,
  roomCode,
  handleNext,
  exitGame,
  players,
  hostPlayerId,
}: GameLobbyBottomProps) {
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
          <p className="px-3 py-1 text-sm font-thin tracking-widest border-none rounded-lg bg-honeydew-50">{`${players.length}/${numberOfPlayers}`}</p>
        </div>
        {/* player tags */}
        <div className="flex flex-col w-full gap-2">
          {players.map((player, idx) => (
            <PlayerInfoTag
              key={player.id}
              number={idx + 1}
              name={player.username}
              isHost={player.id === hostPlayerId}
            />
          ))}

          {Array.from({
            length: Math.max(0, numberOfPlayers - players.length),
          }).map((_, idx) => {
            const placeholderNumber = players.length + idx + 1;
            return (
              <PlayerInfoTag key={`empty-${idx}`} number={placeholderNumber} />
            );
          })}
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
        <div className="flex flex-col w-full gap-2">
          <PlainColoredButton
            buttonTitle="Start Game"
            nextFunction={handleNext}
            className="w-full p-[4px] text-md"
          />
          <PlainColoredButton
            buttonTitle="Exit Game"
            nextFunction={exitGame}
            className="w-full p-[4px] text-md bg-red-50"
          />
        </div>
      </div>
    </div>
  );
}

export default GameLobbyBottom;
