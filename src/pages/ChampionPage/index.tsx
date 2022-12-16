import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore'
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

const anonymousURL = 'https://firebasestorage.googleapis.com/v0/b/schiavoni-8efc7.appspot.com/o/ProfileImage%2FProfile_Image_Anonymous%20Player.jpeg?alt=media&token=f3f5e53d-372a-43b4-a0b7-7a7db5462576';

export function ChampionPage({navigation}: {navigation: any}) {
  const [champion, setChampion] = useState<IChampion>({} as IChampion);

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