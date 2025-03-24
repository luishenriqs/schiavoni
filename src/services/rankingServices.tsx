import { GameDTO } from '@dtos/GameDTO';
import { RankingProps } from '@dtos/RankingDTO';
import { UserDTO } from '@dtos/UserDTO';

//=> PROCESSA O RANKING DA TEMPORADA SELECIONADA
const getPlayersData = (
  games: GameDTO[],
  allPlayers: UserDTO[],
): RankingProps[] => {
  const uniquePlayers = [
    ...new Set(
      allPlayers.filter(player => player.name !== 'Anonymous Player').map(player => player.name)
    ),
  ];

  return uniquePlayers
    .map(playerName => {
      const player = allPlayers.find(p => p.name === playerName);
      const playerPoints = games.filter(game => game.name === playerName).map(game => game.points);

      const totalPoints = playerPoints.reduce((acc, val) => acc + val, 0);

      return {
        player: playerName,
        totalPoints,
        profile: player?.profile ?? 'anonymousURL',
        avatar: player?.avatar ?? 'anonymousURL',
      };
    })
    .sort((a, b) => b.totalPoints - a.totalPoints);
};

//=> RETORNA RANKING
export const getRanking = (
  games: GameDTO[],
  allPlayers: UserDTO[],
  currentStage: number
) => {
  if (!games?.length || !allPlayers?.length) {
    return { game: currentStage, orderedRanking: [] };
  }

  const orderedRanking = getPlayersData(games, allPlayers);

  return {
    game: currentStage,
    orderedRanking,
  };
};
