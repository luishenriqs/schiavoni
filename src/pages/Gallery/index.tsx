import React from 'react';
import { Header } from '@components/Header';
import { PsopImage } from '@components/PsopImage';
import PSOPLogo from '@assets/psop/PSOPLogo.svg';
import {
  Container, 
  Content, 
  Title, 
} from './styles';

export function Gallery({navigation}: {navigation: any}) {
  return (
    <Container>
      <Header
        title='Gallery'
        text='Great Moments'
        headerSize={'big'}
        onPress={() => navigation.openDrawer()}
      />
      <PsopImage
        svg={PSOPLogo}
      />
      <Content>
        <Title>Momentos Históricos</Title>
      </Content>
    </Container>
  );
};