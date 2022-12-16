import React from 'react';
import { Header } from '@components/Header';
import { PsopImage } from '@components/PsopImage';
import { Container, Content, Title } from './styles';

export function Squad({navigation}: {navigation: any}) {
  return (
    <Container>
      <Header
        title='Squad Players'
        text='2023'
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