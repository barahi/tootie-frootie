import Header from "../../shared/bars/Header";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGameSetup } from "../../../context/GameFlowContext";
import BlackButton from "../../shared/buttons/BlackButton";
import { LabelInput } from "../../shared/user-input/basic-label-input/LabelInput";

function Screen2({ prevPage }: { prevPage: () => void }) {
  const { gameConfig, setGameConfig } = useGameSetup();
  const navigate = useNavigate();
  const categoryCount = gameConfig.categoryCount || 2;
  const [categories, setCategories] = useState<string[]>(
    Array(categoryCount).fill("")
  );

  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleChange = (index: number, value: string) => {
    setCategories((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const handleFinish = () => {
    if (categories.some((cat) => cat === "")) {
      setErrorMessage("Please fill in all category fields");
      return;
    }

    if (categories.length !== new Set(categories).size) {
      setErrorMessage("Categories must be unique");
      return;
    }

    setGameConfig((prev) => ({
      ...prev,
      categories,
    }));
    navigate("/game-lobby");
  };

  return (
    <div className="relative w-full h-screen">
      <div className="absolute top-0 left-0 w-full z-10">
        <Header />
      </div>
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="flex flex-col w-1/3 justify-center items-center bg-white border-solid border-none border-1 rounded-3xl p-10">
          <h1 className="text-xl mb-6 font-medium tracking-widest">
            Define categories
          </h1>
          <div className="flex flex-col w-full">
            <div className="flex flex-col w-full gap-6 mb-6">
              {categories.map((cat, idx) => (
                <div className="flex flex-col">
                  <LabelInput
                    key={idx}
                    label={`Category ${idx + 1}`}
                    input={cat}
                    onChange={(val) => handleChange(idx, val)}
                  />
                </div>
              ))}
            </div>
            <div className="flex flex-col w-full items-center">
              {errorMessage && (
                <p className="bg-red-10 px-2 py-1 text-xs font-thin tracking-wider text-red-90 text-center mb-6 border-none rounded-lg transition-all duration-300">
                  {errorMessage}
                </p>
              )}
            </div>

            <div className="flex flex-row justify-between mt-2 mb-2">
              <BlackButton buttonTitle="Back" nextFunction={prevPage} />
              <BlackButton buttonTitle="Next" nextFunction={handleFinish} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Screen2;
