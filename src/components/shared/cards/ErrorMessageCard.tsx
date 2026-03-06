interface ErrorMessageCardProps {
  message: string;
}

export default function ErrorMessageCard({ message }: ErrorMessageCardProps) {
  return (
    <div>
      <p>{message}</p>
    </div>
  );
}
