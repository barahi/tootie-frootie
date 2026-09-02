import { Clock, Ban } from "lucide-react";
import React, { useState, useEffect } from "react";

interface TimesUpCardProps {
  message: string;
  triggeredBy?: string;
  showCard: boolean;
  children: React.ReactNode;
}

export default function TimesUpCard({
  message,
  triggeredBy,
  showCard,
  children,
}: TimesUpCardProps) {
  const [, setDisplayView] = useState<boolean>(false);

  useEffect(() => {
    if (showCard) {
      setDisplayView(true);

      const timer = setTimeout(() => {
        setDisplayView(false);
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, [showCard]);

  const isEarlyStop = message.toLowerCase().includes("early stop");

  return (
    <div className="relative w-full min-h-screen">
      {children}

      {showCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="flex flex-col items-center justify-center gap-2 px-8 py-6 text-center bg-white shadow-2xl rounded-xl animate-fade-in">
            {isEarlyStop ? (
              <Ban className="w-10 h-10" />
            ) : (
              <Clock className="w-10 h-10" />
            )}
            <h2 className="text-xl font-thin text-gray-99">{message}</h2>
            {isEarlyStop && triggeredBy && (
              <div className="flex flex-row items-center justify-center gap-1">
                <p className="text-sm font-light text-gray-99">Triggered by</p>
                <p className="text-sm font-light text-gray-99">
                  {" "}
                  {triggeredBy}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
