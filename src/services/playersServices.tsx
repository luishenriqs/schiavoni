import { UserDTO } from '@dtos/UserDTO'
import { HallOfChampionsDTO } from '@dtos/ChampionDTO'

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

//==> RETORNA TODAS AS TEMPORADAS E SEUS CAMPEÕES
export const renderAllChampions = (hallOfChampions: HallOfChampionsDTO[]) => {

//==> ISOLA AS TEMPORADAS
const onlySeason = hallOfChampions.map((el) => {
    return el.season
});

//==> ORDENA AS TEMPORADAS
const orderedSeasons = onlySeason.sort(function(a, b) {
    return a - b;
});

//==> ORDENA OS CAMPEÕES ORDENADOS POR TEMPORADA
let orderedResult = orderedSeasons.map((el) => {
    const ordered = hallOfChampions.filter((item) => {
    if (item.season === el) {
        return item;
    }
    })

    return ordered[0];
});

orderedResult.splice(0,1)

return orderedResult;
};

//==> RETORNA OS CAMPEÕES E QUANTIDADE DE TÍTULOS
export const renderGreatestChampions = (hallOfChampions: HallOfChampionsDTO[]) => {

    const result = hallOfChampions.map((item) => item.player)

    let onlyPlayers = [...new Set(result)];

    //==> REMOVE ANONYMOUS PLAYER
    onlyPlayers.map((item) => {
        if (item === 'Anonymous Player') {
            const index = onlyPlayers.indexOf(item)
            onlyPlayers.splice(index, 1);
        }

    });

    //==> RETORNA CAMPEÕES E QUANTIDADE DE TÍTULOS
    const perPlayer = onlyPlayers.map((item) => {
        const titles = hallOfChampions.filter((el) => {
            if(item === el.player) return el.season;
        })
        const champion = item;
        const wins = titles.length;
        return  { champion, wins };
    })
    

    const orderNumber = (a: number, b: number) => {
        return a - b;
    };

    //==> ORDENA OS CAMPEÕES
    let winsOrdered = perPlayer.map((el) => el.wins).sort(orderNumber).reverse();
    winsOrdered = [...new Set(winsOrdered)];

    //==> ORDENA OS RESULTADOS
    let orderedResult = winsOrdered.map((el) => {
        const ordered = perPlayer.filter((item) => {
            if (item.wins === el) {
                return item;
            }
        })
        
        return ordered;
    });

    //==> REMOVE ENCADEAMENTO DESNECESSÁRIO
    const resp: any[] = [];
    orderedResult.map((item) => {
      for(let i = 0; i < item.length; i++) {
        resp.push(item[i])
      }
    })

    return resp;
};