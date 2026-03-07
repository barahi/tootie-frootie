import Layout from "../../shared/Layout";
import SliderButton from "../../shared/buttons/SliderButton";
import DropdownSelect from "../../shared/dropdowns/DropdownSelect";
import BlackButton from "../../shared/buttons/BlackButton";
import { LetterInput } from "../../shared/user-input/letterInput/LetterInput";
import { PasswordInput } from "../../shared/user-input/passwordInput/PasswordInput";
import { useNavigate } from "react-router-dom";
import { Dispatch, SetStateAction, useState } from "react";
import { useGameSetup } from "../../../context/GameFlowContext";
import { range } from "lodash";
import ErrorMessageCard from "../../shared/cards/ErrorMessageCard";

function NewGameInitial({
  playerCount,
  setPlayerCount,
  numberOfRounds,
  setNumberOfRounds,
  categoryCount,
  setCategoryCount,
  timeLimit,
  setTimeLimit,
  passwordRequirement,
  setPasswordRequirement,
  password,
  setPassword,
  letterExclusion,
  setLetterExclusion,
  letters,
  setLetters,
  nextPage,
}: {
  nextPage: () => void;
  playerCount: number;
  setPlayerCount: Dispatch<SetStateAction<number>>;
  numberOfRounds: number;
  setNumberOfRounds: Dispatch<SetStateAction<number>>;
  categoryCount: number;
  setCategoryCount: Dispatch<SetStateAction<number>>;
  timeLimit: number;
  setTimeLimit: Dispatch<SetStateAction<number>>;
  passwordRequirement: boolean;
  setPasswordRequirement: Dispatch<SetStateAction<boolean>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
  letterExclusion: boolean;
  setLetterExclusion: Dispatch<SetStateAction<boolean>>;
  letters: Array<string>;
  setLetters: Dispatch<SetStateAction<Array<string>>>;
}) {
  const { gameConfig, setGameConfig } = useGameSetup();
  const navigate = useNavigate();

  const playerRoundNumbers = range(2, 8).map((n) => `${n}`);
  const categoryNumbers = range(2, 6).map((n) => `${n}`);
  const timeIntervals = ["30", "45", "60", "90", "120"];

  const [errorMessage, setErrorMessage] = useState<string>("");

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
    <Layout>
      <div className="flex justify-center w-full py-10">
        <div className="flex flex-col items-center justify-center w-[40%] p-10 bg-white border-none rounded-3xl">
          <h1 className="mt-2 mb-4 text-xl font-medium tracking-widest ">
            Create a new lobby
          </h1>
          <form
            id="new-game-form"
            className="flex flex-col w-full gap-10 overflow-y"
          >
            <div className="flex flex-col w-full gap-8 mt-6 mb-8">
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
    </Layout>
  );
}

export default NewGameInitial;
