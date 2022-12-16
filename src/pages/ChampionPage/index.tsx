import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { useAuth } from '@hooks/useAuth';
import { Header } from '@components/Header';
import { PsopImage } from '@components/PsopImage';
import { UserDTO } from '@dtos/userDTO'
import {
  Container, 
  Content, 
  Imagem,
  Title,
  Text
} from './styles';

type IChampion = UserDTO & {
  season: number
};

export function ChampionPage({navigation}: {navigation: any}) {
  const { anonymous } = useAuth();
  const [champion, setChampion] = useState<IChampion>({} as IChampion);
  
  const anonymousURL = anonymous.anonymousURL;

  useEffect(() => {
    findChampion();
  }, []);

  // RECUPERA O CAMPEÃO
  const findChampion = () => {
    const subscribe = firestore()
    .collection('champion')
    .onSnapshot({
      error: (e) => console.error(e),
      next: (querySnapshot) => {
        const data = querySnapshot.docs.map(doc => {
          return {
            doc_id: doc.id,
          ...doc.data()
          }
        }) as IChampion[]
        setChampion(data[0])
      },
    }) 
    return () => subscribe()
  };

  return (
    <Container>
      <Header
        title='The Champion'
        text={'Temporada ' + champion.season}
        headerSize={'big'}
        onPress={() => navigation.openDrawer()}
      />
      <PsopImage />
      <Content>
        <Title>The great PSOP Champion!</Title>
        <Text>{champion.name}</Text>
        <Imagem 
          source={{uri: champion.profile ? champion.profile : anonymousURL}} 
        />
      </Content>
    </Container>
  );
};