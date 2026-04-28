import { post } from "./requests";

export interface RoomPayload {
  hostPlayerId: string;
  maxPlayers: number;
  roundDuration: number;
  numberOfRounds: number;
  categories: string[];
  excludedLetters?: string[];
  language: string;
  password?: string;
}

export interface RoomJson {
  id: string;
  hostPlayerId: string;
  maxPlayers: number;
  roundDuration: number;
  numberOfRounds: number;
  categories: string[];
  excludedLetters: string[];
  password: string;
}

export async function createRoom(payload: RoomPayload): Promise<RoomJson> {
  const response = await post<RoomPayload, RoomJson>("room", payload);
  console.log("Response from create room: ", JSON.stringify(response));
  return response;
}
