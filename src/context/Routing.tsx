import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import MainScreen from "../components/pages/MainScreen";
import JoinGame from "../components/pages/JoinGame";
import CreateNewGame from "../components/pages/CreateNewGame";
import GameLobby from "../components/pages/GameLobby";

export default function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/join-game" element={<JoinGame />} />
        <Route path="/new-game" element={<CreateNewGame />} />
        <Route path="/lobby" element={<GameLobby />} />
      </Routes>
    </Router>
  );
}
