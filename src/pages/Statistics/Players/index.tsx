import React, { useEffect } from 'react';
import { FlatList } from "react-native";
import firestore from '@react-native-firebase/firestore';
import { useAuth } from '@hooks/useAuth';
import { useAllPlayers } from '@hooks/useAllPlayers';
import { useChampion } from '@hooks/useChampion';
import { getLevel } from '@services/levelServices';
import { Loading } from '@components/Loading';
import { Header } from '@components/Header';
import { CardPerformance } from "@components/CardPerformance";
import { LabelPlayers } from "@components/LabelPlayers";
import { GameDTO } from '@dtos/GameDTO';
import { UserDTO } from '@dtos/UserDTO';
import { Container, Content, Title } from './styles';

export function StatisticsPlayers({navigation}: {navigation: any}) {
  const { user } = useAuth();
  const { level, setLevelContext } = useChampion();
  const { setAllPlayersContext } = useAllPlayers();

  const anonymousURL = 'anonymousURL';

  useEffect(() => {
    getAllPlayers();
  }, []);

  //==> RECUPERA TODOS OS JOGADORES E PERSISTE NO CONTEXTO
  //==> CHAMA GET ALL GAMES
  const getAllPlayers = () => {
    const subscribe: any = firestore()
    .collection('players')
    .onSnapshot({
      error: (e) => console.error(e),
      next: (querySnapshot) => {
        const data = querySnapshot.docs.map(doc => {
          return {
            doc_id: doc.id,
          ...doc.data()
          }
        }) as UserDTO[]
        setAllPlayersContext(data);
        getAllGames(data);
      },
    }) 
    return () => subscribe()
  };

  //==> RECUPERA TODOS OS JOGOS
  //==> PROCESSA E PERSISTE LEVEL NO CONTEXTO
  const getAllGames = (allPlayers: UserDTO[]) => {
    const subscribe = firestore()
    .collection('game_result')
    .onSnapshot({
      error: (e) => console.error(e),
      next: (querySnapshot) => {
        const data = querySnapshot.docs.map(doc => {
          return {
            doc_id: doc.id,
          ...doc.data()
          }
        }) as GameDTO[]
          const { level } = getLevel(data, allPlayers);
          level && setLevelContext(level);
      },
    }) 
    return () => subscribe();
  };

  return (
    <Container>
      <Header
        title='Statistics'
        text={`Últimas 3 Temporadas`}
        picture={user.profile ? user.profile : anonymousURL}
        headerSize={'small'}
        onPress={() => navigation.openDrawer()}
      />
      <Content>
        <Title>Escolha um jogador</Title>
        <LabelPlayers />
        {level.length > 0
          ?
            <FlatList
              data={level as any}
              keyExtractor={(item, index) => item + index}
              renderItem={({ item }) => (
                <CardPerformance 
                  name={item.player}
                  power={item.power}
                  percent={item.percent}
                  avatar={item.avatar}
                  onPress={(() => {
                    navigation.navigate('Performance', {name: item.player})
                  })}
                />
              )}
            />
          : <Loading />
        }
      </Content>
    </Container>
  );
};