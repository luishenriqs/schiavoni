import React from 'react';
import { Header } from '@components/Header';
import { PsopImage } from '@components/PsopImage';
import PSOPLogo from '@assets/psop/PSOPLogo.svg';
import {
  Container, 
  Content, 
  Title, 
} from './styles';

export function Games({navigation}: {navigation: any}) {
  return (
    <Container>
      <Header
        title='Games'
        text='Temporada 27'
        headerSize={'big'}
        onPress={() => navigation.openDrawer()}
      />
      <PsopImage
        svg={PSOPLogo}
      />
      <Content>
        <Title>Listas dos jogos da temporada em andamento</Title>
      </Content>
    </Container>
  );
};