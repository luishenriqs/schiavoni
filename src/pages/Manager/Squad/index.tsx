import React, { useEffect } from 'react';
import { FlatList } from "react-native";
import { useAllPlayers } from '@hooks/useAllPlayers';
import { Header } from '@components/Header';
import { PsopImage } from '@components/PsopImage';
import { CardSquadPlayers } from '@components/CardSquadPlayers';
import { Container, Content, Title } from './styles';
import pl from 'date-fns/esm/locale/pl/index.js';

export function Squad({navigation}: {navigation: any}) {
  const year = new Date().getFullYear();
  const { allPlayers } = useAllPlayers();

  const anonymousURL = 'anonymousURL';

  const allPlayersFiltered = allPlayers.filter((player) => {
    if (player.name === 'Anonymous Player') {
      const index = allPlayers.indexOf(player)
      allPlayers.splice(index, 1);
    }
  })

  useEffect(() => {
    allPlayers.filter((player) => {
      if (player.name === 'Anonymous Player') {
        const index = allPlayers.indexOf(player)
        allPlayers.splice(index, 1);
      }
    })
  }, []);

  return (
    <Container>
      <Header
        title='Squad of Players'
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