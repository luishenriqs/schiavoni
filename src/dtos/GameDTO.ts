export type GameDTO = {
  doc_id: string;
  date: string;
  game: number;
  name: string;
  points: number;
  position: number;
  season: number;
};

export type SeasonDTO = {
  doc_id: string;
  game: number;
  season: number;
};

export type ResultsDTO = {
  player: string;
  results: GameDTO[];
};

export type GamesResultsDTO = {
  game_1: GameDTO[];
  game_2: GameDTO[];
  game_3: GameDTO[];
  game_4: GameDTO[];
  game_5: GameDTO[];
  game_6: GameDTO[];
  game_7: GameDTO[];
  game_8: GameDTO[];
};
