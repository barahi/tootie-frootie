import { Navigate, useParams } from "react-router-dom";
import { useGameSetup } from "./GameFlowContext";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { gameConfig } = useGameSetup();
  const { roomId: urlRoomId } = useParams<{ roomId: string }>();

  const playerId = sessionStorage.getItem("id");

  if (!playerId) {
    return <Navigate to="" replace />;
  }

  if (!urlRoomId) {
    return <Navigate to="/join-game/room" replace />;
  }

  if (gameConfig.roomId !== urlRoomId.trim()) {
    return <Navigate to={`/join-game/room?roomId=${urlRoomId}`} replace />;
  }
  return <>{children}</>;
}
