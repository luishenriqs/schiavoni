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
