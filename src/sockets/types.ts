export enum SocketEventTypes {
  START_ROUND = "START_ROUND",
  SUBMIT_ANSWER = "SUBMIT_ANSWER",
  ROUND_SCORES = "ROUND_SCORES",
  BEGIN_VOTE_PHASE = "BEGIN_VOTE_PHASE",
  SUBMIT_VOTE = "SUBMIT_VOTE",
  END_VOTE_ROUND = "END_VOTE_ROUND",
  END_ROUND = "END_ROUND",
  END_GAME = "END_GAME",
}

export interface Player {
  id: string;
  username: string;
}

export interface RoomSettings {
  id: string;
  hostPlayerId: string;
  maxPlayers: number;
  roundDuration: number;
  numberOfRounds: number;
  categories: string[];
  excludedLetters: string[];
  password: string;
  isGameStarted: boolean;
}

export interface WebSocketEvent<EventPayload = any> {
  type: SocketEventTypes;
  payload: EventPayload;
}
