import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LabelInput } from "../shared/user-input/basic-label-input/LabelInput";
import { ErrorMessage } from "../shared/messages/ErrorMessage";
import PlainColoredButton from "../shared/buttons/PlainColoredButton";
import Header from "../shared/bars/Header";
import { PasswordInput } from "../shared/user-input/passwordInput/PasswordInput";

function JoinGame() {
  const [roomId, setRoomId] = useState<string>("");
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const handleNext = () => {
    const cleanRoomId = roomId.trim();

    if (cleanRoomId === "") {
      setErrorMessage("Please enter a Room ID to join a game");
      return;
    }

    const userId = sessionStorage.getItem("id");
    if (!userId) {
      setErrorMessage(
        "Player identity missing. Please go back and choose a nickname.",
      );
      return;
    }

    setErrorMessage("");
    sessionStorage.setItem("roomId", cleanRoomId);

    navigate(`/game-lobby/${cleanRoomId}`, {
      state: {
        roomPassword: password.trim() !== "" ? password.trim() : undefined,
      },
    });
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

          <div className="flex flex-col w-full gap-1 mb-4">
            <PasswordInput
              password={password}
              onChange={setPassword}
              className=" focus:ring-gray-50"
            />
          </div>
          <ErrorMessage message={errorMessage} />
          <PlainColoredButton buttonTitle="Join" nextFunction={handleNext} />
        </div>
      </div>
    </div>
  );
}

export default JoinGame;
