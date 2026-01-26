import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "../../shared/bars/Header";
import BlackButton from "../../shared/buttons/BlackButton";
import { PasswordInput } from "../../shared/user-input/passwordInput/PasswordInput";

type Props = {
  roomId: string;
  prevPage: () => void;
};

function JoinGame2({ roomId, prevPage }: Props) {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();
  const handleNext = () => {
    //TO DO: validate password with backend
    if (password === "") {
      setErrorMessage("Password cannot be empty");
      return;
    }
    navigate("/game-lobby/");
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
          <div className="flex flex-col w-full gap-1 mb-4">
            <p className="text-base font-thin tracking-widest text-gray-90">
              Room ID
            </p>
            <p className="text-base text-gray-90 font-light pt-0.5 pb-0.5 pl-1 pr-1 bg-gray-10 border-none rounded-md focus:outline-none focus:ring-2 focus:ring-gray-10">
              {roomId}
            </p>
          </div>
          <div className="flex flex-col w-full gap-1 mb-4">
            <PasswordInput
              password={password}
              onChange={setPassword}
              className=" focus:ring-gray-50"
            />
          </div>
          {errorMessage && (
            <p className="px-2 py-1 mb-6 text-xs font-thin tracking-wider border-none rounded-lg bg-red-10 text-red-90">
              {errorMessage}
            </p>
          )}
          <BlackButton buttonTitle="Join" nextFunction={handleNext} />
        </div>
      </div>
    </div>
  );
}

export default JoinGame2;
