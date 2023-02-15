import React, { useEffect } from 'react';
import { FlatList } from "react-native";
import firestore from '@react-native-firebase/firestore';
import { useAllPlayers } from '@hooks/useAllPlayers';
import { Header } from '@components/Header';
import { PsopImage } from '@components/PsopImage';
import { CardSquadPlayers } from '@components/CardSquadPlayers';
import { UserDTO } from '@dtos/userDTO'
import { Container, Content, Title } from './styles';

export function Squad({navigation}: {navigation: any}) {
  const year = new Date().getFullYear();
  const { allPlayers, setAllPlayersContext } = useAllPlayers();

  const anonymousURL = 'anonymousURL';

  useEffect(() => {
    if (allPlayers.length === 0) getAllPlayers();
  }, []);

  //==> ATUALIZA TODOS OS JOGADORES NO CONTEXTO SE VAZIO
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
      },
    }) 
    return () => subscribe();
  };

  //==> REMOVE O 'ANONYMOUS PLAYER'
  allPlayers.filter((player) => {
    if (player.name === 'Anonymous Player') {
      const index = allPlayers.indexOf(player)
      allPlayers.splice(index, 1);
    }
  });

  return (
    <Container>
      <Header
        title='Player Squad'
        text={'Seleção ' + String(year)}
        headerSize={'big'}
        onPress={() => navigation.openDrawer()}
      />
      <PsopImage />
      <Content>
        <Title>Seleção dos jogadores</Title>
        {allPlayers &&
          <FlatList
            data={allPlayers as any}
            keyExtractor={(item, index) => index + item.name}
            renderItem={({ item }) => (
              <CardSquadPlayers 
                name={item.name}
                isAdmin={item.isAdmin}
                profile={item.profile ? item.profile : anonymousURL}
              />
            )}
          />
        }
      </Content>
    </Container>
  );
};