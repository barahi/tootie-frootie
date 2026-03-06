import Layout from "../../shared/Layout";
import ErrorMessageCard from "../../shared/cards/ErrorMessageCard";
import { useState } from "react";
import { useGameSetup } from "../../../context/GameFlowContext";
import BlackButton from "../../shared/buttons/BlackButton";
import { useNavigate } from "react-router-dom";
import { RoomPayload, RoomJson, createRoom } from "../../../rest/room";

function Screen2({ prevPage }: { prevPage: () => void }) {
  const navigate = useNavigate();
  const { gameConfig, setGameConfig } = useGameSetup();
  const categoryCount = gameConfig.categoryCount || 2;
  const [categories, setCategories] = useState<string[]>(
    Array(categoryCount).fill(""),
  );
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChange = (index: number, value: string) => {
    setCategories((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const handleFinish = async () => {
    if (categories.some((cat) => cat.length === 0)) {
      setErrorMessage("Please fill out all categories");
      return;
    }
    const userId: string | null = sessionStorage.getItem("id");
    if (userId === null) {
      navigate("/");
      return;
    } else {
      const roomData: RoomPayload = {
        hostPlayerId: userId,
        maxPlayers: gameConfig.playerCount || 2,
        roundDuration: gameConfig.timeLimit || 30,
        numberOfRounds: gameConfig.numberOfRounds || 2,
        categories: gameConfig.categories || [],
        excludedLetters: gameConfig.letterExclusion ? gameConfig.letters : [],
        language: "english",
        password: gameConfig.passwordRequirement ? gameConfig.password : "",
      };
      const request = await createRoom(roomData);
      if (request.id !== null) {
        sessionStorage.setItem("roomId", request.id);
        navigate("/lobby");
      } else {
        return;
      }
    }
    setGameConfig((prev) => ({
      ...prev,
      categories,
    }));
  };

  return (
    <Layout>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col items-center justify-center w-1/3 p-10 bg-white border-solid border-none border-1 rounded-3xl">
          <h1 className="mb-6 text-xl font-medium tracking-widest">
            Define categories
          </h1>
          <div className="flex flex-col w-full">
            <div className="flex flex-col w-full gap-6 mb-6">
              {categories.map((cat, idx) => (
                <div className="flex flex-col p-0.25">
                  <label
                    htmlFor={cat + idx}
                    className="font-thin tracking-wide"
                  >{`Category ${idx + 1}`}</label>
                  <input
                    id={cat + idx}
                    type="text"
                    key={idx}
                    value={cat}
                    onChange={(e) => handleChange(idx, e.target.value)}
                    className="text-base font-light pt-0.5 pb-0.5 pl-1 pr-1 bg-honeydew-90 border-solid border-gray-90 border-1 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-50"
                  ></input>
                </div>
              ))}
            </div>
            {errorMessage && (
              <div className="mb-6">
                <ErrorMessageCard message={errorMessage} />{" "}
              </div>
            )}
            <div className="flex flex-row justify-between mt-2 mb-2">
              <BlackButton buttonTitle="Back" nextFunction={prevPage} />
              <BlackButton buttonTitle="Next" nextFunction={handleFinish} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Screen2;
