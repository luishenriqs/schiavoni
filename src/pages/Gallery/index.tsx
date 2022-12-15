import React from 'react';
import { useAuth } from '@hooks/useAuth';
import { Header } from '@components/Header';
import { PsopImage } from '@components/PsopImage';
import PSOPLogo from '@assets/psop/PSOPLogo.svg';
import {
  Container, 
  Content, 
  Title, 
} from './styles';

const anonymousURL = 'https://firebasestorage.googleapis.com/v0/b/schiavoni-8efc7.appspot.com/o/ProfileImage%2FProfile_Image_Anonymous%20Player.jpeg?alt=media&token=f3f5e53d-372a-43b4-a0b7-7a7db5462576';

export function Gallery({navigation}: {navigation: any}) {
  const { user } = useAuth();
  
  return (
    <Container>
      <Header
        title='Gallery'
        text='Great Moments'
        picture={user.profile ? user.profile : anonymousURL}
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