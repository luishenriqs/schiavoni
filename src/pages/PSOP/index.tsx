import React, { useEffect, useState } from 'react';
import { FlatList } from "react-native";
import firestore from '@react-native-firebase/firestore';
import { useAuth } from '@hooks/useAuth';
import { useAllPlayers } from '@hooks/useAllPlayers';
import { useChampion } from '@hooks/useChampion';
import { getRanking } from '@services/rankingServices';
import { Loading } from '@components/Loading';
import { Header } from '@components/Header';
import { LeaderCard } from '@components/LeaderCard';
import { CardRanking }from '@components/CardRanking';
import { LabelPSOP } from "@components/LabelPSOP";
import { GameDTO } from '@dtos/GameDTO'
import { UserDTO } from '@dtos/UserDTO'
import { Container, Content, Title, Text, Imagem, ChooseSeasonContainer, SeasonText, Empty } from './styles';
import { ButtonIcon } from '@components/ButtonIcon';

export function PSOP({navigation}: {navigation: any}) {
  const { user } = useAuth();
  const { allPlayers } = useAllPlayers();
  const { 
    ranking,
    currentSeason,
    setRankingContext, 
    setGameResultContext
  } = useChampion();

  const [seasonToShow, setSeasonToShow] = useState(currentSeason.season)
  const [gameToShow, setGameToShow] = useState(currentSeason.game)

  const anonymousURL = 'anonymousURL';

  //==> RECUPERA JOGOS DA ATUAL TEMPORADA E PERSISTE NO CONTEXTO
  //==> PROCESSA E PERSISTE RANKING NO CONTEXTO
  const getGames = (
    allPlayers: UserDTO[],
    season: number,
    game: number,
  ) => {
    const subscribe = firestore()
    .collection('game_result')
    .where('season', '==', seasonToShow)
    .onSnapshot({
      error: (e) => console.error(e),
      next: (querySnapshot) => {
        const data = querySnapshot.docs.map(doc => {
          return {
            doc_id: doc.id,
          ...doc.data()
          }
        }) as GameDTO[]
          data && setGameResultContext(data);
          const ranking = getRanking(data, allPlayers, game);
          ranking && setRankingContext(ranking);
      },
    }) 
    return () => subscribe();
  };

  useEffect(() => {
    const game = seasonToShow === currentSeason.season ? currentSeason.game : 8
    setGameToShow(game)
    getGames(allPlayers, seasonToShow, game);
  }, [seasonToShow]);

  return (
    <Container>
      <Header
        title='PSOP'
        text='Patos Series Of Poker'
        picture={user.profile ? user.profile : anonymousURL}
        headerSize={currentSeason.game === 0 ? 'small' : 'big'}
        onPress={() => navigation.openDrawer()}
      />
      <Content>
        {ranking.game > 0 
          ?
            <LeaderCard 
              title='LÍDER:'
              leadersName={ranking.orderedRanking[0].player}
              profile={
                ranking.orderedRanking[0].profile
                  ? ranking.orderedRanking[0].profile
                  : anonymousURL
              }   
              Season={`Temporada ${seasonToShow}`}
              Game={`Etapa ${gameToShow}`}
            />
          : gameToShow === 0 
          ? 
            <>
              <Text>PATOS SERIES OF POKER</Text>
              <Imagem source={require('@assets/logoOficial/PSOPLogo.jpg')}/>
            </>
          : <Loading />
        }
        <ChooseSeasonContainer>
          {seasonToShow >= 31
            ? 
              <ButtonIcon 
                onPress={() => setSeasonToShow(seasonToShow - 1)}
                name={'chevron-left'}
                size={30}
                style={{ marginRight: 15 }}
              />
            : <Empty />
          }
          <SeasonText>{`${seasonToShow}º Temporada`}</SeasonText>
          {seasonToShow < currentSeason.season
            ?
              <ButtonIcon 
                onPress={() => setSeasonToShow(seasonToShow + 1)}
                name={'chevron-right'}
                size={30}
                style={{ marginRight: 15 }}
              />
            : <Empty />
          }
        </ChooseSeasonContainer>
        {ranking.orderedRanking
          ?
            <>
              <LabelPSOP />
              <FlatList
                data={ranking.orderedRanking}
                keyExtractor={(item, index) => index + item.player}
                renderItem={({ item, index }) => (
                  <CardRanking 
                    position={`${index + 1} º`}
                    positionNumber={index + 1}
                    name={item.player}
                    points={item.totalPoints}
                    profile={item.profile}
                  />
                )}
              />
            </>
          : gameToShow === 0 
            ? 
              <>
                <Title>{`${seasonToShow}º Temporada`}</Title>
                <Text>{`Nenhuma etapa registrada`}</Text>
              </>
            : <Loading />
        }
      </Content>
    </Container>
  );
};
