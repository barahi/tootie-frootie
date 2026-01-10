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

function Screen1({ nextPage }: { nextPage: () => void }) {
  const { gameConfig, setGameConfig } = useGameSetup();
  const navigate = useNavigate();

  const playerRoundNumbers = range(2, 8).map((n) => `${n}`);
  const categoryNumbers = range(2, 6).map((n) => `${n}`);
  const timeIntervals = ["30", "45", "60", "90", "120"];

  const [playerCount, setPlayerCount] = useState<number>(
    gameConfig?.playerCount || 2
  );
  const [numberOfRounds, setNumberOfRounds] = useState<number>(
    gameConfig?.numberOfRounds || 2
  );
  const [categoryCount, setCategoryCount] = useState<number>(
    gameConfig?.categoryCount || 2
  );
  const [timeLimit, setTimeLimit] = useState<number>(
    gameConfig?.timeLimit || 30
  );
  const [passwordRequirement, setPasswordRequirement] = useState<boolean>(
    gameConfig?.passwordRequirement || false
  );

  const [letterExclusion, setLetterExclusion] = useState<boolean>(
    gameConfig?.letterExclusion || false
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
    if (
      passwordRequirement &&
      !password &&
      letterExclusion &&
      letters.length === 0
    ) {
      setErrorMessage(
        "Please enter a password and letters to exclude from game"
      );
      return;
    }
    if (passwordRequirement && !password) {
      setErrorMessage("Please enter a password.");
      return;
    }
    if (letterExclusion && letters.length === 0) {
      setErrorMessage("Please enter letters to exclude from game");
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
      <div className="absolute top-0 left-0 w-full z-10">
        <Header />
      </div>
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="flex flex-col w-2/3 justify-center items-center bg-white border-none rounded-3xl p-10">
          <h1 className="text-xl mt-2 mb-6 font-medium tracking-widest">
            Create a new lobby
          </h1>
          <form id="new-game-form" className="flex flex-row w-full gap-10">
            <div className="flex flex-col w-full gap-8 mt-6 mb-2">
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
            <div className="flex flex-col w-full gap-8 mb-6 mt-6">
              <DropdownSelect
                selectItems={timeIntervals.map((i) => i + " s")}
                title="Maximum time per round"
                onSelect={setTimeLimit}
              />
              <div className="flex flex-row justify-between">
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
                className="w-8 border-1 rounded-lg border-gray-99 text-black text-sm font-thin transition-all duration-300
                    focus:outline-none focus:ring-gray-50
                    disabled:border-gray-90
                    disabled:bg-gray-50
                    disabled:text-gray-50
                    disabled:cursor-not-allowed"
              />
            </div>
          </form>
          {errorMessage && (
            <p className="bg-red-10 px-2 py-1 text-xs font-thin tracking-wider text-red-90 mb-6 border-none rounded-lg">
              {errorMessage}
            </p>
          )}
          <div className="flex flex-row w-full justify-around">
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
