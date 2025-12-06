export enum GameStatus {
  IDLE = 'IDLE',
  PLAYING = 'PLAYING',
  WON = 'WON',
  LOST = 'LOST'
}

export enum GameMode {
  CLASSIC = 'CLASSIC',
  AI = 'AI'
}

export type Language = 'IT' | 'EN' | 'FR' | 'ES' | 'DE';

export interface WordData {
  word: string;
  hint: string;
}

export interface GameState {
  status: GameStatus;
  word: string;
  hint: string;
  guessedLetters: Set<string>;
  wrongGuesses: number;
  maxLives: number;
  language: Language;
}