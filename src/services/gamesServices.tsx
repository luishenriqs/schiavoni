import { GameDTO, GamesResultsDTO } from '@dtos/GameDTO';

//==> RECUPERA TODOS OS JOGOS DA TEMPORADA
export const gamesServices = (results: GameDTO[]) => {

    const game_1: GameDTO[] = [];
    const game_2: GameDTO[] = [];
    const game_3: GameDTO[] = [];
    const game_4: GameDTO[] = [];
    const game_5: GameDTO[] = [];
    const game_6: GameDTO[] = [];
    const game_7: GameDTO[] = [];
    const game_8: GameDTO[] = [];

    results.map((el) => {
        if (el.game === 1) game_1.push(el);
        if (el.game === 2) game_2.push(el);
        if (el.game === 3) game_3.push(el);
        if (el.game === 4) game_4.push(el);
        if (el.game === 5) game_5.push(el);
        if (el.game === 6) game_6.push(el);
        if (el.game === 7) game_7.push(el);
        if (el.game === 8) game_8.push(el);
    });

    const orderNumber = (a: number, b: number) => {
        return a - b;
    };

    const order = (game: GameDTO[]) => {
        const resultsObjects: any = []

        //==> ORDENA OS PONTOS
        const points = game.map((el) => el.points).sort(orderNumber).reverse();
        
        //==> ORDENA OS RESULTADOS
        let orderedResult = points.map((el) => {
            const ordered = game.filter((item) => {
                if (item.points === el) {
                    const index = game.indexOf(item);
                    game.splice(index, 1);
                    return item;
                }
            })
            return ordered;
        });

        //==> LIMPEZA DE DADOS (REMOVE ENCADEAMENTO DESNECESSÁRIO)
        orderedResult.map((elemt) => {
            elemt.map((item) => {
                resultsObjects.push(item)
            });
        });
        return resultsObjects
    };

    const games: GamesResultsDTO = { 
        game_1: order(game_1),
        game_2: order(game_2),
        game_3: order(game_3),
        game_4: order(game_4),
        game_5: order(game_5),
        game_6: order(game_6),
        game_7: order(game_7),
        game_8: order(game_8),
    }
    return games;
};