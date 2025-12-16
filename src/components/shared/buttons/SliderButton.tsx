import { Switch } from "@headlessui/react";

interface SliderButtonProps {
  value: boolean;
  onSelect: (value: boolean) => void;
}

export default function SliderButton({ value, onSelect }: SliderButtonProps) {
  return (
    <div className="flex items-center">
      <Switch
        checked={value}
        onChange={onSelect}
        className={`${
          value ? "bg-black" : "bg-gray-90"
        } relative inline-flex h-6 w-11 text-wider items-center rounded-full transition-colors duration-300`}
      >
        <span
          className={`${
            value ? "translate-x-6" : "translate-x-1"
          } inline-block h-4 w-4 transform  text-wider rounded-full bg-white transition-transform duration-300`}
        />
      </Switch>
    </div>
  );
}
