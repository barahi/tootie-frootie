import { useState } from "react";

type LabelInputProps = {
  label: string;
  input: string;
  onChange: (password: string) => void;
  className?: string;
};

export const LabelInput = ({
  label,
  input,
  onChange,
  className = "",
}: LabelInputProps) => {
  const [, setInput] = useState<string>("");

  const addInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!e.target.value) {
      setInput("");
      onChange("");
      return;
    }
    setInput(e.target.value);
    onChange((input = e.target.value));
  };

  return (
    <div className="flex flex-col w-full">
      <label htmlFor="password" className={`font-thin tracking-wider`}>
        {label}
      </label>
      <input
        id="password"
        type="text"
        value={input}
        onChange={addInput}
        className={`text-base font-light pt-0.5 pb-0.5 pl-1 pr-1 bg-honeydew-90 border-solid border-gray-90 border-1 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-50 ${className}`}
      />
    </div>
  );
};
