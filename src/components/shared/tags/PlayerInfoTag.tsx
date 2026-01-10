type PlayerInfoTagProps = {
  number: number;
  name?: string;
  isHost?: boolean;
  className?: string;
};

const PlayerInfoTag = ({
  number,
  name = "?",
  isHost = false,
  className = "",
}: PlayerInfoTagProps) => {
  return (
    <>
      {name === "?" ? (
        <div className="flex flex-row items-center gap-2 px-2 py-2 border-dashed border-gray-90 border-1 rounded-lg">
          <p className="text-gray-90 text-sm">{`#${number}`}</p>
          <p className="text-xs text-center bg-gray-90 text-white border-none rounded-full px-[2.2%] py-[2px]">
            ?
          </p>
        </div>
      ) : (
        <div
          className={`${className} relative flex flex-row items-center gap-3 px-2 py-2 border-gray-90 border-1 rounded-lg bg-honeydew-90`}
        >
          <p className="text-gray-90 text-sm">{`#${number}`}</p>
          <p className="text-xs text-center bg-blue-90 text-white border-none rounded-full px-[2.2%] py-[2px]">
            {name.slice(0, 1).toUpperCase()}
          </p>
          <p className="text-gray-99 text-sm font-thin tracking-wider">
            {name}
          </p>
          {isHost && (
            <p className="text-[10px] tracking-wider font-thin border-red-50 border-1 rounded-2xl px-2 py-[1px] bg-red-10 text-red-90 absolute right-3">
              Admin
            </p>
          )}
        </div>
      )}
    </>
  );
};
export default PlayerInfoTag;
