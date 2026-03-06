import Header from "../../shared/bars/Header";
import ErrorMessageCard from "../../shared/cards/ErrorMessageCard";
import { useState } from "react";
import { useGameSetup } from "../../../context/GameFlowContext";
import BlackButton from "../../shared/buttons/BlackButton";

function Screen2({ prevPage }: { prevPage: () => void }) {
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

  const handleFinish = () => {
    if (categories.some((cat) => cat.length === 0)) {
      setErrorMessage("Please fill out all categories");
      return;
    }
    setGameConfig((prev) => ({
      ...prev,
      categories,
    }));
  };

  return (
    <div className="relative w-full h-screen">
      <div className="absolute top-0 left-0 z-10 w-full">
        <Header />
      </div>
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
    </div>
  );
}

export default Screen2;
