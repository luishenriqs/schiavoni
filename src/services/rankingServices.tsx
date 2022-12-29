import { GameDTO, ResultsDTO } from '@dtos/GameDTO'

export const findNames = (games: GameDTO[]) => {
    const names = games.map((el) => {
        return el.name
    });
    const players = [...new Set(names)];
    return players;
};

export const findPlayersResults = (playersCurrentSeason: string[], games: GameDTO[]) => {
    return playersCurrentSeason.map((player) => {
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

export const processRanking = (results: ResultsDTO[]) => {
    const resultsObjects: any = []
    //==> RETORNA APENAS O PLAYER E SEUS PONTOS
    const result = results.map((item) => {
        const points = item.results.map((game) => {
            return game.points
        })
        const player = item.player

        let totalPoints = 0;
        for(var i = 0; i < points.length; i++) {
            totalPoints += points[i];
        };

        return {
            player,
            totalPoints,
        };
    });

    //==> ISOLA APENAS OS PONTOS
    const onlyPoints = result.map((el) => {
        return el.totalPoints
    });

    //==> ORDENA OS PONTOS
    const orderedPoints = onlyPoints.sort().reverse();

    //==> ORDENA OS RESULTADOS E TRATA DUPLICIDADES DE PONTOS
    let orderedResult = orderedPoints.map((el) => {
        const ordered = result.filter((item) => {
            if (item.totalPoints === el) {
                const index = result.indexOf(item);
                result.splice(index, 1);
                return item;
            }
        })
        return ordered;
    });

    const resultList = orderedResult.map((elemt) => {
        elemt.map((item) => {
            resultsObjects.push(item)
        })
        return resultsObjects
    })

    return resultList[0];
};