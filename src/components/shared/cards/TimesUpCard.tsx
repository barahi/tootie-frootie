import { Clock } from "lucide-react";
import React, { useState, useEffect } from "react";

interface TimesUpCardProps {
  showCard: boolean;
  children: React.ReactNode;
}

export default function TimesUpCard({ showCard, children }: TimesUpCardProps) {
  const [displayView, setDisplayView] = useState<boolean>(false);

  useEffect(() => {
    if (showCard) {
      setDisplayView(true);

      const timer = setTimeout(() => {
        setDisplayView(false);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [showCard]);

  if (displayView) {
    return (
      <div className="relative w-full h-screen bg-opacity-50 bg-black/50">
        <div className="absolute inset-0 z-50 flex items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-2 px-8 py-4 rounded-lg bg-red-50">
            <Clock />
            <p className="font-normal text-md text-gray-99">Time's up!</p>
          </div>
        </div>
      </div>
    );
  }
  return <>{children}</>;
}
