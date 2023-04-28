import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { useAuth } from '@hooks/useAuth';
import { useAllPlayers } from '@hooks/useAllPlayers';
import { useChampion } from '@hooks/useChampion';
import { getLevel } from '@services/levelServices';
import { Loading } from '@components/Loading';
import { Header } from '@components/Header';
import { PlayerImage } from '@components/PlayerImage';
import { processStatistics } from '@services/levelServices';
import { GameDTO } from '@dtos/GameDTO';
import { UserDTO } from '@dtos/UserDTO';
import { StatisticsDTO } from '@dtos/RankingDTO';
import { Container, Content, Title, Imagem } from './styles';

export function Performance({route, navigation}: any) {
  const { user } = useAuth();
  const { level, setLevelContext } = useChampion();
  const { setAllPlayersContext } = useAllPlayers();

  const [player, setPlayer] = useState({} as UserDTO);
  const [games, setGames] = useState([] as GameDTO[]);
  const [statistics, setStatistics] = useState({} as StatisticsDTO);
  
  const anonymousURL = 'anonymousURL';
  const url = player.profile && player.profile;


  const { name } = route.params;

  useEffect(() => {
    getPlayer();
  }, []);

  useEffect(() => {
    console.log('######## ', statistics);
  }, [statistics]);

  //==> RECUPERA O PLAYER
  //==> CHAMA GET ALL GAMES
  const getPlayer = () => {
    const subscribe: any = firestore()
    .collection('players')
    .where('name', '==', name)
    .onSnapshot({
      error: (e) => console.error(e),
      next: (querySnapshot) => {
        const data = querySnapshot.docs.map(doc => {
          return {
            doc_id: doc.id,
          ...doc.data()
          }
        }) as UserDTO[]
        setPlayer(data[0]);
        getAllGames(data[0]);
      },
    }) 
    return () => subscribe()
  };

  //==> RECUPERA TODOS OS JOGOS
  const getAllGames = (player: UserDTO) => {
    const subscribe = firestore()
    .collection('game_result')
    .where('name', '==', player.name)
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
          getStatistcs(data, player);
      },
    }) 
    return () => subscribe();
  };

  const getStatistcs = (games: GameDTO[], player: UserDTO) => {
    const statistics: StatisticsDTO = processStatistics(games, player);
    statistics && setStatistics(statistics)
  };

  return (
    <Container>
      <Header
        title='Performance'
        text={`Últimas 3 Temporadas`}
        picture={user.profile ? user.profile : anonymousURL}
        headerSize={'big'}
        icon={'keyboard-backspace'}
        onPress={() => navigation.goBack()}
      />
      {
        url 
          ? <Imagem source={{uri: url}}/> 
          : <Imagem source={require('@assets/anonymousImage/AnonymousImage.png')}/>
      }
      <Content>
        <Title>{name}</Title>
      </Content>
    </Container>
  );
};