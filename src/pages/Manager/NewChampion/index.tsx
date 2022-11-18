import React from 'react';
import { Header } from '@components/Header';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { PsopImage } from '@components/PsopImage';
import PSOPLogo from '@assets/psop/PSOPLogo.svg';
import {
  Container, 
  Content, 
  Title, 
} from './styles';

export function NewChampion({navigation}: {navigation: any}) {
  return (
    <Container>
      <Header
        title='New Champion'
        text='Season 27'
        headerSize={'big'}
        onPress={() => navigation.openDrawer()}
      />
      <PsopImage
        svg={PSOPLogo}
      />
      <Content>
        <Title>New PSOP Champion</Title>
        <Input 
          placeholder='Name'
          autoCorrect={false}
          autoCapitalize='none'
        />
        <Button title='Add New Champion' />
      </Content>
    </Container>
  );
};