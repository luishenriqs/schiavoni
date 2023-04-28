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

export type StatisticsDTO = {
  totalPoints: number;
  appearances: number;
  playerPerformance: playerPerformanceDTO;
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
