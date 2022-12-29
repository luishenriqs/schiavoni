import React, { useEffect } from "react";
import { FlatList, KeyboardAvoidingView } from "react-native";
import { useAuth } from '@hooks/useAuth';
import { useChampion } from '@hooks/useChampion';
import { useAllPlayers } from '@hooks/useAllPlayers';
import { Header } from '@components/Header';
import { LeaderCard } from '@components/LeaderCard';
import { CardRanking }from '@components/CardRanking';
import { LabelPSOP } from "@components/LabelPSOP";
import { Container, Content } from './styles';

export function PSOP({navigation}: {navigation: any}) {
  const { user } = useAuth();
  const { ranking, currentSeason } = useChampion();
  const { allPlayers } = useAllPlayers();

  const anonymousURL = 'anonymousURL';

  useEffect(() => {
    getProfileImage();
  }, []);

  const getProfileImage = async () => {
    ranking.orderedRanking.map((item) => {
      const onePlayer = allPlayers.filter((player) => {
        if (player.name === item.player) return player;
      })
      item.profile = onePlayer[0].profile ? onePlayer[0].profile : anonymousURL;
    })
  };

  return (
    <KeyboardAvoidingView style={{flex: 1}} enabled>
      <Container>
        <Header
          title='PSOP'
          text='Patos Series Of Poker'
          picture={user.profile ? user.profile : anonymousURL}
          headerSize={'big'}
          onPress={() => navigation.openDrawer()}
        />
        <Content>
          {ranking.lastGame > 0 &&
            <LeaderCard 
              title='LÍDER:'
              leadersName={ranking.orderedRanking[0].player}
              Season={`Temporada ${currentSeason.season}`}
              Game={`Game ${currentSeason.game}`}
            />
          }
          <LabelPSOP />

          {ranking.orderedRanking &&
            <FlatList
              data={ranking.orderedRanking}
              keyExtractor={(item, index) => index + item.player}
              renderItem={({ item, index }) => (
                <CardRanking 
                  position={`${index + 1} º`}
                  name={item.player}
                  points={item.totalPoints}
                  avatar={item.profile}
                />
              )}
            />
          }
        </Content>
      </Container>
    </KeyboardAvoidingView>
  );
};
