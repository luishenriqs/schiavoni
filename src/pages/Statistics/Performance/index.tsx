import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { useChampion } from '@hooks/useChampion';
import { Loading } from '@components/Loading';
import { ButtonIcon } from '@components/ButtonIcon';
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
  SeasonLabel,
  Title, 
  Columns,
  Stats,
  Positions,
  Text, 
  GreenText,
  RedText,
  YellowText,
  Imagem,
  WarningContainer,
  Warning,
} from './styles';

export function Performance({route, navigation}: any) {
  const { currentSeason } = useChampion();

  const [isLoading, setIsLoading] = useState(true);
  const [player, setPlayer] = useState({} as UserDTO);
  const [games, setGames] = useState([] as GameDTO[]);
  const [statistics, setStatistics] = useState({} as StatisticsDTO);
  const [focusedSeason, setFocusedSeason] = useState(1);
  const [index, setIndex] = useState(1);

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

  const handleSearchSeason = () => {
    if (index === 1) {
      const statistics: StatisticsDTO = processStatistics(games, player);
      statistics && setStatistics(statistics)
    } else {
      const seasonGames = games.filter((item) => {
        if (item.season === currentSeason.season + index) return item;
      });
      const statistics: StatisticsDTO = processStatistics(seasonGames, player);
      statistics && setStatistics(statistics)
    }
  };

  useEffect(() => {
    handleSearchSeason();
  }, [index]);

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
        <StatisticsHeader>
          <BackButton onPress={() => navigation.goBack()}>
            <Icon name='arrow-back' size={25}/>
          </BackButton>
          <Title>{name}</Title>
          <Empty />
        </StatisticsHeader>

        <ButtonsContainer style={{ marginTop: 10, paddingLeft: 60, paddingRight: 60 }}>
          {index < 0
            ?
              <ButtonIcon 
                onPress={() => setIndex(index + 1)}
                name={'chevron-left'}
                size={30}
                style={{ marginRight: 15 }}
              />
            : index === 0
              ?
                <ButtonIcon 
                  onPress={() => setIndex(1)}
                  name={'chevron-double-left'}
                  size={30}
                  style={{ marginRight: 15 }}
                />
              : <Empty />   
          }
          {index === 1
            ? <SeasonLabel>Desde a 30° Temporada</SeasonLabel>
            : <SeasonLabel>Temporada {currentSeason.season + index}</SeasonLabel>
          }
          {currentSeason.season + index > 30
            ?
              <ButtonIcon 
                onPress={() => setIndex(index - 1)}
                name={'chevron-right'}
                size={30}
                style={{ marginRight: 15 }}
              />
            : <Empty />
          }
        </ButtonsContainer>
        {
          isLoading 
            ? <Loading/>
            :
              <Content>
                {statistics.appearances !== 0
                  ?
                    <Columns>
                      <Stats>
                        <Text>Desempenho: {statistics?.playerPerformance?.percent} %</Text>
                        <Text>Participações: {statistics.appearances}</Text>
                        <Text>Pontos: {statistics.totalPoints}</Text>
                        <Text>Média: {statistics.pointsAverage}</Text>
                      </Stats>
                      <Positions>
                        {statistics?.results?.first !== 0 && <GreenText>Vitórias:  {statistics?.results?.first}</GreenText>}
                        {statistics?.results?.second !== 0 && <GreenText>2º Posição:  {statistics?.results?.second}</GreenText>}
                        {statistics?.results?.third !== 0 && <GreenText>3º Posição:  {statistics?.results?.third}</GreenText>}
                        {statistics?.results?.fourth !== 0 && <YellowText>4º Posição:  {statistics?.results?.fourth}</YellowText>}
                        {statistics?.results?.fifth !== 0 && <YellowText>5º Posição:  {statistics?.results?.fifth}</YellowText>}
                        {statistics?.results?.sixth !== 0 && <RedText>6º Posição:  {statistics?.results?.sixth}</RedText>}
                        {statistics?.results?.seventh !== 0 && <RedText>7º Posição:  {statistics?.results?.seventh}</RedText>}
                        {statistics?.results?.eighth !== 0 && <RedText>8º Posição:  {statistics?.results?.eighth}</RedText>}
                        {statistics?.results?.ninth !== 0 && <RedText>9º Posição:  {statistics?.results?.ninth}</RedText>}
                        {statistics?.results?.tenth !== 0 && <RedText>10º Posição:  {statistics?.results?.tenth}</RedText>}
                        {statistics?.results?.eleventh !== 0 && <RedText>11º Posição:  {statistics?.results?.eleventh}</RedText>}
                        {statistics?.results?.twelfth !== 0 && <RedText>12º Posição:  {statistics?.results?.twelfth}</RedText>}
                      </Positions>
                    </Columns>
                  : 
                    <Empty />  
                }
              </Content>
        }
    </Container>
  );
};