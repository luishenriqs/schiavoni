import React from 'react';
import { Header } from '@components/Header';
import { PsopImage } from '@components/PsopImage';
import PSOPLogo from '@assets/psop/PSOPLogo.svg';
import {
  Container, 
  Content, 
  Title, 
} from './styles';

export function NewGame({navigation}: {navigation: any}) {
  return (
    <Container>
      <Header
        title='New Game'
        text='De 02/ago a 20/set'
        headerSize={'big'}
        onPress={() => navigation.openDrawer()}
      />
      <PsopImage
        svg={PSOPLogo}
      />
      <Content>
        <Title>Schiavoni Poker House New Game</Title>
      </Content>
    </Container>
  );
};