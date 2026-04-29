import Header from "../../shared/bars/Header";
import BlackButton from "../../shared/buttons/PlainColoredButton";
import { useGameSetup } from "../../../context/GameFlowContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { LabelInput } from "../../shared/user-input/basic-label-input/LabelInput";
import { ErrorMessage } from "../../shared/messages/ErrorMessage";

function JoinGameRoomId() {
  const [roomId, setRoomId] = useState<string>("");
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
      navigate(`/join-game/password/${roomId}`);
    } else {
      navigate("/game-lobby/");
    }
  };

  return (
    <div className="relative w-full h-screen">
      <div className="absolute top-0 left-0 z-10 w-full">
        <Header />
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex flex-col w-[30%] justify-center items-center bg-white border-none rounded-3xl p-8">
          <h1 className="mt-2 mb-6 text-xl font-medium tracking-widest">
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
          <ErrorMessage message={errorMessage} />
          <BlackButton buttonTitle="Join" nextFunction={handleNext} />
        </div>
      </div>
    </div>
  );
}

export default JoinGameRoomId;
