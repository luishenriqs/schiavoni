import React, { useEffect, useState } from 'react';
import { ImageBackground } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useChampion } from '@hooks/useChampion';
import { Loading } from '@components/Loading';
import { Header } from '@components/Header';
import { PsopImage } from '@components/PsopImage';
import { renderAllChampions, renderGreatestChampions } from '@services/playersServices'
import { HallOfChampionsDTO } from '@dtos/ChampionDTO';
import {
  Container, 
  Content, 
  Title,
  Label,
  Text
} from './styles';

export function HallOfFame({navigation}: {navigation: any}) {

  const { hallOfChampions, setHallOfChampionsContext } = useChampion();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if(hallOfChampions) {
      setIsLoading(false);
    } else (
      getHallOfChampions()
    )
  }, []);


  //==> RECUPERA DADOS DO HALL DE CAMPEÕES SE CONTEXTO VAZIO
  const getHallOfChampions = () => {
    const subscribe = firestore()
    .collection('hall_of_champions')
    .onSnapshot({
      error: (e) => console.error(e),
      next: (querySnapshot) => {
        const data = querySnapshot.docs.map(doc => {
          return {
          ...doc.data()
          }
        }) as HallOfChampionsDTO[]
        setHallOfChampionsContext(data);
        setIsLoading(false);
      },
    }) 
    return () => subscribe()
  };

  //==> RETORNA TODAS AS TEMPORADAS E SEUS CAMPEÕES
  const renderChampions = (hallOfChampions: HallOfChampionsDTO[]) => {

    const orderedResult = renderAllChampions(hallOfChampions)

    return (
      orderedResult.map((item) => (
        <Text key={item.season}>{`${item.season}º - ${item.player}`}</Text>
      ))
    );
  };

  //==> RETORNA TODOS OS CAMPEÕES E A QUANTIDADE DE TÍTULOS
  const renderGreatest = (hallOfChampions: HallOfChampionsDTO[]) => {

    const result = renderGreatestChampions(hallOfChampions);

    return (
      result.map((item) => (
        item.wins > 1 
        ? <Text key={item.champion}>{`${item.champion} - ${item.wins} Títulos`}</Text>
        : <Text key={item.champion}>{`${item.champion} - ${item.wins} Título`}</Text>
      ))
    );
  };


  return (
    <>
      {isLoading
        ? <Loading />
        :
          <Container>
            <Header
              title='Hall Of Fame'
              text={'The Great Champions'}
              headerSize={'big'}
              onPress={() => navigation.openDrawer()}
            />
            <ImageBackground 
              source={require('@assets/wallpapers/burningPoker01.jpg')} 
              resizeMode='cover'
              style={{flex: 1, alignItems: 'center', maxWidth: 500, minWidth: 500}}
            >
              <PsopImage />
              <Content>
                <Title>GALERIA DE CAMPEÕES</Title>
                <Label>Temporada / Campeão</Label>
                {!!hallOfChampions && renderChampions(hallOfChampions)}
                <Title>MAIORES CAMPEÕES</Title>
                <Label>Campeão / Títulos</Label>
                {!!hallOfChampions && renderGreatest(hallOfChampions)}
              </Content>
            </ImageBackground>
          </Container>
      }
    </>
  );
};