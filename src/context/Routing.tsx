import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import MainScreen from "../components/pages/MainScreen";
import JoinGame from "../components/pages/JoinGame";
import CreateNewGame from "../components/pages/CreateNewGame";
import GameLobby from "../components/pages/GameLobby";
import GameRound from "../components/pages/game-rounds/GameRound";
import { GameSetupProvider } from "./GameFlowContext";

export default function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route element={<GameSetupProvider />}>
          <Route path="/new-game" element={<CreateNewGame />} />
          <Route path="/join-game/*" element={<JoinGame />} />
          <Route path="/game-lobby/:roomId" element={<GameLobby />} />
          <Route path="/game/:roomId" element={<GameRound />} />
        </Route>
      </Routes>
    </Router>
  );
}
