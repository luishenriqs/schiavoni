import React, { useEffect, useState } from "react";
import { FlatList, KeyboardAvoidingView, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { useAuth } from '@hooks/useAuth';
import { SvgProps } from 'react-native-svg';
import { Header } from '@components/Header';
import { LeaderCard } from '@components/LeaderCard';
import { CardRanking }from '@components/CardRanking';
import { LabelPSOP } from "@components/LabelPSOP";
import TeamBo from '@assets/teams/teamBo.svg';
import TeamDu from '@assets/teams/teamDu.svg';
import TeamDiego from '@assets/teams/teamDiego.svg';
import TeamFilipe from '@assets/teams/teamFilipe.svg';
import TeamLuisao from '@assets/teams/teamLuisao.svg';
import TeamPaulinho from '@assets/teams/teamPaulinho.svg';
import TeamRoger from '@assets/teams/teamRoger.svg';
import TeamLeandro from '@assets/teams/teamLeandro.svg';
import { GameDTO, SeasonDTO } from '@dtos/GameDTO'
import { Container, Content } from './styles';

interface IRankingProps {
  id: string,
  position: number;
  name: string;
  points: number;
  img: React.FC<SvgProps>;
};

enum WeeksLead {
  '1º semana na liderança' = 1,
  '2º semana na liderança' = 2,
  '3º semana na liderança' = 3,
  '4º semana na liderança' = 4,
  '5º semana na liderança' = 5,
  '6º semana na liderança' = 6,
  '7º semana na liderança' = 7,
  '8º semana na liderança' = 8,
};

// ***********[MOCK]***********
const ranking = {
  game: 5,
  weeksInTheLead: 3,
  rankingList: [
    {
      id: '2',
      position: 7,
      name: 'Leandro Jácomo',
      points: 52,
      img: TeamLeandro,
    },
    {
      id: '8',
      position: 8,
      name: 'Dr. Bó',
      points: 48,
      img: TeamBo,
    },
    {
      id: '4',
      position: 3,
      name: 'Diego Souza',
      points: 73,
      img: TeamDiego,
    },
    {
      id: '3',
      position: 2,
      name: 'Dú Schiavoni',
      points: 86,
      img: TeamDu,
    },
    {
      id: '5',
      position: 5,
      name: 'Roger Prata',
      points: 69,
      img: TeamRoger,
    },
    {
      id: '6',
      position: 6,
      name: 'Filipe Lobanco',
      points: 66,
      img: TeamFilipe,
    },
    {
      id: '1',
      position: 1,
      name: 'Luisão',
      points: 87,
      img: TeamLuisao,
    },
    {
      id: '7',
      position: 4,
      name: 'Paulinho Coelho',
      points: 71,
      img: TeamPaulinho,
    }
  ]
};
// ****************************

export function PSOP({navigation}: {navigation: any}) {
  const { user, anonymous } = useAuth();
  const [lastGame, setLastGame] = useState(0);
  const [currentSeason, setCurrentSeason] = useState(0);
  const anonymousURL = anonymous.anonymousURL;
/* ################################################################### */
/* ################################################################### */

/* ****************** [ORDERING RANKING LIST] *********************** */
  // First: ordering the values;
  const disordered:number[] = [];
  for (var i = 0; i < ranking.rankingList.length; i++) {
      disordered.push(ranking.rankingList[i].position)
  }

  const orderedValue = disordered.sort(order);
  function order(a: number, b: number) {
      return b - a;
  };

  orderedValue.reverse()

  // Second: ordering ranking list array;
  const orderedRankingList: IRankingProps[] = [] 
  for (var i = 0; i < ranking.rankingList.length; i++) {
      const ordered = ranking.rankingList.filter(
          (ranking: IRankingProps) => Number(
              ranking.position) === orderedValue[i]
          );
      orderedRankingList.push(ordered[0]);
  }

  // *******[LEADER IMAGE]*******
  if (orderedRankingList[0].name) {
    let Leader = orderedRankingList[0].img;
  }
/* ******************************************************************* */
/* ################################################################### */
/* ################### LÓGICA A SER TRABALHADA ####################### */
/* ################################################################### */

  useEffect(() => {
    fetchSeason()
  }, []);

  useEffect(() => {
    fetchGames()
  }, [currentSeason]);

  //==> RECUPERA ESTÁGIO DA ATUAL TEMPORADA
  const fetchSeason = async () => {
  const subscribe = firestore()
  .collection('current_season')
  .onSnapshot({
    error: (e) => console.error(e),
    next: (querySnapshot) => {
      const data = querySnapshot.docs.map(doc => {
        return {
          doc_id: doc.id,
        ...doc.data()
        }
      }) as SeasonDTO[]
      setCurrentSeason(data[0].season);
      setLastGame(data[0].game);
    },
  }) 
  return () => subscribe()
};

  //==> RECUPERA DADOS DOS JOGOS DA ATUAL TEMPORADA
  const fetchGames = async () => {
    const subscribe = firestore()
    .collection('game_result')
    .where('season', '==', currentSeason)
    .onSnapshot({
      error: (e) => console.error(e),
      next: (querySnapshot) => {
        const data = querySnapshot.docs.map(doc => {
          return {
            doc_id: doc.id,
          ...doc.data()
          }
        }) as GameDTO[]

        console.log('data ', data);

      },
    }) 
    return () => subscribe()
  };

  // PRÓXIMOS PASSOS

  //==> FILTRA OS NOMES DE TODOS OS JOGADORES QUE JÁ ATUARAM NA TEMPORADA

  //==> FILTRA RESULTADOS POR NOME

  //==> SOMA A PONTUAÇÃO DE CADA JOGADOR E ORDENA POSIÇÃO

  //==> PERSISTE PONTUAÇÃO E POSIÇÕES NO CONTEXTO E ASYNC STORAGE

/* ################################################################### */
/* ################### LÓGICA A SER TRABALHADA ####################### */
/* ################################################################### */

  // //==> PERSISTE DADOS DOS JOGOS NO CONTEXTO E ASYNC STORAGE
  // const persistUserData = async (games: GameDTO) => {
  //   const gamesData = {
  //     doc_id: games.doc_id,
  //     date: games.date,
  //     game: games.game,
  //     name: games.name,
  //     points: games.points,
  //     position: games.position,
  //     season: games.season,
  //   };
  //   setAsyncStorageData(gamesData);
  //   // setUserContext(userData);
  // };

  // const dataKey = `@storage_Schiavoni:gamesData`;

  // //==> PERSISTE ASYNC STORAGE
  // const setAsyncStorageData = async (gamesData: GameDTO) => {
  //   try {
  //     await AsyncStorage.setItem(dataKey, JSON.stringify(gamesData));
  //   } catch (e) {
  //     Alert.alert('Houve um erro ao persistir os dados dos jogos!');
  //     console.error(e);
  //   };
  // };

  return (
    <KeyboardAvoidingView style={{flex: 1}} enabled>
      <Container>
        <Header
          title='PSOP'
          text='Patos Series Of Poker'
          picture={user.profile ? user.profile : anonymousURL}
          headerSize={'big'}
          onPress={() => navigation.openDrawer()}
        />
        <Content>
          <LeaderCard 
            title='LÍDER:'
            leadersName={orderedRankingList[0].name}
            weeks={WeeksLead[ranking.weeksInTheLead]}
          />
          <LabelPSOP />

          <FlatList
            data={orderedRankingList}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <CardRanking 
                svg={item.img}
                position={`${item.position} º`}
                name={item.name}
                points={item.points}
              />
            )}
          />
        </Content>
      </Container>
    </KeyboardAvoidingView>
  );
};
