import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Header from "../../shared/bars/Header";
import BlackButton from "../../shared/buttons/BlackButton";
import { PasswordInput } from "../../shared/user-input/passwordInput/PasswordInput";

type Props = {
  roomId: string;
  prevPage: () => void;
};

function Screen2({ roomId, prevPage }: Props) {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();
  const handleNext = () => {
    // validate password with backend
    if (password === "") {
      setErrorMessage("Password cannot be empty");
      return;
    }
    navigate("/game-lobby/");
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
          <div className="flex flex-col w-full gap-1 mb-4">
            <p className="text-base text-gray-90 font-thin tracking-widest">
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
              className="text-base font-light bg-honeydew-90
              w-8 border-1 rounded-lg border-gray-99 text-black text-sm font-thin transition-all duration-300
                    focus:outline-none focus:ring-gray-50
                    disabled:border-gray-90 text-base font-light pt-0.5 pb-0.5 pl-1 pr-1 bg-honeydew-90 border-solid border-gray-90 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-50
                    disabled:bg-gray-50
                    disabled:text-gray-50
                    disabled:cursor-not-allowed"
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

export default Screen2;
