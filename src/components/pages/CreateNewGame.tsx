import { useEffect, useState } from "react";
import NewGameFinal from "./new-game/NewGameFinal";
import NewGameInitial from "./new-game/NewGameInitial";
import { RoomPayload, createRoom } from "../../rest/room";
import { useNavigate } from "react-router-dom";
import { useGameSetup } from "../../context/GameFlowContext";

enum CreatePhase {
  INITIAL,
  FINAL,
}

const DEFAULT_PLAYER_COUNT = 2;
const DEFAULT_NUM_OF_ROUNDS = 2;
const DEFAULT_CATEGORY_COUNT = 2;
const DEFAULT_TIME_LIMIT = 30;

function CreateNewGame() {
  const { gameConfig } = useGameSetup();
  const [playerCount, setPlayerCount] = useState<number>(DEFAULT_PLAYER_COUNT);
  const [numberOfRounds, setNumberOfRounds] = useState<number>(
    DEFAULT_NUM_OF_ROUNDS,
  );
  const [categoryCount, setCategoryCount] = useState<number>(
    DEFAULT_CATEGORY_COUNT,
  );
  const [categories, setCategories] = useState<Array<string>>([]);
  const [timeLimit, setTimeLimit] = useState<number>(DEFAULT_TIME_LIMIT);
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
      return;
    }
    const roomData: RoomPayload = {
      hostPlayerId: userId,
      maxPlayers: playerCount,
      roundDuration: timeLimit,
      numberOfRounds: numberOfRounds,
      categories: categories,
      excludedLetters: letterExclusion ? letters : [],
      language: "english",
      password: passwordRequirement ? password : "",
    };
    const request = await createRoom(roomData);
    if (request.id !== null) {
      sessionStorage.setItem("roomId", request.id);
      gameConfig.categories = request.categories;
      gameConfig.numberOfRounds = request.numberOfRounds;
      gameConfig.letters = request.excludedLetters;
      gameConfig.numberOfPlayers = request.maxPlayers;
      gameConfig.password = request.password;
      navigate(`/game-lobby/${request.id}`);
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
          timeLimit={timeLimit}
          setTimeLimit={setTimeLimit}
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
