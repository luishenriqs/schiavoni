import React, { useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
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
  const { champion, setChampionContext } = useChampion();

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
        <Title>Campeão PSOP!</Title>
        <Text>{champion.name}</Text>
        {champion.profile
          ? <Imagem source={{uri: champion.profile}} />
          : <Imagem source={require('@assets/anonymousImage/AnonymousImage.png')}/>
        }
      </Content>
    </Container>
  );
};