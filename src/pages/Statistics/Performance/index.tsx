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
import { 
  Container,
  BackButton,
  Icon,
  Content, 
  Title, 
  Text, 
  Imagem 
} from './styles';

export function Performance({route, navigation}: any) {
  const { user } = useAuth();
  const { level, setLevelContext } = useChampion();
  const { setAllPlayersContext } = useAllPlayers();

  const [isLoading, setIsLoading] = useState(true);
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
    setIsLoading(false);
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

  //==> RECUPERA TODOS OS JOGOS DO PLAYER
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
      {
        url 
          ? <Imagem source={{uri: url}}/> 
          : <Imagem source={require('@assets/anonymousImage/AnonymousImage.png')}/>
      }
      <BackButton onPress={() => navigation.goBack()}>
        <Icon name='arrow-back' size={30}/>
      </BackButton>
      {
        isLoading 
          ? <Loading/>
          :
            <Content>
              <Title>{name}</Title>
              <>
                <Text>Participações: {statistics.appearances}</Text>
                {statistics?.results?.first !== 0 && <Text>Vitórias: {statistics?.results?.first}</Text>}
                {statistics?.results?.second !== 0 && <Text>Segundos Lugares: {statistics?.results?.second}</Text>}
                {statistics?.results?.third !== 0 && <Text>Terceiros Lugares: {statistics?.results?.third}</Text>}
                {statistics?.results?.fourth !== 0 && <Text>Quartos Lugares: {statistics?.results?.fourth}</Text>}
                {statistics?.results?.fifth !== 0 && <Text>Quintos Lugares: {statistics?.results?.fifth}</Text>}
                {statistics?.results?.sixth !== 0 && <Text>Sextos Lugares: {statistics?.results?.sixth}</Text>}
                {statistics?.results?.seventh !== 0 && <Text>Sétimos Lugares: {statistics?.results?.seventh}</Text>}
                {statistics?.results?.eighth !== 0 && <Text>Oitavos Lugares: {statistics?.results?.eighth}</Text>}
                {statistics?.results?.ninth !== 0 && <Text>Nonos Lugares: {statistics?.results?.ninth}</Text>}
                {statistics?.results?.tenth !== 0 && <Text>Décimos Lugares: {statistics?.results?.tenth}</Text>}
                {statistics?.results?.eleventh !== 0 && <Text>Décimos Primeiros Lugares: {statistics?.results?.eleventh}</Text>}
                {statistics?.results?.twelfth !== 0 && <Text>Décimos Segundos Lugares: {statistics?.results?.twelfth}</Text>}
                <Text>Pontos: {statistics.totalPoints}</Text>
                <Text>Aproveitamento: {statistics?.playerPerformance?.percent}</Text>
                <Text>Média: {statistics.pointsAverage}</Text>
              </>
            </Content>
      }

    </Container>
  );
};