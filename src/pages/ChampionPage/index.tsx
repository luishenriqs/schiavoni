import React, { useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import { useAuth } from '@hooks/useAuth';
import { useChampion } from '@hooks/useChampion';
import { Header } from '@components/Header';
import { PsopImage } from '@components/PsopImage';
import { ChampionDTO } from '@dtos/ChampionDTO'
import {
  Container, 
  Content, 
  Imagem,
  Title,
  Text
} from './styles';

export function ChampionPage({navigation}: {navigation: any}) {
  const { anonymous } = useAuth();
  const { champion, setChampionContext } = useChampion();
  
  const anonymousURL = anonymous.anonymousURL;

  useEffect(() => {
    getChampion();
  }, []);

  //==> RECUPERA DADOS DO CAMPEÃO
  const getChampion = () => {
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
        }) as ChampionDTO[]
        persistChampionData(data[0]);
      },
    }) 
    return () => subscribe()
  };

  //==> PERSISTE DADOS DO CAMPEÃO NO CONTEXTO
  const persistChampionData = async (championPlayer: ChampionDTO) => {
    const championData = {
      avatar: championPlayer.avatar,
      doc_id: championPlayer.doc_id,
      email: championPlayer.email,
      id: championPlayer.id,
      name: championPlayer.name,
      profile: championPlayer.profile,
      season: championPlayer.season,
    };
    setChampionContext(championData);
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