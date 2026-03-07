import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type PasswordInputProps = {
  password: string;
  disabled?: boolean;
  onChange: (password: string) => void;
  className?: string;
};

export const PasswordInput = ({
  password,
  disabled = false,
  onChange,
  className = "",
}: PasswordInputProps) => {
  const [, setPasswordInput] = useState<string>("");
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const handleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const addPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const p = e.target.value;
    if (!p) return;
    password = p;
    setPasswordInput(password);
    onChange((password = p));
  };
  return (
    <div className="flex flex-col">
      <label
        htmlFor="password"
        className={`font-thin tracking-wider
                    ${disabled ? "opacity-50 pointer-events-none" : ""}
                  `}
      >
        Password
      </label>
      <div className="relative inline-flex flex-row items-center">
        <input
          id="password"
          type={isVisible ? "text" : "password"}
          disabled={disabled}
          value={password}
          onChange={addPassword}
          className="w-full p-1 text-sm font-thin text-black transition-all duration-300 border rounded-xl border-gray-99 focus:outline-none focus:ring-gray-99 disabled:border-gray-90 disabled:bg-gray-50 disabled:text-gray-50 disabled:cursor-not-allowed"
        />
        <button
          type="button"
          onClick={handleVisibility}
          disabled={disabled}
          className={`absolute right-3 text-sm font-light
            ${disabled ? "text-gray-90" : "text-gray-99"}`}
        >
          {isVisible ? <Eye /> : <EyeOff />}
        </button>
      </div>
    </div>
  );
};
