import Header from "../../shared/bars/Header";
import SliderButton from "../../shared/buttons/SliderButton";
import DropdownSelect from "../../shared/dropdowns/DropdownSelect";
import BlackButton from "../../shared/buttons/BlackButton";
import { LetterInput } from "../../shared/user-input/letterInput/LetterInput";
import { PasswordInput } from "../../shared/user-input/passwordInput/PasswordInput";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useGameSetup } from "../../../context/GameFlowContext";
import { range } from "lodash";
import { useEffect } from "react";
import ErrorMessageCard from "../../shared/cards/ErrorMessageCard";

function Screen1({ nextPage }: { nextPage: () => void }) {
  const { gameConfig, setGameConfig } = useGameSetup();
  const navigate = useNavigate();

  const playerRoundNumbers = range(2, 8).map((n) => `${n}`);
  const categoryNumbers = range(2, 6).map((n) => `${n}`);
  const timeIntervals = ["30", "45", "60", "90", "120"];

  const [playerCount, setPlayerCount] = useState<number>(
    gameConfig?.playerCount || 2,
  );
  const [numberOfRounds, setNumberOfRounds] = useState<number>(
    gameConfig?.numberOfRounds || 2,
  );
  const [categoryCount, setCategoryCount] = useState<number>(
    gameConfig?.categoryCount || 2,
  );
  const [timeLimit, setTimeLimit] = useState<number>(
    gameConfig?.timeLimit || 30,
  );
  const [passwordRequirement, setPasswordRequirement] = useState<boolean>(
    gameConfig?.passwordRequirement || false,
  );

  const [letterExclusion, setLetterExclusion] = useState<boolean>(
    gameConfig?.letterExclusion || false,
  );

  const [password, setPassword] = useState<string>(gameConfig?.password || "");
  const [letters, setLetters] = useState<string[]>(gameConfig?.letters || []);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    if (!letterExclusion) {
      setLetters([]);
    }
  }, [letterExclusion]);

  useEffect(() => {
    if (!passwordRequirement) {
      setPassword("");
    }
  }, [passwordRequirement]);

  const handleNext = () => {
    if (passwordRequirement && !password) {
      setErrorMessage("Please enter a password.");
      return;
    }
    if (letterExclusion && letters.length === 0) {
      setErrorMessage("Please enter letters to exclude from game.");
      return;
    }

    setGameConfig({
      ...gameConfig,
      playerCount: playerCount,
      numberOfRounds: numberOfRounds,
      categoryCount,
      timeLimit,
      password,
      passwordRequirement,
      letterExclusion,
      letters,
    });
    nextPage();
  };

  return (
    <div className="relative w-full h-screen">
      <div className="absolute top-0 left-0 z-10 w-full">
        <Header />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center justify-center w-1/2 p-10 bg-white border-none rounded-3xl">
          <h1 className="mt-2 mb-6 text-xl font-medium tracking-widest">
            Create a new lobby
          </h1>
          <form id="new-game-form" className="flex flex-col w-full gap-10">
            <div className="flex flex-col w-full gap-8 mt-6 mb-4">
              <DropdownSelect
                selectItems={playerRoundNumbers}
                title="Number of players"
                onSelect={setPlayerCount}
              />
              <DropdownSelect
                selectItems={categoryNumbers}
                title="Number of categories"
                onSelect={setCategoryCount}
              />
              <DropdownSelect
                selectItems={playerRoundNumbers}
                title="Number of rounds"
                onSelect={setNumberOfRounds}
              />
              <DropdownSelect
                selectItems={timeIntervals.map((i) => i + " s")}
                title="Maximum time per round"
                onSelect={setTimeLimit}
              />
              <div className="flex flex-col gap-4">
                <div className="flex flex-row justify-between">
                  <p className="font-thin tracking-wider">
                    Apply letter exclusion
                  </p>
                  <SliderButton
                    value={letterExclusion}
                    onSelect={() => setLetterExclusion((prev) => !prev)}
                  />
                </div>
                <LetterInput
                  letters={letters}
                  disabled={!letterExclusion}
                  onChange={setLetters}
                />
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex flex-row justify-between ">
                  <p className="font-thin tracking-wider">Require password</p>
                  <SliderButton
                    value={passwordRequirement}
                    onSelect={() => setPasswordRequirement((prev) => !prev)}
                  />
                </div>
                <PasswordInput
                  password={password}
                  disabled={!passwordRequirement}
                  onChange={setPassword}
                />
              </div>
            </div>
          </form>
          {errorMessage && (
            <div className="mb-6">
              <ErrorMessageCard message={errorMessage} />{" "}
            </div>
          )}
          <div className="flex flex-row justify-around w-full">
            <BlackButton
              buttonTitle="Back"
              nextFunction={() => navigate("/")}
            />
            <BlackButton buttonTitle="Next" nextFunction={handleNext} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Screen1;
