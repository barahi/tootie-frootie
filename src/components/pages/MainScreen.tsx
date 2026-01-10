import Logo from "../shared/images/Logo";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function MainScreen() {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const saveUsername = (username: string) => {
    setUsername(username);
    localStorage.setItem("username", username);
  };

  const handleNext = (navigateRoute: string) => {
    if (username.length === 0) {
      setErrorMessage("Please enter a valid name");
    } else if (username.length > 20) {
      setErrorMessage("Name cannot exceed 20 characters");
    } else {
      setErrorMessage("");
      navigate(`/${navigateRoute}`);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <h1 className="text-5xl mb-4">
        <Logo />
      </h1>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col justify-center items-center">
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
              e.preventDefault();
              saveUsername(e.target.value);
            }}
            className="text-sm text-center w-60 h-8 bg-white border-solid border-gray border-1 rounded-lg font-thin p-2 focus:outline-none placeholder:italic placeholder:text-black placeholder:text-sm"
          ></input>
          {errorMessage && (
            <p className="bg-red-10 px-2 py-1 text-xs font-thin tracking-wider text-red-90 mt-2 border-none rounded-lg">
              {errorMessage}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-2 justify-center items-center">
          <button
            onClick={() => handleNext("new-game")}
            className="text-base tracking-wider font-thin w-60 h-8 border-solid border-black border-1 rounded-lg hover:border-2"
          >
            Start a new game
          </button>
          <button
            onClick={() => handleNext("join-game")}
            className="text-base tracking-wider font-thin w-60 h-8 border-solid border-black border-1 rounded-lg hover:border-2"
          >
            Join an existing game
          </button>
        </div>
      </div>
    </div>
  );
}

export default MainScreen;
