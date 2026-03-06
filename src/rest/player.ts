import { post } from "./requests";

interface PlayerPayload {
  username: string;
}

interface PlayerJson {
  playerId: string;
}

export async function addNewPlayer(
  payload: PlayerPayload,
): Promise<PlayerJson> {
  const response = await post<PlayerPayload, PlayerJson>("/player", payload);
  return response;
}
