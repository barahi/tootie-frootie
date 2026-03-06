import Logo from "../shared/images/Logo";
import ErrorMessageCard from "../shared/cards/ErrorMessageCard";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function MainScreen() {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const saveUsername = (name: string) => {
    const fomattedUsername = name.trim();
    setUsername(fomattedUsername);
    localStorage.setItem("username", fomattedUsername);
  };

  const handleNavigate = (path: string) => {
    if (!username) {
      setErrorMessage("Please fill out name");
      return;
    }
    setErrorMessage("");
    navigate(path);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <h1 className="mb-4 text-5xl">
        <Logo />
      </h1>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col items-center justify-center">
          <label
            className="text-lg font-light tracking-wider"
            htmlFor="username"
          >
            Enter your name
          </label>
          <input
            type="text"
            id="username"
            autoComplete="off"
            name="username"
            value={username}
            onChange={(e) => {
              saveUsername(e.target.value);
            }}
            className="h-8 p-2 text-sm font-thin text-center bg-white border-solid rounded-lg w-60 border-gray border-1 focus:outline-none placeholder:italic placeholder:text-black placeholder:text-sm"
          ></input>
          {errorMessage && <ErrorMessageCard message={errorMessage} />}
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <button
            onClick={() => handleNavigate("/new-game")}
            className="h-8 text-base font-thin tracking-wider border-black border-solid rounded-lg w-60 border-1 hover:border-2"
          >
            Start a new game
          </button>
          <button
            onClick={() => handleNavigate("/join-game")}
            className="h-8 text-base font-thin tracking-wider border-black border-solid rounded-lg w-60 border-1 hover:border-2"
          >
            Join an existing game
          </button>
        </div>
      </div>
    </div>
  );
}

export default MainScreen;
