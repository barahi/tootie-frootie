import { CircleX } from "lucide-react";

type LetterProps = {
  letter: string;
  onRemove: () => void;
};

export const Letter = ({ letter, onRemove }: LetterProps) => {
  return (
    <div
      className="relative inline-flex items-center justify-center
        py-[0.5px] px-2
        rounded-lg
        border border-gray-99
        bg-honeydew-50
        text-sm"
    >
      <span className="select-none">
        {letter}
        <button
          onClick={onRemove}
          className="
          absolute -top-1 -right-2
          h-4 w-4
          flex items-center justify-center
          text-xs font-medium
          text-gray-99
          bg-white
          rounded-full
          hover:text-black
        "
        >
          <CircleX />
        </button>
      </span>
    </div>
  );
};
