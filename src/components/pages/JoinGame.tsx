import { useState } from "react";
import JoinGame1 from "./join-game/JoinGame1";
import JoinGame2 from "./join-game/JoinGame2";

function JoinGame() {
  const [page, setPage] = useState(1);
  const [roomId, setRoomId] = useState<string>("");
  const nextPage = () => {
    setPage((prev) => prev + 1);
  };

  const prevPage = () => {
    setPage((prev) => prev - 1);
  };

  return (
    <div className="w-full h-screen">
      {page === 1 && (
        <JoinGame1 roomId={roomId} setRoomId={setRoomId} nextPage={nextPage} />
      )}
      {page === 2 && <JoinGame2 roomId={roomId} prevPage={prevPage} />}
    </div>
  );
}

export default JoinGame;
