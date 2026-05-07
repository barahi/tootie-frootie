import { Clock } from "lucide-react";
import { useTimer } from "react-timer-hook";

interface TimerProps {
  color?: string | undefined;
  totalSeconds: number;
  onTimeExpire: () => void;
}

export default function Timer({
  color,
  totalSeconds,
  onTimeExpire,
}: TimerProps) {
  const time = new Date();
  time.setSeconds(time.getSeconds() + totalSeconds);
  const { minutes, seconds } = useTimer({
    expiryTimestamp: time,
    onExpire: () => onTimeExpire(),
  });

  const formatTime = (val: number) => val.toString().padStart(2, "0");

  return (
    <div className="flex flex-row gap-2 mt-1 ml-1">
      <Clock color={color !== "" ? color : "#ED254E"} size={20} />
      <span
        style={{ color: color !== "" ? color : "#ED254E" }}
        className="font-normal tracking-wide text-md"
      >
        {formatTime(minutes)}:{formatTime(seconds)}
      </span>
    </div>
  );
}
