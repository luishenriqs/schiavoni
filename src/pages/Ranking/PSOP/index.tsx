import React, { useEffect } from 'react';
import { FlatList } from "react-native";
import firestore from '@react-native-firebase/firestore';
import { useAuth } from '@hooks/useAuth';
import { useAllPlayers } from '@hooks/useAllPlayers';
import { useChampion } from '@hooks/useChampion';
import { getRanking } from '@services/rankingServices';
import { Loading } from '@components/Loading';
import { Header } from '@components/Header';
import { LeaderCard } from '@components/LeaderCard';
import { CardRanking }from '@components/CardRanking';
import { LabelPSOP } from "@components/LabelPSOP";
import { GameDTO, SeasonDTO } from '@dtos/GameDTO'
import { UserDTO } from '@dtos/userDTO'
import { Container, Content, Title, Text, Imagem } from './styles';

export function PSOP({navigation}: {navigation: any}) {
  const { user } = useAuth();
  const { allPlayers } = useAllPlayers();
  const { 
    ranking,
    currentSeason,
    setRankingContext, 
    setCurrentSeasonContext,
    setGameResultContext
  } = useChampion();

  const anonymousURL = 'anonymousURL';

  useEffect(() => {
    getCurrentSeason();;
  }, []);

  //==> RECUPERA CURRENT SEASON E PERSISTE NO CONTEXTO
  //==> CHAMA GET GAMES
  const getCurrentSeason = () => {
    const subscribe: any = firestore()
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
        const season = data[0].season;
        const game = data[0].game;
        const currentSeasonData = { season, game };
        setCurrentSeasonContext(currentSeasonData);
        getGames(season, game, allPlayers);
      },
    }) 
    return () => subscribe()
  };

  //==> RECUPERA JOGOS DA ATUAL TEMPORADA E PERSISTE NO CONTEXTO
  //==> PROCESSA E PERSISTE RANKING NO CONTEXTO
  const getGames = (
    currentSeason: number, 
    lastGame: number,
    allPlayers: UserDTO[]
  ) => {
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
          data && setGameResultContext(data);
          const ranking = getRanking(data, lastGame, allPlayers);
          ranking && setRankingContext(ranking);
      },
    }) 
    return () => subscribe();
  };

  return (
    <Container>
      <Header
        title='PSOP'
        text='Patos Series Of Poker'
        picture={user.profile ? user.profile : anonymousURL}
        headerSize={currentSeason.game === 0 ? 'small' : 'big'}
        onPress={() => navigation.openDrawer()}
      />
      <Content>
        {ranking.lastGame > 0 
          ?
            <LeaderCard 
              title='LÍDER:'
              leadersName={ranking.orderedRanking[0].player}
              avatar={
                ranking.orderedRanking[0].avatar
                  ? ranking.orderedRanking[0].avatar
                  : anonymousURL
              }   
              Season={`Temporada ${currentSeason.season}`}
              Game={`Etapa ${currentSeason.game}`}
            />
          : currentSeason.game === 0 
          ? 
            <>
              <Text>PATOS SERIES OF POKER</Text>
              <Imagem source={require('@assets/logoOficial/PSOPLogo.jpg')}/>
            </>
          : <Loading />
        }
        {ranking.orderedRanking
          ?
            <>
              <LabelPSOP />
              <FlatList
                data={ranking.orderedRanking}
                keyExtractor={(item, index) => index + item.player}
                renderItem={({ item, index }) => (
                  <CardRanking 
                    position={`${index + 1} º`}
                    name={item.player}
                    points={item.totalPoints}
                    avatar={item.profile}
                  />
                )}
              />
            </>
          : currentSeason.game === 0 
            ? 
              <>
                <Title>{`${currentSeason.season}º Temporada`}</Title>
                <Text>{`Nenhuma etapa registrada`}</Text>
              </>
            : <Loading />
        }
      </Content>
    </Container>
  );
};
