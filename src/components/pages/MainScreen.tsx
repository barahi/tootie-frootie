import Logo from "../shared/Logo";

function MainScreen() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <h1 className="text-5xl mb-4">
        <Logo />
      </h1>
      <div className="flex flex-col gap-2">
        <button className="w-60 h-10 border-solid border-black border-1 rounded-lg hover:border-2">
          Start a new game
        </button>
        <button className="w-60 h-10 border-solid border-black border-1 rounded-lg hover:border-2">
          Join an existing game
        </button>
      </div>
    </div>
  );
}

export default MainScreen;
