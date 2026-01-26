import Layout from "../shared/Layout";
import { useGameSetup } from "../../context/GameFlowContext";
import { useNavigate } from "react-router-dom";
import GameLobbyTop from "./game-lobby-comps/GameLobbyTop";
import GameLobbyBottom from "./game-lobby-comps/GameLobbyBottom";

function GameLobby() {
  const { gameConfig } = useGameSetup();

  const gameParameters = {
    categories: gameConfig.categories || [],
    numberOfRounds: gameConfig.numberOfRounds || 2,
    letters: gameConfig.letters || [],
    numberOfPlayers: gameConfig.numberOfPlayers || 1,
    password: gameConfig.password || "",
  };

  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/submit");
  };
  return (
    <Layout>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col w-[55%] items-center gap-4 border-solid border-none border-1 rounded-3xl p-10">
          <p className="p-2 pl-4 pr-4 text-lg font-thin tracking-wider border-none bg-gray-50 opacity-80 rounded-xl">
            Game Lobby
          </p>
          <GameLobbyTop gameParams={gameParameters} />
          <GameLobbyBottom
            password={gameParameters.password}
            numberOfPlayers={gameParameters.numberOfPlayers}
            handleNext={handleNext}
          />
        </div>
      </div>
    </Layout>
  );
}

export default GameLobby;
