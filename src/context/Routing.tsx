import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import MainScreen from "../components/pages/MainScreen";
import JoinGame from "../components/pages/JoinGame";
import CreateNewGame from "../components/pages/CreateNewGame";
import GameLobby from "../components/pages/GameLobby";
import SubmitPhase from "../components/pages/game-rounds/phases/SubmitPhase";
import VotePhase from "../components/pages/game-rounds/phases/VotePhase";
import ReviewPhase from "../components/pages/game-rounds/phases/ReviewPhase";
import ScorePhase from "../components/pages/game-rounds/phases/ScorePhase";

export default function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/new-game" element={<CreateNewGame />} />
        <Route path="/lobby" element={<GameLobby />} />

        <Route path="/join-game/*" element={<JoinGame />} />
        <Route path="/game-lobby/:roomId" element={<GameLobby />} />
        {/* TODO: link them to a context in GameRound*/}
        <Route path="/submit/:roomId" element={<SubmitPhase />} />
        <Route path="/review/:roomId" element={<ReviewPhase />} />
        <Route path="/vote/:roomId" element={<VotePhase />} />
        <Route path="/score/:roomId" element={<ScorePhase />} />
      </Routes>
    </Router>
  );
}
