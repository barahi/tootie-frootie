interface PlainColoredButtonProps {
  buttonTitle: string;
  nextFunction: () => void;
  className?: string;
}

export default function PlainColoredButton({
  buttonTitle,
  nextFunction,
  className,
}: PlainColoredButtonProps) {
  return (
    <>
      <button
        onClick={() => nextFunction?.()}
        className={`bg-black font-thin text-white text-base p-1 w-24 rounded 
          ${className ? className : ""}`}
      >
        {buttonTitle}
      </button>
    </>
  );
}
