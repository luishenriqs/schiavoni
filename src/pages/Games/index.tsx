import React, { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore'
import { Header } from '@components/Header';
import { PsopImage } from '@components/PsopImage';
import PSOPLogo from '@assets/psop/PSOPLogo.svg';
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
}

type Props = {
  data: GamesProps;
}

export function Games({navigation}: {navigation: any}) {
  const [games, setGames] = useState<GamesProps[]>([]);

  // Estratégia de leitura "Real Time"
  useEffect(() => {
    const subscribe = firestore()
    .collection('game_result')
    .where('position', '==', 4)
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
        headerSize={'big'}
        onPress={() => navigation.openDrawer()}
      />
      <PsopImage
        svg={PSOPLogo}
      />
      <Content>
        <LabelPSOP />
      </Content>
    </Container>
  );
};