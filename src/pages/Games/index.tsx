import React, { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore'
import { useAuth } from '@hooks/useAuth';
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
  const { user, anonymous } = useAuth();

  const anonymousURL = anonymous.anonymousURL;
  
  const [games, setGames] = useState<GamesProps[]>([]);

  useEffect(() => {
    const subscribe = firestore()
    .collection('game_result')
    .where('season', '==', 2)
    //.limit(2)
    //.orderBy('quantity', 'desc')
    //.startAt(5)
    //.endAt(2)
    .onSnapshot({
      error: (e) => console.error(e),
      next: (querySnapshot) => {
        const data = querySnapshot.docs.map(doc => {
          return {
            id: doc.id,
          ...doc.data()
          }
        }) as GamesProps[]
        setGames(data)
      },
    }) 
    return () => subscribe()
  }, [])

  useEffect(() => {
    console.log('-------> ', games)
  },[games])

  return (
    <Container>
      <Header
        title='Games'
        text='Temporada 27'
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