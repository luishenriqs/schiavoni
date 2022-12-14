export type RankingProps = {
  player: string;
  totalPoints: number;
  profile?: string;
  avatar?: string;
};

export type RankingDTO = {
  lastGame: number;
  orderedRanking: RankingProps[];
};

export type PercentPerformanceDTO = {
  totalPoints: number;
  games: number;
  player: string;
};

export type LevelProps = {
  player: string;
  power: number;
  profile?: string;
  avatar?: string;
};

export type LevelDTO = {
  level: LevelProps[];
};
