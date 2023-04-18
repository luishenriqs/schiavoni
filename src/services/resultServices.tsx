import { GameDTO } from '@dtos/GameDTO'

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

//==> RETORNA TODOS OS RESULTADOS 
export const getPlayersResults = (games: GameDTO[]) => {
    const players = games.length > 0 && findNames(games);
    const results = players && findPlayersResults(players, games);
    return results;
};