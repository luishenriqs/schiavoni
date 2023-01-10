import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView } from "react-native";
import { useAuth } from '@hooks/useAuth';
import { useChampion } from '@hooks/useChampion';
import { gamesServices } from '@services/gamesServices'
import { Header } from '@components/Header';
import { PsopImage } from '@components/PsopImage';
import { CardResult } from '@components/CardResult';
import { GameDTO, GamesResultsDTO } from '@dtos/GameDTO';
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
  const { gameResult, currentSeason } = useChampion();

  const [results, setResults] = useState<GamesResultsDTO>({} as GamesResultsDTO);

  const anonymousURL = 'anonymousURL';

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
    <KeyboardAvoidingView style={{flex: 1}} enabled>
      <Container>
        <Header
          title='Etapas'
          text={currentSeason.season + `º Temporada`}
          picture={user.profile ? user.profile : anonymousURL}
          headerSize={'big'}
          onPress={() => navigation.openDrawer()}
        />
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
      </Container>
    </KeyboardAvoidingView>
  );
};