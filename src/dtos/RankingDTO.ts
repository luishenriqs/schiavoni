export type RankingProps = {
  player: string;
  totalPoints: number;
  profile?: string;
};

export type RankingDTO = {
  lastGame: number;
  orderedRanking: RankingProps[];
};
