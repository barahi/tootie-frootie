import { useEffect, useState } from "react";
import NewGameFinal from "./new-game/NewGameFinal";
import NewGameInitial from "./new-game/NewGameInitial";
import { RoomPayload, createRoom } from "../../rest/room";
import { useNavigate } from "react-router-dom";

enum CreatePhase {
  INITIAL,
  FINAL,
}

const DEFAULT_PLAYER_COUNT = 2;
const DEFAULT_NUM_OF_ROUNDS = 2;
const DEFAULT_CATEGORY_COUNT = 2;
const DEFAULT_TIME_LIMIT = 30;

function CreateNewGame() {
  const [playerCount, setPlayerCount] = useState<number>(DEFAULT_PLAYER_COUNT);
  const [numberOfRounds, setNumberOfRounds] = useState<number>(
    DEFAULT_NUM_OF_ROUNDS,
  );
  const [categoryCount, setCategoryCount] = useState<number>(
    DEFAULT_CATEGORY_COUNT,
  );
  const [categories, setCategories] = useState<Array<string>>([]);
  const [roundDuration, setRoundDuration] =
    useState<number>(DEFAULT_TIME_LIMIT);
  const [passwordRequirement, setPasswordRequirement] =
    useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [letterExclusion, setLetterExclusion] = useState<boolean>(false);
  const [letters, setLetters] = useState<Array<string>>([]);
  const [phase, setPhase] = useState<CreatePhase>(CreatePhase.INITIAL);
  const navigate = useNavigate();

  useEffect(() => {
    setCategories(Array(categoryCount).fill(""));
  }, [categoryCount]);

  const createGame = async () => {
    const userId: string = sessionStorage.getItem("id")!;
    if (!userId) {
      navigate("/");
      return;
    }
    const roomData: RoomPayload = {
      hostPlayerId: userId,
      maxPlayers: playerCount,
      roundDuration: Number(roundDuration),
      numberOfRounds: numberOfRounds,
      categories: categories,
      excludedLetters: letterExclusion ? letters : [],
      language: "english",
      password: passwordRequirement ? password : "",
    };
    const response = await createRoom(roomData);
    if (response.id !== null) {
      console.log("Game created with id: " + response.id);
      sessionStorage.setItem("roomId", response.id);
      navigate(`/game-lobby/${response.id}`);
    } else {
      navigate("/");
      return;
    }
  };

  switch (phase) {
    case CreatePhase.INITIAL:
      return (
        <NewGameInitial
          playerCount={playerCount}
          setPlayerCount={setPlayerCount}
          numberOfRounds={numberOfRounds}
          setNumberOfRounds={setNumberOfRounds}
          categoryCount={categoryCount}
          setCategoryCount={setCategoryCount}
          roundDuration={roundDuration}
          setRoundDuration={setRoundDuration}
          passwordRequirement={passwordRequirement}
          setPasswordRequirement={setPasswordRequirement}
          password={password}
          setPassword={setPassword}
          letterExclusion={letterExclusion}
          setLetterExclusion={setLetterExclusion}
          letters={letters}
          setLetters={setLetters}
          nextPage={() => setPhase(CreatePhase.FINAL)}
        />
      );
    case CreatePhase.FINAL:
      return (
        <NewGameFinal
          categories={categories}
          setCategories={setCategories}
          prevPage={() => setPhase(CreatePhase.INITIAL)}
          createGame={createGame}
        />
      );
  }
}

export default CreateNewGame;
