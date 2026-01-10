import Header from "../../shared/bars/Header";
import BlackButton from "../../shared/buttons/BlackButton";
import { useGameSetup } from "../../../context/GameFlowContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { LabelInput } from "../../shared/user-input/basic-label-input/LabelInput";

type Screen1Props = {
  roomId: string;
  setRoomId: (id: string) => void;
  nextPage: () => void;
};

function Screen1({ roomId, setRoomId, nextPage }: Screen1Props) {
  const { gameConfig } = useGameSetup();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleNext = () => {
    if (roomId === "") {
      setErrorMessage("Please enter a Room ID to join a game");
      return;
    }
    const passwordRequired = gameConfig?.passwordRequirement || true;
    if (passwordRequired) {
      nextPage();
    } else {
      navigate("/game-lobby/");
    }
  };

  return (
    <div className="relative w-full h-screen">
      <div className="absolute top-0 left-0 w-full z-10">
        <Header />
      </div>
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="flex flex-col w-[30%] justify-center items-center bg-white border-none rounded-3xl p-8">
          <h1 className="text-xl mt-2 mb-6 font-medium tracking-widest">
            {" "}
            Join an existing game{" "}
          </h1>
          <div className="flex flex-col w-full mb-6">
            <LabelInput
              label="Room ID"
              input={roomId}
              onChange={(val) => setRoomId(val)}
            />
          </div>

          {errorMessage && (
            <p className="bg-red-10 px-2 py-1 text-xs font-thin tracking-wider text-red-90 mb-6 border-none rounded-lg">
              {errorMessage}
            </p>
          )}
          <BlackButton buttonTitle="Join" nextFunction={handleNext} />
        </div>
      </div>
    </div>
  );
}

export default Screen1;
