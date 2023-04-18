import React from 'react';
import { Header } from '@components/Header';
import { PsopImage } from '@components/PsopImage';
import {
  Container,
  Content,
  TitleContainer,
  Title
} from './styles';

export function HallOfFame({navigation}: {navigation: any}) {
  return (
    <Container>
      <Header
        title='Hall Of Fame'
        headerSize={'big'}
        onPress={() => navigation.openDrawer()}
      />
      <PsopImage />
      <TitleContainer>
        <Title>Galeria dos Campeões</Title>
      </TitleContainer>
      <Content>
      </Content>
    </Container>
  );
};
