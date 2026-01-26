import Layout from "../shared/Layout";
import SliderButton from "../shared/buttons/SliderButton";
import DropdownSelect from "../shared/dropdowns/DropdownSelect";
import { LabelInput } from "../shared/user-input/basic-label-input/LabelInput";
import BlackButton from "../shared/buttons/BlackButton";
import { LetterInput } from "../shared/user-input/letterInput/LetterInput";
import { PasswordInput } from "../shared/user-input/passwordInput/PasswordInput";
import { ErrorMessage } from "../shared/messages/ErrorMessage";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useGameSetup } from "../../context/GameFlowContext";
import { range } from "lodash";
import { useEffect } from "react";

function CreateNewGame() {
  const { gameConfig, setGameConfig } = useGameSetup();
  const navigate = useNavigate();

  const playerRoundNumbers = range(2, 8).map((n) => `${n}`);
  const categoryNumbers = range(2, 6).map((n) => `${n}`);
  const timeIntervals = ["30", "45", "60", "90", "120"];

  const [numberOfPlayers, setNumberOfPlayers] = useState<number>(
    gameConfig?.numberOfPlayers || 2,
  );
  const [numberOfRounds, setNumberOfRounds] = useState<number>(
    gameConfig?.numberOfRounds || 2,
  );
  const [numberOfCategories, setNumberOfCategories] = useState<number>(
    gameConfig?.numberOfCategories || 2,
  );
  const [categories, setCategories] = useState<string[]>(() =>
    Array(gameConfig?.numberOfCategories || 2).fill(""),
  );

  useEffect(() => {
    setCategories((prev) => {
      const diff = numberOfCategories - prev.length;
      if (diff > 0) {
        return [...prev, ...Array(diff).fill("")];
      }
      if (diff < 0) {
        return prev.slice(0, numberOfCategories);
      }
      return prev;
    });
  }, [numberOfCategories]);

  const handleChange = (index: number, value: string) => {
    setCategories((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

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
      setErrorMessage("Please enter letters to exclude from game");
      return;
    }
    console.log(JSON.stringify(gameConfig));
    setGameConfig({
      ...gameConfig,
      numberOfPlayers,
      numberOfRounds,
      numberOfCategories,
      categories,
      timeLimit,
      password,
      passwordRequirement,
      letterExclusion,
      letters,
    });
    navigate("/game-lobby");
  };

  return (
    <Layout>
      <div className="flex justify-center px-4 py-12">
        <div className="flex flex-col items-center justify-center w-2/4 p-10 bg-white border-none rounded-3xl">
          <h1 className="mt-2 mb-6 text-xl font-medium tracking-widest">
            Create a new lobby
          </h1>
          <form id="new-game-form" className="flex flex-col w-full">
            <div className="flex flex-col w-full gap-8 mt-6 mb-2">
              <DropdownSelect
                selectItems={playerRoundNumbers}
                title="Number of players"
                onSelect={(val) => setNumberOfPlayers(Number(val))}
              />
              <DropdownSelect
                selectItems={categoryNumbers}
                title="Number of categories"
                onSelect={(val) => setNumberOfCategories(Number(val))}
              />
              <div className="flex flex-col w-full gap-4 mb-4">
                {categories.map((cat, idx) => (
                  <LabelInput
                    key={idx}
                    label={`Category ${idx + 1}`}
                    input={cat}
                    onChange={(val) => handleChange(idx, val)}
                  />
                ))}
              </div>
              <DropdownSelect
                selectItems={playerRoundNumbers}
                title="Number of rounds"
                onSelect={(val) => setNumberOfRounds(Number(val))}
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
            <div className="flex flex-col w-full gap-8 mt-6 mb-6">
              <DropdownSelect
                selectItems={timeIntervals.map((i) => i + " s")}
                title="Maximum time per round"
                onSelect={(val) => setTimeLimit(Number(val))}
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
                className="w-8 focus:ring-gray-50"
              />
            </div>
          </form>
          <ErrorMessage message={errorMessage} />
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

export default CreateNewGame;
