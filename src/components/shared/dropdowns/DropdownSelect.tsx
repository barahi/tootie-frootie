interface DropdownSelectProps {
  selectItems: string[];
  title: string;
  onSelect: (value: number) => void;
}
export default function DropdownSelect({
  selectItems,
  title,
  onSelect,
}: DropdownSelectProps) {
  return (
    <div className="flex flex-row justify-between w-full">
      <p className="font-thin tracking-wider">{title}</p>
      <select
        id={title}
        onChange={(e) => {
          onSelect(Number(e.target.value));
        }}
        className="w-16 text-sm font-thin bg-honeydew-90 border border-black rounded-lg p-0.5"
      >
        {selectItems.map((item, idx) => (
          <option key={idx} value={item} className="bg-blue-60">
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}
