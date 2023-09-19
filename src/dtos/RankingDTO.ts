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
  appearances: number;
  totalPoints: number;
  playerName: string;
};

export type playerPerformanceDTO = {
  player: string;
  percent: number;
  power: number;
};

type ResultsDTO = {
  first: number;
  second: number;
  third: number;
  fourth: number;
  fifth: number;
  sixth: number;
  seventh: number;
  eighth: number;
  ninth: number;
  tenth: number;
  eleventh: number;
  twelfth: number;
};

export type StatisticsDTO = {
  appearances: number;
  playerPerformance: playerPerformanceDTO;
  pointsAverage: string;
  results: ResultsDTO;
  totalPoints: number;
};

export type LevelProps = {
  player: string;
  power: number;
  profile?: string;
  avatar?: string;
};

export type LevelDTO = {
  level: LevelProps[];
}[];
