import { Navigate } from "react-router-dom";
import { useGameSetup } from "./GameFlowContext";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { gameConfig } = useGameSetup();

  if (!gameConfig) {
    return <Navigate to="/new-game" replace />;
  }
  return <>{children}</>;
}
