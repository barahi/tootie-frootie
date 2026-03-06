import { Letter } from "./Letter";
import { useState } from "react";

type LetterInputProps = {
  letters: string[];
  disabled?: boolean;
  label?: string;
  onChange: (letters: string[]) => void;
};

export const LetterInput = ({
  letters,
  disabled = false,
  label = "Exclude",
  onChange,
}: LetterInputProps) => {
  const [inputLetter, setInputLetter] = useState<string>("");

  const addLetter = (letter: string) => {
    if (letters.includes(letter)) return;
    onChange([...letters, letter]);
  };

  const removeLetter = (letter: string) => {
    if (!letters.includes(letter)) return;
    onChange(letters.filter((l) => l !== letter));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const letter = e.target.value.replace(/[^a-zA-Z]/g, "").toLowerCase();
    if (!letter) return;
    addLetter(letter);
    setInputLetter("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && inputLetter === "" && letters.length > 0) {
      onChange(letters.slice(0, -1));
    }
  };

  return (
    <div className="flex flex-col">
      <label
        htmlFor="letter-input"
        className={`font-thin tracking-wider
                    ${disabled ? "opacity-50 pointer-events-none" : ""}
                  `}
      >
        {label}
      </label>
      <div
        className={`
          flex flex-wrap items-center gap-2
          ${
            disabled
              ? " border rounded-xl p-1 border-gray-90 bg-gray-50 pointer-events-none"
              : "border rounded-xl p-1 "
          }
        `}
      >
        {letters.map((l) => (
          <Letter key={l} letter={l} onRemove={() => removeLetter(l)} />
        ))}

        <input
          id="letter-input"
          value={inputLetter}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          maxLength={1}
          className="w-8 text-sm font-thin text-black transition-all duration-300 rounded-lg border-1 border-gray-99 focus:outline-none focus:ring-gray-99 disabled:border-gray-90 disabled:bg-gray-50 disabled:text-gray-50 disabled:cursor-not-allowed"
        ></input>
      </div>
    </div>
  );
};
