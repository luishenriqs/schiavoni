import React, { useEffect, useState } from "react";
import { FlatList, KeyboardAvoidingView } from "react-native";
import firestore from '@react-native-firebase/firestore';
import { useAuth } from '@hooks/useAuth';
import { useChampion } from '@hooks/useChampion';
import { useAllPlayers } from '@hooks/useAllPlayers';
import { Header } from '@components/Header';
import { LeaderCard } from '@components/LeaderCard';
import { CardRanking }from '@components/CardRanking';
import { LabelPSOP } from "@components/LabelPSOP";
import { SeasonDTO } from '@dtos/GameDTO'
import { Container, Content } from './styles';

export function PSOP({navigation}: {navigation: any}) {
  const { user, anonymous } = useAuth();
  const { ranking } = useChampion();
  const { allPlayers } = useAllPlayers();

  // console.log('allPlayers ', allPlayers)
  // console.log('ranking ', ranking)

  const [lastGame, setLastGame] = useState(0);
  const [currentSeason, setCurrentSeason] = useState(0);

  const anonymousURL = anonymous.anonymousURL;

  useEffect(() => {
    getCurrentSeason()
    getProfileImage()
  }, []);

  //==> RECUPERA ESTÁGIO DA ATUAL TEMPORADA
  const getCurrentSeason = async () => {
    const subscribe = firestore()
    .collection('current_season')
    .onSnapshot({
      error: (e) => console.error(e),
      next: (querySnapshot) => {
        const data = querySnapshot.docs.map(doc => {
          return {
            doc_id: doc.id,
          ...doc.data()
          }
        }) as SeasonDTO[]
        data[0].season 
        ? setCurrentSeason(data[0].season)
        : setCurrentSeason(1);
        data[0].game && setLastGame(data[0].game);
      },
    }) 
    return () => subscribe()
  };

  /* USAR O SELECT PARA CRIAR UM RESULTADO NOVO */
  /* USAR O SELECT PARA CRIAR UM RESULTADO NOVO */
  /* USAR O SELECT PARA CRIAR UM RESULTADO NOVO */

  const getProfileImage = async () => {
    ranking.orderedRanking.map((el) => {
      const profileImage = allPlayers.filter((player) => {
        if (player.name === el.player) {
          return player.profile;
        }
        console.log('=====> ', profileImage)
      })
      if (profileImage) {
      }
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
              Season={`Temporada ${currentSeason}`}
              Game={`Game ${lastGame}`}
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
                />
              )}
            />
          }
        </Content>
      </Container>
    </KeyboardAvoidingView>
  );
};
