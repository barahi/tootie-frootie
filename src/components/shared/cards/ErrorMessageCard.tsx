interface ErrorMessageCardProps {
  message: string;
}

export default function ErrorMessageCard({ message }: ErrorMessageCardProps) {
  return (
    <div className="flex items-center justify-center w-full px-[0.75rem] py-[0.25rem] mt-2 rounded-xl bg-red-10 ">
      <p className="font-thin ft-base text-align text-red-90">{message} </p>
    </div>
  );
}
