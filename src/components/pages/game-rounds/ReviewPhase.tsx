import Header from "../../shared/bars/Header";

function ReviewPhase() {
  return (
    <div className="relative w-full h-screen">
      <h1 className="absolute top-0 left-0 w-full z-10">
        <Header />
      </h1>
      <div className="absolute inset-0 flex justify-center items-center">
        <div className="flex flex-col w-[55%] items-center gap-4 border-solid border-none border-1 rounded-3xl p-10">
          <p className="font-thin text-lg p-2 pr-4 pl-4 bg-gray-50 opacity-80 border-none rounded-xl tracking-wider">
            Game Phase
          </p>
        </div>
      </div>
    </div>
  );
}

export default ReviewPhase;
