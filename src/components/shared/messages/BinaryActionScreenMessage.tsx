interface BinaryActionScreenMessageProps {
  message: string;
  action1: string;
  action2: string;
  function1?: () => void;
  function2?: () => void;
}

export default function BinaryActionScreenMessage({
  message,
  action1,
  action2,
  function1,
  function2,
}: BinaryActionScreenMessageProps) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-opacity-50 bg-black/50">
      <div className="flex flex-col items-center justify-center gap-2 p-4 border-none shadow-2xl text-md border-gray-90 rounded-xl bg-gray-10">
        <p className="font-medium text-md text-gray-99">{message}</p>
        <div className="flex flex-row items-center justify-center gap-4">
          <button
            className="px-2 py-1 font-thin border-none rounded-lg hover:bg-blue-50 transition-colors duration-200` bg-gray-50"
            onClick={function1}
          >
            <p className="text-sm">{action1}</p>
          </button>
          <button
            className="px-2 py-1 font-thin border-none rounded-lg hover:bg-blue-50 transition-colors duration-200` bg-gray-50"
            onClick={function2}
          >
            <p className="text-sm">{action2}</p>
          </button>
        </div>
      </div>
    </div>
  );
}
