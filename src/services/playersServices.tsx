import { UserDTO } from '@dtos/UserDTO'

//==> RECUPERA NOMES DE TODOS OS PLAYERS
export const getPlayersNames = (allPlayers: UserDTO[]) => {
    const playersNames = allPlayers.map((player) => {
        if (player.name !== 'Anonymous Player') return player.name
    });

    const index = playersNames.indexOf(undefined);
    playersNames.splice(index, 1);

    const squadOfPlayers = playersNames.map((name) => {
        return {
            label: name ? name : '',
            value: name ? name : '',
        }
    });

    return squadOfPlayers;
};