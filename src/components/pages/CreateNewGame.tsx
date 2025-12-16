import { useState } from "react";
import Screen1 from "./new-game/Screen1";
import Screen2 from "./new-game/Screen2";

function CreateNewGame() {
  const [page, setPage] = useState(1);

  const nextPage = () => {
    setPage((prev) => prev + 1);
  };

  const prevPage = () => {
    setPage((prev) => prev - 1);
  };

  return (
    <div>
      {page === 1 && <Screen1 nextPage={nextPage} />}
      {page === 2 && <Screen2 prevPage={prevPage} />}
    </div>
  );
}

export default CreateNewGame;
