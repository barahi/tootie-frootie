import { post } from "./requests";

export interface PlayerPayload {
  username: string;
}

export interface PlayerJson {
  id: string;
  username: string;
}

export async function addNewPlayer(
  payload: PlayerPayload,
): Promise<PlayerJson> {
  const response = await post<PlayerPayload, PlayerJson>("player", payload);
  return response;
}
