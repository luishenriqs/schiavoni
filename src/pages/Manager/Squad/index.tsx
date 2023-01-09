import React from 'react';
import { Header } from '@components/Header';
import { PsopImage } from '@components/PsopImage';
import { Container, Content, Title } from './styles';

export function Squad({navigation}: {navigation: any}) {
  const year = new Date().getFullYear();
  return (
    <Container>
      <Header
        title='Squad of Players'
        text={'Seleção ' + String(year)}
        headerSize={'big'}
        onPress={() => navigation.openDrawer()}
      />
      <PsopImage />
      <Content>
        <Title>Seleção dos jogadores</Title>
      </Content>
    </Container>
  );
};