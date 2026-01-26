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

        <Route
          path="/join-game"
          element={<Navigate to="/join-game/room" replace />}
        />
        <Route path="/join-game/*" element={<JoinGame />} />

        <Route path="/new-game" element={<CreateNewGame />} />

        <Route path="/game-lobby" element={<GameLobby />} />
        {/* TODO: link them to a context in GameRound*/}
        <Route path="/submit" element={<SubmitPhase />} />
        <Route path="/review" element={<ReviewPhase />} />
        <Route path="/vote" element={<VotePhase />} />
        <Route path="/score" element={<ScorePhase />} />
      </Routes>
    </Router>
  );
}
