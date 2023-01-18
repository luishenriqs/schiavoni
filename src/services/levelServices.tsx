import { GameDTO, ResultsDTO } from '@dtos/GameDTO'
import { LevelProps, PercentPerformanceDTO } from '@dtos/RankingDTO'
import { UserDTO } from '@dtos/UserDTO'

const anonymousURL = 'anonymousURL';

//==> RETORNA NOMES DOS PLAYERS
const findNames = (games: GameDTO[]) => {
    games.filter((el) => {
        if (el.season === 0) {
            const index = games.indexOf(el)
            games.splice(index, 1);
        }
    });

    const names = games.map((el) => {
        return el.name
    });
    const players = [...new Set(names)];

    return players;
};

//==> RETORNA PLAYERS E ARRAY COM SEUS RESULTADOS COMPLETOS (GameDTO[])
const findPlayersResults = (names: string[], games: GameDTO[]) => {
    return names.map((player) => {
        const results = games.filter((game) => {
            if (game.name === player) return game;
        });
        const game = {
            player,
            results
        };
        return game;
    });
};

//==> CALCULA PERCENTUAL DE APROVEITAMENTO DO PLAYER
const performance = (data: PercentPerformanceDTO) => {
    const percent = data.totalPoints / ((data.games * 25) / 100);

    let power = 0;
    if (percent >= 65) power = 5;
    if (percent < 65 && percent >= 50) power = 4;
    if (percent < 50 && percent >= 40) power = 3;
    if (percent < 40 && percent >= 30) power = 2;
    if (percent < 30 && percent >= 20) power = 1;
    if (percent < 20) power = 0;
    
    const performance = {
        player: data.player,
        power
    }
    return performance;
}

//==> PROCESSA O LEVEL
const processLevel = (results: ResultsDTO[], allPlayers: UserDTO[]) => {
    const resultsObjects: any = []
    //==> RETORNA PLAYER E LEVEL
    const result = results.map((item) => {
        const games = item.results.length;
        const points = item.results.map((game) => {
            return game.points
        })
        const player = item.player

        let totalPoints = 0;
        for(var i = 0; i < points.length; i++) {
            totalPoints += points[i];
        };

        const perform = performance({player, totalPoints, games});

        return perform;
    });

    //==> ISOLA APENAS OS PONTOS
    const onlyPower = result.map((el) => {
        return el.power
    });

    //==> ORDENA OS PONTOS
    const orderedPower = onlyPower.sort(function(a, b) {
        return a - b;
    }).reverse();

    //==> ORDENA OS PERFIS E TRATA DUPLICIDADES DE PONTOS
    let orderedResult = orderedPower.map((el) => {
        const ordered = result.filter((item) => {
            if (item.power === el) {
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
    const players = games.length > 0 && findNames(games);
    const results = players && findPlayersResults(players, games);
    const level = results && processLevel(results, allPlayers);

    return level;
};