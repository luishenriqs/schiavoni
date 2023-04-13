import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { useAuth } from '@hooks/useAuth';
import { useChampion } from '@hooks/useChampion';
import { useAllPlayers } from '@hooks/useAllPlayers';
import { Loading } from '@components/Loading';
import { Header } from '@components/Header';
import { PsopImage } from '@components/PsopImage';
import { UserDTO } from '@dtos/userDTO'
import { ChampionDTO } from '@dtos/ChampionDTO';
import { GameDTO, SeasonDTO } from '@dtos/GameDTO'
import {
  Container, 
  Content, 
  Imagem,
  Title,
  Text
} from './styles';

export function ChampionPage({navigation}: {navigation: any}) {
  const { user } = useAuth();
  const { 
    champion, 
    setChampionContext, 
    setCurrentSeasonContext, 
    setGameResultContext 
  } = useChampion();
  const { setAllPlayersContext } = useAllPlayers();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getChampion();
  }, []);

  //==> RECUPERA DADOS DO CAMPEÃO
  const getChampion = () => {
    const subscribe = firestore()
    .collection('champion')
    .onSnapshot({
      error: (e) => console.error(e),
      next: (querySnapshot) => {
        const data = querySnapshot.docs.map(doc => {
          return {
            doc_id: doc.id,
          ...doc.data()
          }
        }) as ChampionDTO[]
        if (data.length === 0) {
          createChampion();
        } else {
          persistChampionData(data[0]);
        };
      },
    }) 
    return () => subscribe()
  };

  //==> CRIA DOC CHAMPION NO FIRESTORE CASO NÃO EXISTA
  const createChampion = () => {
    const championData = {
      name: 'Anonymous Player',
      email: 'anonymous@email.com',
      profile: '',
      avatar: '',
      doc_id: '',
      season: 0,
    };

    firestore()
    .collection('champion')
    .doc('newChampion')
    .set(championData)
    .then(() => persistChampionData(championData))
    .catch((error) => console.error(error));
  };

  //==> PERSISTE DADOS DO CAMPEÃO NO CONTEXTO
  const persistChampionData = (championData: ChampionDTO) => {
    setChampionContext(championData);
    setIsLoading(false);
    if (!user.termsOfUse) navigation.navigate('Terms Of Use');
    getAllPlayers();
  };

  //==> RECUPERA TODOS OS JOGADORES E PERSISTE NO CONTEXTO
  //==> CHAMA CURRENT SEASON
  const getAllPlayers = () => {
    const subscribe: any = firestore()
    .collection('players')
    .onSnapshot({
      error: (e) => console.error(e),
      next: (querySnapshot) => {
        const data = querySnapshot.docs.map(doc => {
          return {
            doc_id: doc.id,
          ...doc.data()
          }
        }) as UserDTO[]
          setAllPlayersContext(data);
          getCurrentSeason();
      },
    }) 
    return () => subscribe()
  };

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
        if (data.length === 0) {
          createCurrentSeason();
        } else {
          const season = data[0].season;
          const game = data[0].game;
          const currentSeasonData = { season, game };
          setCurrentSeasonContext(currentSeasonData);
          getGames(season);
        };
      },
    }) 
    return () => subscribe()
  };

  //==> CRIA DOC CURRENT_SEASON NO FIRESTORE CASO NÃO EXISTA
  const createCurrentSeason = () => {
    firestore()
    .collection('current_season')
    .doc('currentData')
    .set({
      season: champion.season + 1,
      game: 0,
    })
    .then(() => {
      const season = champion.season + 1;
      const game = 0;
      const currentSeasonData = { season, game };
      setCurrentSeasonContext(currentSeasonData);
      getGames(season);
    })
    .catch((error) => console.error(error))
  };

  //==> RECUPERA JOGOS DA ATUAL TEMPORADA E PERSISTE NO CONTEXTO
  //==> PROCESSA E PERSISTE RANKING NO CONTEXTO
  const getGames = (currentSeason: number) => {
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
      },
    }) 
    return () => subscribe();
  };

  return (
    <>
      {isLoading
        ? <Loading />
        :
          <Container>
            <Header
              title='The Champion'
              text={champion.season ? 'Temporada ' + champion.season : ''}
              headerSize={'big'}
              onPress={() => navigation.openDrawer()}
            />
            <PsopImage />
            <Content>
              <Title>Campeão PSOP!</Title>
              <Text>{champion.name}</Text>
              {champion.profile
                ? <Imagem source={{uri: champion.profile}} />
                : <Imagem source={require('@assets/anonymousImage/AnonymousImage.png')}/>
              }
            </Content>
          </Container>
      }
    </>
  );
};