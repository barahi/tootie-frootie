import Layout from "../shared/Layout";
import { useState } from "react";
import { useGameSetup } from "../../context/GameFlowContext";
import { useNavigate, useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";
import GameLobbyTop from "./game-lobby-comps/GameLobbyTop";
import GameLobbyBottom from "./game-lobby-comps/GameLobbyBottom";
import BinaryActionScreenMessage from "../shared/messages/BinaryActionScreenMessage";
import { useGameSocket } from "../../sockets/useGameSocket";

function GameLobby() {
  const { setIsInitialized, gameConfig } = useGameSetup();
  const navigate = useNavigate();
  const [totalScreenMessage, setTotalScreenMessage] = useState<boolean>(false);
  const { roomId } = useParams<{ roomId: string }>();
  const playerId = sessionStorage.getItem("id") || "";

  const { connection, players, settings, sendMessage } = useGameSocket(
    playerId,
    roomId || "",
    gameConfig.password !== "" ? gameConfig.password : undefined,
  );

  if (!playerId || !roomId) {
    return <Navigate to="/join-game/room" replace />;
  }

  const gameParams = {
    hostPlayerId: settings?.hostPlayerId || gameConfig.hostPlayerId,
    categories: settings?.categories || gameConfig.categories,
    roundDuration: settings?.roundDuration || gameConfig.timeLimit,
    numberOfRounds: settings?.numberOfRounds || gameConfig.numberOfRounds,
    letters: settings?.excludedLetters || gameConfig.letters,
    numberOfPlayers: settings?.maxPlayers || gameConfig.numberOfPlayers,
    password: settings?.password || gameConfig.password,
  };

  const lobbyTopParams = {
    categories: gameParams.categories,
    numberOfRounds: gameParams.numberOfRounds,
    letters: gameParams.letters,
    numberOfPlayers: gameParams.numberOfPlayers,
    password: gameParams.password,
  };

  if (connection && !settings) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-screen font-light tracking-wide text-gray-400 animate-pulse">
          Synchronizing lobby parameters...
        </div>
      </Layout>
    );
  }

  const handleTotalScreenMessage = () => {
    setTotalScreenMessage(true);
  };

  const handleNext = () => {
    setIsInitialized(true);
    console.log("Setting is initialized to true, navigating to submit phase");
    sendMessage("START_ROUND");
    setTotalScreenMessage(false);
  };

  const exitGame = () => {
    navigate("/");
  };

  return (
    <Layout>
      {totalScreenMessage && (
        <BinaryActionScreenMessage
          message="Are you sure you want to start the game?"
          action1="Yes"
          action2="No"
          function1={handleNext}
          function2={() => setTotalScreenMessage(false)}
        />
      )}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col w-[55%] items-center gap-4 border-solid border-none border-1 rounded-3xl p-10">
          <p className="p-2 pl-4 pr-4 text-lg font-thin tracking-wider border-none bg-gray-50 opacity-80 rounded-xl">
            Game Lobby
          </p>
          <GameLobbyTop gameParams={lobbyTopParams} />
          <GameLobbyBottom
            password={gameParams.password || ""}
            numberOfPlayers={gameParams.numberOfPlayers}
            roomCode={roomId!}
            handleNext={handleTotalScreenMessage}
            exitGame={exitGame}
            players={players}
            hostPlayerId={gameParams.hostPlayerId}
          />
        </div>
      </div>
    </Layout>
  );
}

export default GameLobby;
