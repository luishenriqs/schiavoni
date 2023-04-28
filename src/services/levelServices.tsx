import { getPlayersResults } from '@services/resultServices';
import { GameDTO, ResultsDTO } from '@dtos/GameDTO';
import { LevelProps, PercentPerformanceDTO } from '@dtos/RankingDTO';
import { UserDTO } from '@dtos/UserDTO';

const anonymousURL = 'anonymousURL';

//==> SOMA TODOS OS PONTOS DE UM PLAYER
const sumPoints = (games: GameDTO[]) => {
    const points = games.map((game) => {
        return game.points
    })
    let totalPoints = 0;
    for(var i = 0; i < points.length; i++) {
        totalPoints += points[i];
    };
    return totalPoints;
};

//==> CALCULA PERCENTUAL DE APROVEITAMENTO DO PLAYER
const performance = (data: PercentPerformanceDTO) => {
    const percent = data.totalPoints / ((data.appearances * 25) / 100);

    let power = 0;
    if (percent >= 65) power = 5;
    if (percent < 65 && percent >= 50) power = 4;
    if (percent < 50 && percent >= 40) power = 3;
    if (percent < 40 && percent >= 30) power = 2;
    if (percent < 30 && percent >= 20) power = 1;
    if (percent < 20) power = 0;
    
    const performance = {
        player: data.playerName,
        percent: Number(percent.toFixed(2)),
        power,
    }
    return performance;
}

//==> PROCESSA O LEVEL
const processLevel = (results: ResultsDTO[], allPlayers: UserDTO[]) => {
    const resultsObjects: any = []
    //==> RETORNA PLAYER E LEVEL
    const result = results.map((item) => {
        const playerName = item.player
        const appearances = item.results.length;
        const totalPoints = sumPoints(item.results);

        const perform = performance({playerName, totalPoints, appearances});

        return perform;
    });

    //==> ISOLA APENAS OS PERCENTUAIS
    const onlyPercent = result.map((el) => {
        return el.percent
    });

    //==> ORDENA OS OS PERCENTUAIS
    const orderedPercent = onlyPercent.sort(function(a, b) {
        return a - b;
    }).reverse();

    //==> ORDENA OS PERFIS E TRATA DUPLICIDADES DE PONTOS
    let orderedResult = orderedPercent.map((el) => {
        const ordered = result.filter((item) => {
            if (item.percent === el) {
                const index = result.indexOf(item);
                result.splice(index, 1);
                return item;
            }
        })
        return ordered;
    });

    //==> LIMPEZA DE DADOS (REMOVE ENCADEAMENTO DESNECESSÁRIO)
    const resultList = orderedResult.map((elemt) => {
        elemt.map((item) => {
            resultsObjects.push(item)
        });
        return resultsObjects
    });

    //==> RECUPERA IMAGE PROFILE E AVATAR
    resultList[0].map((item: LevelProps) => {
        const onePlayer = allPlayers.filter((player) => {
        if (player.name === item.player) return player;
        })
        item.profile = onePlayer[0] && onePlayer[0].profile ? onePlayer[0].profile : anonymousURL;
        item.avatar = onePlayer[0] && onePlayer[0].avatar ? onePlayer[0].avatar : anonymousURL;
    });

    return resultList[0];
};

//==> RETORNA LEVEL
export const getLevel = (
    games: GameDTO[], 
    allPlayers: UserDTO[]
) => {
    const results = games && getPlayersResults(games);
    const level = results && processLevel(results, allPlayers);

    return { level, results };
};

//==> RETORNA ESTATÍSTICAS
export const processStatistics = (games: GameDTO[], player: UserDTO) => {

    const playerName = player.name;
    const appearances = games.length;
    const totalPoints = sumPoints(games);
    const playerPerformance = performance({totalPoints, appearances, playerName});

    return { appearances, totalPoints, playerPerformance };
};