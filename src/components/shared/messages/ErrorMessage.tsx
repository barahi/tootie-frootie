type ErrorMessageProps = {
  message: string;
};

export function ErrorMessage({ message }: ErrorMessageProps) {
  if (!message) return null;

  return (
    <p className="px-2 py-1 mb-6 text-xs font-thin tracking-wider border-none rounded-lg bg-red-10 text-red-90">
      {message}
    </p>
  );
}
