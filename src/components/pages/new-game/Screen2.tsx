import Header from "../../shared/bars/Header";
import { useState } from "react";
import { useGameSetup } from "../../../context/GameFlowContext";
import BlackButton from "../../shared/buttons/BlackButton";

function Screen2({ prevPage }: { prevPage: () => void }) {
  const { gameConfig, setGameConfig } = useGameSetup();
  const categoryCount = gameConfig.categoryCount || 2;
  const [categories, setCategories] = useState<string[]>(
    Array(categoryCount).fill("")
  );

  const handleChange = (index: number, value: string) => {
    setCategories((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
  };

  const handleFinish = () => {
    setGameConfig((prev) => ({
      ...prev,
      categories,
    }));
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
