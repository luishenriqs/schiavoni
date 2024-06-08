import { GameDTO } from '@dtos/GameDTO'
import { RankingProps } from '@dtos/RankingDTO'
import { UserDTO } from '@dtos/UserDTO'

//==> REMOVE O PIOR RESULTADO A PARTIR DA 37º TEMPORADA E APÓS A 7º ETAPA
const removeWorstResult = (allPoints: number[], season: number, game: number) => {
    if (season >= 37 && game >= 7) {
        const minValue = Math.min(...allPoints);
        const minIndex = allPoints.indexOf(minValue);
        allPoints.splice(minIndex, 1);
        return allPoints;
    } else {
        return allPoints;
    }
}

//==> PROCESSA O RANKING DA TEMPORADA SELECIONADA
const getPlayersData = (games: GameDTO[], allPlayers: UserDTO[], season: number, game: number) => {
    const players = allPlayers.filter(playerInfo => playerInfo.name !== "Anonymous Player"); // Remove "Anonymous Player"
    const uniquePlayers = players && [...new Set(players.map(player => player.name))];
    const playersResult = [] as RankingProps[];

    uniquePlayers.forEach(playerName => {
        const player = allPlayers && allPlayers.find(player => player.name === playerName);

        let allPoints = [] as number[]
        let totalPoints = 0;

        games.forEach(game => {
        if (game.name === playerName) {
            allPoints.push(game.points)
        }
        });

        const bestResults = removeWorstResult(allPoints, season, game) // Pode remover pior resultado
        totalPoints = bestResults.reduce((accumulator, currentValue) => accumulator + currentValue, 0); // Soma os pontos

        playersResult.push({
        player: playerName,
        totalPoints,
        profile: player?.profile || "anonymousURL",
        avatar: player?.avatar || "anonymousURL",
        });
    });

  // Ordena a classificação dos jogadores
  playersResult.sort((a, b) => b.totalPoints - a.totalPoints);

  return playersResult;
}

//==> RETORNA RANKING
export const getRanking = (
    games: GameDTO[], 
    allPlayers: UserDTO[],
    season: number,
    game: number,
) => {
    const orderedRanking = games && allPlayers && getPlayersData(games, allPlayers, season, game)
    const ranking = {
        game,
        orderedRanking
    }
    return ranking;
};