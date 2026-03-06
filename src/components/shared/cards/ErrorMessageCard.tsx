interface ErrorMessageCardProps {
  message: string;
}

export default function ErrorMessageCard({ message }: ErrorMessageCardProps) {
  return (
    <div className="flex items-center justify-center w-full mt-2 p-[3px] rounded-xl bg-red-10 ">
      <p className="font-thin ft-base text-align text-red-90">{message} </p>
    </div>
  );
}
