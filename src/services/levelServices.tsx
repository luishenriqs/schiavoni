import { GameDTO, ResultsDTO } from '@dtos/GameDTO'
import { RankingProps, PercentPerformanceDTO } from '@dtos/RankingDTO'
import { UserDTO } from '@dtos/UserDTO'
import { Players } from '@pages/Ranking/Players';

const anonymousURL = 'anonymousURL';

//==> RETORNA NOMES DOS PLAYERS
const findNames = (games: GameDTO[]) => {
    const names = games.map((el) => {
        return el.name
    });
    const players = [...new Set(names)];
    const index = players.indexOf("");
    players.splice(index, 1);
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
    const performance = {
        player: data.player,
        percent: Number(percent.toFixed(2))
    }
    return performance;
}

/* ################## CALCULO DE DESEMPENHO NO JS BIM ##################### */
/* ######################################################################## */
/*
var Leandro = { points: 80, games: 8 } // 40%
var Diego  = { points: 90, games:  8 } // 45%
var Luisāo = { points: 100, games:  8 } // 50%
var Negreanu = { points: 110, games: 8} // 55%

function maxPoints(name) {
  var total = name.points / ((name.games * 25) / 100);
  return total
}

console.log(maxPoints(Leandro))
console.log(maxPoints(Diego))
console.log(maxPoints(Luisāo))
console.log(maxPoints(Negreanu))
*/
/* ######################################################################## */
/* ######################################################################## */

//==> PROCESSA O LEVEL
const processLevel = (results: ResultsDTO[], allPlayers: UserDTO[]) => {
    const resultsObjects: any = []
    //==> RETORNA PLAYER E SEUS PONTOS SOMADOS
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


    
        console.log('############# ', perform)
        return perform;
    });


    // //==> ISOLA APENAS OS PONTOS
    // const onlyPoints = result.map((el) => {
    //     return el.totalPoints
    // });

    // //==> ORDENA OS PONTOS
    // const orderedPoints = onlyPoints.sort(function(a, b) {
    //     return a - b;
    // }).reverse();

    // //==> ORDENA OS RESULTADOS E TRATA DUPLICIDADES DE PONTOS
    // let orderedResult = orderedPoints.map((el) => {
    //     const ordered = result.filter((item) => {
    //         if (item.totalPoints === el) {
    //             const index = result.indexOf(item);
    //             result.splice(index, 1);
    //             return item;
    //         }
    //     })
    //     return ordered;
    // });

    // //==> LIMPEZA DE DADOS (REMOVE ENCADEAMENTO DESNECESSÁRIO)
    // const resultList = orderedResult.map((elemt) => {
    //     elemt.map((item) => {
    //         resultsObjects.push(item)
    //     })
    //     return resultsObjects
    // });

    // //==> RECUPERA IMAGE PROFILE
    // resultList[0].map((item: RankingProps) => {
    //     const onePlayer = allPlayers.filter((player) => {
    //     if (player.name === item.player) return player;
    //     })
    //     item.profile = onePlayer[0].profile ? onePlayer[0].profile : anonymousURL;
    //     item.avatar = onePlayer[0].avatar ? onePlayer[0].avatar : anonymousURL;
    // });

    // return resultList[0];
};

//==> RETORNA LEVEL
export const getLevel = (
    games: GameDTO[], 
    allPlayers: UserDTO[]
) => {
    const players = games.length > 0 && findNames(games);
    const results = players && findPlayersResults(players, games);
    const orderedRanking = results && processLevel(results, allPlayers);

    //console.log('RESULTS --> ', results[0].player, results[0].results)


    const level = {

        //orderedRanking
    }
    return level;
};