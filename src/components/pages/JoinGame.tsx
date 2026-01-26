import { Routes, Route } from "react-router-dom";
import JoinGameRoomId from "./join-game/JoinGameRoomId";
import JoinGamePassword from "./join-game/JoinGamePassword";

export default function JoinGame() {
  return (
    <div className="w-full h-screen">
      <Routes>
        <Route path="room" element={<JoinGameRoomId />} />
        <Route path="password/:roomId" element={<JoinGamePassword />} />
      </Routes>
    </div>
  );
}
