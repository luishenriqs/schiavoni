import React from "react";
import { FlatList, KeyboardAvoidingView } from "react-native";
import { useAuth } from '@hooks/useAuth';
import { useChampion } from '@hooks/useChampion';
import { Header } from '@components/Header';
import { LeaderCard } from '@components/LeaderCard';
import { CardRanking }from '@components/CardRanking';
import { LabelPSOP } from "@components/LabelPSOP";
import { Container, Content } from './styles';

export function PSOP({navigation}: {navigation: any}) {
  const { user } = useAuth();
  const { ranking, currentSeason } = useChampion();

  const anonymousURL = 'anonymousURL';

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
              avatar={
                ranking.orderedRanking[0].avatar
                  ? ranking.orderedRanking[0].avatar
                  : anonymousURL
              }   
              Season={`Temporada ${currentSeason.season}`}
              Game={`Etapa ${currentSeason.game}`}
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
