import { useState } from "react";
import Screen1 from "./join-game/Screen1";
import Screen2 from "./join-game/Screen2";

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
        <Screen1 roomId={roomId} setRoomId={setRoomId} nextPage={nextPage} />
      )}
      {page === 2 && <Screen2 roomId={roomId} prevPage={prevPage} />}
    </div>
  );
}

export default JoinGame;
