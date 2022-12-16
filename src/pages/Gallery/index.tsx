import React from 'react';
import { useAuth } from '@hooks/useAuth';
import { Header } from '@components/Header';
import { PsopImage } from '@components/PsopImage';
import { Container, Content, Title } from './styles';

export function Gallery({navigation}: {navigation: any}) {
  const { user, anonymous } = useAuth();

  const anonymousURL = anonymous.anonymousURL;
  
  return (
    <Container>
      <Header
        title='Gallery'
        text='Great Moments'
        picture={user.profile ? user.profile : anonymousURL}
        headerSize={'big'}
        onPress={() => navigation.openDrawer()}
      />
      <PsopImage />
      <Content>
        <Title>Momentos Históricos</Title>
      </Content>
    </Container>
  );
};