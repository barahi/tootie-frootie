interface BlackButtonProps {
  buttonTitle: string;
  nextFunction: () => void;
}

export default function BlackButton({
  buttonTitle,
  nextFunction,
}: BlackButtonProps) {
  return (
    <>
      <button
        onClick={() => nextFunction?.()}
        className="bg-black font-thin text-white text-base p-1 w-24 rounded"
      >
        {buttonTitle}
      </button>
    </>
  );
}
