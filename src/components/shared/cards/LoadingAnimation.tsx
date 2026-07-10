import React from "react";
import { ThreeDots } from "react-loader-spinner";
import { useState, useEffect } from "react";

interface LoadingAnimationProps {
  serverLoading: boolean;
  minimumTime: number;
  children: React.ReactNode;
}

export default function LoadingAnimation({
  serverLoading,
  minimumTime = 800,
  children,
}: LoadingAnimationProps) {
  const [timeExpired, setTimeExpired] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeExpired(true);
    }, minimumTime);

    return () => clearTimeout(timer);
  }, [minimumTime]);

  if (serverLoading || !timeExpired) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-screen font-light text-gray-99 animate-pulse">
        <ThreeDots
          visible={true}
          height="80"
          width="80"
          color="#2e2b2f"
          radius="9"
        />
        <p className="font-light text-md text-gray-99">Loading...</p>
      </div>
    );
  }
  return <>{children}</>;
}
