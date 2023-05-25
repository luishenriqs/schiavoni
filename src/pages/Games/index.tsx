import React, { useEffect, useState } from 'react';
import { ImageBackground } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useAuth } from '@hooks/useAuth';
import { useChampion } from '@hooks/useChampion';
import { useAllPlayers } from '@hooks/useAllPlayers';
import { gamesServices } from '@services/gamesServices'
import { Header } from '@components/Header';
import { PsopImage } from '@components/PsopImage';
import { CardResult } from '@components/CardResult';
import { getRanking } from '@services/rankingServices';
import { GameDTO, GamesResultsDTO } from '@dtos/GameDTO';
import { UserDTO } from '@dtos/UserDTO';
import {
  Container, 
  Content,
  GameWrapper,
  SeasonBox,
  Season
} from './styles';

export type GamesProps = {
  id: string;
  date: string;
  name: string;
  points: number;
  position: number;
};

export function Games({navigation}: {navigation: any}) {
  const { user } = useAuth();
  const { allPlayers } = useAllPlayers();
  const { 
    gameResult, 
    currentSeason,
    setGameResultContext, 
    setRankingContext
  } = useChampion();

  const [results, setResults] = useState<GamesResultsDTO>({} as GamesResultsDTO);

  const anonymousURL = 'anonymousURL';

  useEffect(() => {
    getGamesResults(
      currentSeason.season,
      currentSeason.game,
      allPlayers
    );
  }, []);

  //==> RECUPERA E PERSISTE GAME RESULTS NO CONTEXTO
  //==> PROCESSA, ATUALIZA E PERSISTE RANKING NO CONTEXTO
  const getGamesResults = (
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
        }) as GameDTO[];
        data && setGameResultContext(data);
        const ranking = getRanking(data, lastGame, allPlayers);
        ranking && setRankingContext(ranking);
      },
    }) 
    return () => subscribe();
  };

  useEffect(() => {
    const result = gamesServices(gameResult);
    result && setResults(result);
  }, [gameResult]);

  //==> RETORNA RESULTADOS DE CADA ETAPA
  const renderResults = (game: GameDTO[], gameNumber: number) => {
    return (
      <GameWrapper>
        <SeasonBox>
          <Season>{'Etapa ' + gameNumber}</Season>
        </SeasonBox>
        {
          game.map((item) => (
            <CardResult
              key={item.name}
              position={item.position}
              name={item.name}
              gameNumber={gameNumber}
            />
          ))
        }
      </GameWrapper>
    );
  };

  return (
    <Container>
      <Header
        title='Etapas'
        text={currentSeason.season + `º Temporada`}
        picture={user.profile ? user.profile : anonymousURL}
        headerSize={'big'}
        onPress={() => navigation.openDrawer()}
      />
      <ImageBackground 
        source={require('@assets/wallpapers/background02.jpg')} 
        resizeMode='cover'
        style={{flex: 1, alignItems: 'center', maxWidth: 1200, minWidth: 500}}
      >
        <PsopImage />
        <Content>
          {!!results['game_1'] && renderResults(results['game_1'], 1)}
          {!!results['game_2'] && renderResults(results['game_2'], 2)}
          {!!results['game_3'] && renderResults(results['game_3'], 3)}
          {!!results['game_4'] && renderResults(results['game_4'], 4)}
          {!!results['game_5'] && renderResults(results['game_5'], 5)}
          {!!results['game_6'] && renderResults(results['game_6'], 6)}
          {!!results['game_7'] && renderResults(results['game_7'], 7)}
          {!!results['game_8'] && renderResults(results['game_8'], 8)}
        </Content>
      </ImageBackground>
    </Container>
  );
};