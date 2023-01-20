import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { Loading } from '@components/Loading';
import { useAuth } from '@hooks/useAuth';
import { useChampion } from '@hooks/useChampion';
import { Header } from '@components/Header';
import { PsopImage } from '@components/PsopImage';
import { ChampionDTO } from '@dtos/ChampionDTO';
import {
  Container, 
  Content, 
  Imagem,
  Title,
  Text
} from './styles';

export function ChampionPage({navigation}: {navigation: any}) {
  const { user } = useAuth();
  const { champion, setChampionContext } = useChampion();

  const [isLoading, setIsLoading] = useState(true);

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
        if (data.length === 0) {
          createChampion();
        } else {
          persistChampionData(data[0]);
        };
      },
    }) 
    return () => subscribe()
  };

  //==> CRIA DOC CHAMPION NO FIRESTORE CASO NÃO EXISTA
  const createChampion = () => {
    const championData = {
      name: 'Anonymous Player',
      email: 'anonymous@email.com',
      profile: '',
      avatar: '',
      doc_id: '',
      season: 0,
    };

    firestore()
    .collection('champion')
    .doc('newChampion')
    .set(championData)
    .then(() => persistChampionData(championData))
    .catch((error) => console.error(error));
  };

  //==> PERSISTE DADOS DO CAMPEÃO NO CONTEXTO
  const persistChampionData = (championData: ChampionDTO) => {
    setChampionContext(championData);
    setIsLoading(false);
    if (!user.termsOfUse) navigation.navigate('Terms Of Use');
  };

  return (
    <>
      {isLoading
        ? <Loading />
        :
          <Container>
            <Header
              title='The Champion'
              text={champion.season ? 'Temporada ' + champion.season : ''}
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
      }
    </>
  );
};