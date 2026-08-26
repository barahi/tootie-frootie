import axios from "axios";
import { post, NetworkError } from "./requests";

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
  try {
    const response = await post<PlayerPayload, PlayerJson>("player", payload);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;
      const message = error.response?.data?.error || error.message;
      throw new NetworkError(message, status, { cause: error });
    }
    throw new NetworkError("unknown error", undefined, { cause: error });
  }
}
