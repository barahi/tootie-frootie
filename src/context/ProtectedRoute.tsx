import { Navigate } from "react-router-dom";
import { useGameSetup } from "./GameFlowContext";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isInitialized } = useGameSetup();

  if (!isInitialized) {
    return <Navigate to="/new-game" replace />;
  }
  return <>{children}</>;
}
