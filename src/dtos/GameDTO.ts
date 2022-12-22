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
