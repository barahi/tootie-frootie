interface CategoryInputProps {
  num: number;
  name: string | null;
  input: string;
  canAddInput?: boolean;
  setInput: (value: string) => void;
}

export const CategoryInput = ({
  num,
  name,
  canAddInput,
  input,
  setInput,
}: CategoryInputProps) => {
  const addInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (!canAddInput) return;
    if (!e.target.value) {
      setInput("");
      return;
    }
    setInput(e.target.value);
  };

  return (
    <div className="flex flex-col p-0.25">
      <label htmlFor={`category-${num}`} className="font-thin tracking-wide">
        {name != null ? `${name}` : `Category ${num + 1}`}
      </label>
      <input
        id={`category-${num}`}
        type="text"
        key={num}
        value={input}
        disabled={!canAddInput}
        onChange={(e) => addInput(e)}
        className={`${canAddInput ? "bg-honeydew-90 text-black-90 border-gray-90" : "bg-gray-50 text-gray-99 border-gray-50"} text-base font-light pt-0.5 pb-0.5 pl-1 pr-1 border-solid border-1 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-50`}
      ></input>
    </div>
  );
};
