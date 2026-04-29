interface CategoryInputProps {
  num: number;
  name?: string | null;
  input: string;
  canAddInput?: boolean | false;
  setInput: (value: string) => void;
}

export const CategoryInput = ({
  num,
  name,
  input,
  canAddInput,
  setInput,
}: CategoryInputProps) => {
  const addInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
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
        disabled={canAddInput}
        onChange={(e) => addInput(e)}
        className="text-base font-light pt-0.5 pb-0.5 pl-1 pr-1 bg-honeydew-90 border-solid border-gray-90 border-1 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-50"
      ></input>
    </div>
  );
};
