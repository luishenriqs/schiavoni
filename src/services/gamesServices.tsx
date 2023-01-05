import { GameDTO, GamesResultsDTO } from '@dtos/GameDTO';

//==> RECUPERA NOMES DE TODOS OS PLAYERS
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

    const games: GamesResultsDTO = { 
        game_1,
        game_2,
        game_3,
        game_4,
        game_5,
        game_6,
        game_7,
        game_8,
    }

    return games;
};