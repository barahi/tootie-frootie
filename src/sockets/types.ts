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

export interface StartRoundPayload {
  letterForRound: string;
  roundNumber: number;
}

export interface EarlyStopPayload {
  triggeredBy: string;
}

export interface WebSocketEvent<EventPayload = any> {
  type: SocketEventTypes;
  payload: EventPayload;
}

export interface RoundScoresPayload {
  roundNumber: number;
  roundScoreMap: Map<string, number>;
}

export interface ReviewRoundScore {
  username: string;
  answer: string;
  points: number;
}

export interface CategoryReviewRoundCompilation {
  category: string;
  playerAnswers: ReviewRoundScore[];
}

export interface FlaggedAnswerPayload {
  category: string;
  targetedPlayer: string;
  triggeredByPlayer: string;
  answer: string;
  score: number;
}

export interface VoteRoundResultPayload {
  category: string;
  roundNumber: number;
  targetedPlayer: string;
  validAnswerVotes: number;
  invalidAnswerVotes: number;
}

export interface RoundResultsPayload {
  roundNumber: number;
  playerScores: Map<string, number>;
}

export interface EndGamePayload {
  gameWinner: string[];
}
