import Layout from "../shared/Layout";
import { useEffect, useState } from "react";
import { useGameSetup } from "../../context/GameFlowContext";
import { useNavigate, useParams } from "react-router-dom";
import { Navigate, useLocation } from "react-router-dom";
import GameLobbyTop from "./game-lobby-comps/GameLobbyTop";
import GameLobbyBottom from "./game-lobby-comps/GameLobbyBottom";
import BinaryActionScreenMessage from "../shared/messages/BinaryActionScreenMessage";
import { useGameSocket } from "../../sockets/useGameSocket";

function GameLobby() {
  const { setIsInitialized } = useGameSetup();
  const navigate = useNavigate();
  const [totalScreenMessage, setTotalScreenMessage] = useState<boolean>(false);
  const { roomId } = useParams<{ roomId: string }>();
  const playerId = sessionStorage.getItem("id");
  const location = useLocation();
  const incomingPassword = location.state?.roomPassword;

  const { players, settings, sendMessage, startRoundData } = useGameSocket(
    playerId!,
    roomId || "",
    incomingPassword,
  );

  useEffect(() => {
    if (startRoundData) {
      setIsInitialized(true);
      navigate(`/submit/${roomId!}`, {
        state: {
          roundLetter: startRoundData.letterForRound,
          roundNumber: startRoundData.roundNumber,
        },
      });
    }
  }, [startRoundData, setIsInitialized, navigate, roomId]);

  if (!playerId || !roomId) {
    return <Navigate to="/join-game/room" replace />;
  }

  if (!settings) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-screen font-light tracking-wide text-gray-400 animate-pulse">
          Synchronizing lobby parameters with server...
        </div>
      </Layout>
    );
  }

  const lobbyTopParams = {
    categories: settings.categories,
    numberOfRounds: settings.numberOfRounds,
    letters: settings.excludedLetters,
    numberOfPlayers: settings.maxPlayers,
    password: settings.password,
  };

  const handleTotalScreenMessage = () => {
    setTotalScreenMessage(true);
  };

  const handleNext = () => {
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
            password={settings.password || ""}
            numberOfPlayers={settings.maxPlayers}
            roomCode={roomId!}
            handleNext={handleTotalScreenMessage}
            exitGame={exitGame}
            players={players}
            hostPlayerId={settings.hostPlayerId}
          />
        </div>
      </div>
    </Layout>
  );
}

export default GameLobby;
