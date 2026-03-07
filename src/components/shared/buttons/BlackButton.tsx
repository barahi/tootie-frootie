interface BlackButtonProps {
  buttonTitle: string;
  nextFunction: () => void;
  className?: string;
}

export default function BlackButton({
  buttonTitle,
  nextFunction,
  className,
}: BlackButtonProps) {
  return (
    <>
      <button
        onClick={() => nextFunction?.()}
        className={`bg-black font-thin text-white text-base p-1 w-24 rounded ${
          className ? className : ""
        }`}
      >
        {buttonTitle}
      </button>
    </>
  );
}
