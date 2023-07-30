import React, { useEffect, useState } from 'react';
import { ImageBackground } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useChampion } from '@hooks/useChampion';
import { Loading } from '@components/Loading';
import { processStatistics } from '@services/levelServices';
import { GameDTO } from '@dtos/GameDTO';
import { UserDTO } from '@dtos/UserDTO';
import { StatisticsDTO } from '@dtos/RankingDTO';
import { ButtonEditable } from '@components/ButtonEditable';
import { 
  Container,
  Content, 
  StatisticsHeader,
  Empty,
  BackButton,
  Icon,
  ButtonsContainer,
  Title, 
  Stats,
  Positions,
  Text, 
  GreenText,
  RedText,
  YellowText,
  Imagem 
} from './styles';

export function Performance({route, navigation}: any) {
  const { currentSeason } = useChampion();

  const [isLoading, setIsLoading] = useState(true);
  const [player, setPlayer] = useState({} as UserDTO);
  const [games, setGames] = useState([] as GameDTO[]);
  const [statistics, setStatistics] = useState({} as StatisticsDTO);
  const [focusedSeason, setFocusedSeason] = useState(1);

  const url = !!player.profile && player.profile;

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
        data[0] ? setPlayer(data[0]) : setPlayer({} as UserDTO);
        data[0] && getAllGames(data[0]);
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

  const handleSearchLastSeasons = () => {
    const statistics: StatisticsDTO = processStatistics(games, player);
    statistics && setStatistics(statistics)
    setFocusedSeason(1)
  };

  const handleSearchCurrentSeason = () => {
    const currentGames = games.filter((item) => {
      if (item.season === currentSeason.season) return item;
    });
    const statistics: StatisticsDTO = processStatistics(currentGames, player);
    statistics && setStatistics(statistics)
    setFocusedSeason(2)
  };

  const handleSearchPenultimateSeason = () => {
    const currentGames = games.filter((item) => {
      if (item.season === currentSeason.season - 1) return item;
    });
    const statistics: StatisticsDTO = processStatistics(currentGames, player);
    statistics && setStatistics(statistics)
    setFocusedSeason(3)
  };

  const handleSearchAntiPenultimateSeason = () => {
    const currentGames = games.filter((item) => {
      if (item.season === currentSeason.season - 2) return item;
    });
    const statistics: StatisticsDTO = processStatistics(currentGames, player);
    statistics && setStatistics(statistics)
    setFocusedSeason(4)
  };

  const handleSearchThirdOldestSeason = () => {
    const currentGames = games.filter((item) => {
      if (item.season === currentSeason.season - 3) return item;
    });
    const statistics: StatisticsDTO = processStatistics(currentGames, player);
    statistics && setStatistics(statistics)
    setFocusedSeason(5)
  };

  const handleSearchSecondOldestSeason = () => {
    const currentGames = games.filter((item) => {
      if (item.season === currentSeason.season - 4) return item;
    });
    const statistics: StatisticsDTO = processStatistics(currentGames, player);
    statistics && setStatistics(statistics)
    setFocusedSeason(6)
  };

  const handleSearchOlderSeason = () => {
    const currentGames = games.filter((item) => {
      if (item.season === currentSeason.season - 5) return item;
    });
    const statistics: StatisticsDTO = processStatistics(currentGames, player);
    statistics && setStatistics(statistics)
    setFocusedSeason(7)
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
      <ImageBackground 
        source={require('@assets/wallpapers/hands03.jpg')} 
        resizeMode='cover'
        style={{flex: 1, alignItems: 'center'}}
      >
        <StatisticsHeader>
          <BackButton onPress={() => navigation.goBack()}>
            <Icon name='arrow-back' size={25}/>
          </BackButton>
          <Title>{name}</Title>
          <Empty />
        </StatisticsHeader>
          
        <ButtonsContainer>
          <ButtonEditable 
            title='Últimas 4 temporadas'
            width={98}
            height={100}
            type={focusedSeason === 1 ? 'GRAY-500-BUTTON' : 'GRAY-900-BUTTON'}
            onPress={() => handleSearchLastSeasons()}
          />
        </ButtonsContainer>
        <ButtonsContainer>
          <ButtonEditable 
            title={`Temporada Atual`}
            width={49}
            height={100}
            type={focusedSeason === 2 ? 'GRAY-500-BUTTON' : 'GRAY-900-BUTTON'}
            onPress={() => handleSearchCurrentSeason()}
          />
          <ButtonEditable 
            title={`${currentSeason.season - 1}º Temporada`}
            width={49}
            height={100}
            type={focusedSeason === 3 ? 'GRAY-500-BUTTON' : 'GRAY-900-BUTTON'}
            onPress={() => handleSearchPenultimateSeason()}
          />
        </ButtonsContainer>
        <ButtonsContainer>
          <ButtonEditable 
            title={`${currentSeason.season - 2}º Temporada`}
            width={49}
            height={100}
            type={focusedSeason === 4 ? 'GRAY-500-BUTTON' : 'GRAY-900-BUTTON'}
            onPress={() => handleSearchAntiPenultimateSeason()}
          />
          <ButtonEditable 
            title={`${currentSeason.season - 3}º Temporada`}
            width={49}
            height={100}
            type={focusedSeason === 5 ? 'GRAY-500-BUTTON' : 'GRAY-900-BUTTON'}
            onPress={() => handleSearchThirdOldestSeason()}
          />
        </ButtonsContainer>
        {
          isLoading 
            ? <Loading/>
            :
              <Content>
                <Stats>
                  <Text>Participações: {statistics.appearances}</Text>
                  <Text>Pontos: {statistics.totalPoints}</Text>
                  <Text>Média: {statistics.pointsAverage}</Text>
                  <Text>Aproveitamento: {statistics?.playerPerformance?.percent} %</Text>
                </Stats>
                <Positions>
                  {statistics?.results?.first !== 0 && <GreenText>Vitórias: {statistics?.results?.first}</GreenText>}
                  {statistics?.results?.second !== 0 && <GreenText>2º Posição: {statistics?.results?.second}</GreenText>}
                  {statistics?.results?.third !== 0 && <GreenText>3º Posição: {statistics?.results?.third}</GreenText>}
                  {statistics?.results?.fourth !== 0 && <YellowText>4º Posição: {statistics?.results?.fourth}</YellowText>}
                  {statistics?.results?.fifth !== 0 && <YellowText>5º Posição: {statistics?.results?.fifth}</YellowText>}
                  {statistics?.results?.sixth !== 0 && <RedText>6º Posição: {statistics?.results?.sixth}</RedText>}
                  {statistics?.results?.seventh !== 0 && <RedText>7º Posição: {statistics?.results?.seventh}</RedText>}
                  {statistics?.results?.eighth !== 0 && <RedText>8º Posição: {statistics?.results?.eighth}</RedText>}
                  {statistics?.results?.ninth !== 0 && <RedText>9º Posição: {statistics?.results?.ninth}</RedText>}
                  {statistics?.results?.tenth !== 0 && <RedText>10º Posição: {statistics?.results?.tenth}</RedText>}
                  {statistics?.results?.eleventh !== 0 && <RedText>11º Posição: {statistics?.results?.eleventh}</RedText>}
                  {statistics?.results?.twelfth !== 0 && <RedText>12º Posição: {statistics?.results?.twelfth}</RedText>}
                </Positions>
              </Content>
        }
      </ImageBackground>
    </Container>
  );
};