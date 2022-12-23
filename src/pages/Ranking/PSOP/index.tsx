import React, { useEffect, useState } from "react";
import { FlatList, KeyboardAvoidingView, Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { useAuth } from '@hooks/useAuth';
import { useAllPlayers } from '@hooks/useAllPlayers';
import { Header } from '@components/Header';
import { findNames, findPlayersResults, processRanking } from '@services/rankingServices';
import { LeaderCard } from '@components/LeaderCard';
import { CardRanking }from '@components/CardRanking';
import { LabelPSOP } from "@components/LabelPSOP";
import { GameDTO, SeasonDTO, ResultsDTO } from '@dtos/GameDTO'
import { Container, Content } from './styles';

type RankingProps = {
    player: string;
    totalPoints: number;
};

export function PSOP({navigation}: {navigation: any}) {
  const { user, anonymous } = useAuth();
  const { allPlayers } = useAllPlayers();

  const [lastGame, setLastGame] = useState(0);
  const [currentSeason, setCurrentSeason] = useState(0);
  const [games, setGames] = useState<GameDTO[]>([] as GameDTO[]);
  const [playersCurrentSeason, setPlayersCurrentSeason] = useState<string[]>([])
  const [playersResult, setPlayersResult] = useState<ResultsDTO[]>([] as ResultsDTO[]);
  const [ranking, setRanking] = useState<RankingProps[]>([] as RankingProps[]);
  const anonymousURL = anonymous.anonymousURL;

  useEffect(() => {
    getCurrentSeason()
  }, []);

  //==> RECUPERA ESTÁGIO DA ATUAL TEMPORADA
  const getCurrentSeason = async () => {
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
      getGames(data[0].season)
    },
  }) 
  return () => subscribe()
};

  //==> RECUPERA JOGOS DA ATUAL TEMPORADA
  const getGames = async (currentSeason: number) => {
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

        setGames(data);
        getPlayers(data);
      },
    }) 
    return () => subscribe()
  };

  //==> RECUPERA PLAYERS DA ATUAL TEMPORADA
  const getPlayers = (data: GameDTO[]) => {
    const players = data.length > 0 && findNames(data);
    players && setPlayersCurrentSeason(players);

    getResults()
  };
  
  //==> FILTRA OS RESULTADOS DE CADA PLAYER NA ATUAL TEMPORADA
  const getResults = () => {
    const results = findPlayersResults(playersCurrentSeason, games);
    setPlayersResult(results);
    getRanking(results);
  };

  //==> SOMA PONTOS E CLASSIFICA OS PLAYERS
  const getRanking = (results: ResultsDTO[]) => {
    const orderedRanking = processRanking(results);
    setRanking(orderedRanking);
  };

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
          {ranking.length > 0 &&
            <LeaderCard 
              title='LÍDER:'
              leadersName={ranking[0].player}
              weeks={'2'}
            />
          }
          <LabelPSOP />

          {ranking.length > 0 &&
            <FlatList
              data={ranking}
              keyExtractor={(item, index) => index + item.player}
              renderItem={({ item, index }) => (
                <CardRanking 

                  position={`${index + 1} º`}
                  name={item.player}
                  points={item.totalPoints}
                />
              )}
            />
          }
        </Content>
      </Container>
    </KeyboardAvoidingView>
  );
};
