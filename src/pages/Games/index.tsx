import React, { useEffect, useState } from 'react';
import { FlatList, KeyboardAvoidingView } from "react-native";
import { useAuth } from '@hooks/useAuth';
import { useChampion } from '@hooks/useChampion';
import { gamesServices } from '@services/gamesServices'
import { Header } from '@components/Header';
import { PsopImage } from '@components/PsopImage';
import { LabelPSOP } from "@components/LabelPSOP";
import { CardRanking }from '@components/CardRanking';
import { CardResult } from '@components/CardResult';
import { GameDTO, GamesResultsDTO } from '@dtos/GameDTO';
import {
  Container, 
  Content,
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

  const [results, setResults] = useState<GamesResultsDTO>({} as GamesResultsDTO)

  const anonymousURL = 'anonymousURL';

  useEffect(() => {
    const result = gamesServices(gameResult);
    result && setResults(result);
  }, []);

  useEffect(() => {
    console.log('=======================> gameResult', gameResult);
  }, []);

  const mock = [
    {
       date: '30/12/2022',
       doc_id: 'Game Fri Dec 30 2022 18:30:36 GMT+0000 (GMT)',
       game: 1,
       name:'Dr. Bó',
       points: 25,
       position: 1,
       season: 2
    },
    {
       date: '30/12/2022',
       doc_id: 'Game Fri Dec 30 2022 19:54:22 GMT+0000 (GMT)',
       game: 2,
       name:'Márcio Silva',
       points: 18,
       position: 2,
       season: 2
    },
    {
       date: '30/12/2022',
       doc_id: 'Game Fri Dec 30 2022 19:54:35 GMT+0000 (GMT)',
       game: 2,
       name:'Leandro Jácomo',
       points: 15,
       position: 3,
       season: 2
    },
    {
       date: '30/12/2022',
       doc_id: 'Game Fri Dec 30 2022 19:54:47 GMT+0000 (GMT)',
       game: 2,
       name:'Diego Souza',
       points: 12,
       position: 4,
       season: 2
    },
    {
       date: '30/12/2022',
       doc_id: 'Game Fri Dec 30 2022 19:55:01 GMT+0000 (GMT)',
       game: 2,
       name:'Dú Schiavoni',
       points: 10,
       position: 5,
       season: 2
    },
    {
       date: '30/12/2022',
       doc_id: 'Game Fri Dec 30 2022 19:55:14 GMT+0000 (GMT)',
       game: 2,
       name:'Filipe Lobanco',
       points: 8,
       position: 6,
       season: 2
    },
    {
       date: '30/12/2022',
       doc_id: 'Game Fri Dec 30 2022 19:55:26 GMT+0000 (GMT)',
       game: 2,
       name:'Túlio Silva',
       points: 6,
       position: 7,
       season: 2
    }
 ]

  
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
          {mock &&
          <>
            <SeasonBox>
              <Season>Etapa 1</Season>
            </SeasonBox>
            <FlatList
              data={mock}
              keyExtractor={(item, index) => index + item.name}
              renderItem={({ item, index }) => (
                <CardResult 
                  position={item.position}
                  name={item.name}
                />
              )}
            />
          </>
          }
        </Content>
      </Container>
    </KeyboardAvoidingView>
  );
};