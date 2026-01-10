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
    <div className="flex flex-col mb-4">
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
          className={`
            w-full pt-0.5 pb-0.5 pl-1 pr-1
            focus:outline-none focus:ring-1 focus:ring-gray-10
            ${className}
          `}
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
