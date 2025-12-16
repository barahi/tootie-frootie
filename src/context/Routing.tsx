import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import MainScreen from "../components/pages/MainScreen";
import JoinGame from "../components/pages/JoinGame";
import CreateNewGame from "../components/pages/CreateNewGame";

export default function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/join-game" element={<JoinGame />} />
        <Route path="/new-game" element={<CreateNewGame />} />
      </Routes>
    </Router>
  );
}
