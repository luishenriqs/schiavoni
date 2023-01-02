import React from 'react';
import { useAuth } from '@hooks/useAuth';
import { useChampion } from '@hooks/useChampion';
import { Header } from '@components/Header';
import { PsopImage } from '@components/PsopImage';
import { LabelPSOP } from "@components/LabelPSOP";
import {
  Container, 
  Content
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
  const { gameResult } = useChampion();

  const anonymousURL = 'anonymousURL';
  
  return (
    <Container>
      <Header
        title='Etapas'
        text={`${gameResult[0].season}º Temporada`}
        picture={user.profile ? user.profile : anonymousURL}
        headerSize={'big'}
        onPress={() => navigation.openDrawer()}
      />
      <PsopImage />
      <Content>
        <LabelPSOP />
      </Content>
    </Container>
  );
};