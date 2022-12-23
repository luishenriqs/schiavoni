import { GameDTO, ResultsDTO } from '@dtos/GameDTO'

const mockGames = [
    {
       date:'12/12/2022',
       doc_id:'Game Mon Dec 12 2022 18:07:41 GMT+0000 (GMT)',
       game:1,
       name:'Diego',
       points:12,
       position:4,
       season:2
    },
    {
       date:'12/12/2022',
       doc_id:'Game Mon Dec 12 2022 18:08:39 GMT+0000 (GMT)',
       game:1,
       name:'Dr. Bó',
       points:15,
       position:3,
       season:2
    },
    {
       date:'12/12/2022',
       doc_id:'Game Mon Dec 12 2022 18:09:02 GMT+0000 (GMT)',
       game:1,
       name:'Luisão',
       points:18,
       position:2,
       season:2
    },
    {
       date:'12/12/2022',
       doc_id:'Game Mon Dec 12 2022 18:09:20 GMT+0000 (GMT)',
       game:1,
       name:'Ednelson',
       points:25,
       position:1,
       season:2
    },
    {
       date:'12/12/2022',
       doc_id:'Game Mon Dec 12 2022 18:10:53 GMT+0000 (GMT)',
       game:2,
       name:'Ednelson',
       points:12,
       position:4,
       season:2
    },
    {
       date:'12/12/2022',
       doc_id:'Game Mon Dec 12 2022 18:11:09 GMT+0000 (GMT)',
       game:2,
       name:'Luisão',
       points:15,
       position:3,
       season:2
    },
    {
       date:'12/12/2022',
       doc_id:'Game Mon Dec 12 2022 18:11:27 GMT+0000 (GMT)',
       game:2,
       name:'Dr. Bó',
       points:18,
       position:2,
       season:2
    },
    {
       date:'12/12/2022',
       doc_id:'Game Mon Dec 12 2022 18:11:50 GMT+0000 (GMT)',
       game:2,
       name:'Diego',
       points:25,
       position:1,
       season:2
    },
    {
       date:'21/12/2022',
       doc_id:'Game Wed Dec 21 2022 19:18:18 GMT+0000 (GMT)',
       game:3,
       name:'Dr. Bó',
       points:25,
       position:1,
       season:2
    },
    {
       date:'21/12/2022',
       doc_id:'Game Wed Dec 21 2022 19:18:36 GMT+0000 (GMT)',
       game:3,
       name:'Luisão',
       points:18,
       position:2,
       season:2
    },
    {
       date:'21/12/2022',
       doc_id:'Game Wed Dec 21 2022 19:18:55 GMT+0000 (GMT)',
       game:3,
       name:'Ednelson',
       points:15,
       position:3,
       season:2
    },
    {
       date:'21/12/2022',
       doc_id:'Game Wed Dec 21 2022 19:19:12 GMT+0000 (GMT)',
       game:3,
       name:'Filipi',
       points:12,
       position:4,
       season:2
    },
    {
       date:'21/12/2022',
       doc_id:'Game Wed Dec 21 2022 19:19:50 GMT+0000 (GMT)',
       game:3,
       name:'Leandro',
       points:10,
       position:5,
       season:2
    }
 ]

const mockNames = ['Diego', 'Dr. Bó', 'Luisão', 'Ednelson', 'Filipi', 'Leandro']

const mockResults = [
    {
        results: [
            {
                date:'12/12/2022',
                doc_id:'Game Mon Dec 12 2022 18:07:41 GMT+0000 (GMT)',
                game:1,
                name:'Diego',
                points:12,
                position:4,
                season:2
            },
            {
                date:'12/12/2022',
                doc_id:'Game Mon Dec 12 2022 18:11:50 GMT+0000 (GMT)',
                game:2,
                nam:'Diego',
                points:25,
                position:1,
                season:2
            }
        ],
        player:'Diego'
    },
    {
        results: [
            {
                date:'12/12/2022',
                doc_id:'Game Mon Dec 12 2022 18:07:41 GMT+0000 (GMT)',
                game:1,
                name:'Dr. Bó',
                points:18,
                position:2,
                season:2
            },
            {
                date:'12/12/2022',
                doc_id:'Game Mon Dec 12 2022 18:11:50 GMT+0000 (GMT)',
                game:2,
                nam:'Dr. Bó',
                points:10,
                position:5,
                season:2
            },
            {
                date:'12/12/2022',
                doc_id:'Game Mon Dec 12 2022 18:15:50 GMT+0000 (GMT)',
                game:3,
                nam:'Dr. Bó',
                points:15,
                position:3,
                season:2
            }
        ],
        player:'Dr. Bó'
    }
];

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

    //==> ORDENA OS RESULTADOS
    let orderedResult = orderedPoints.map((el) => {
        const ordered = result.filter((item) => {
            return item.totalPoints === el && item
        })
        return ordered[0];
    });

    return orderedResult;
};