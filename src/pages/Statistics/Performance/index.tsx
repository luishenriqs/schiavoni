import React, { useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';
import { useAuth } from '@hooks/useAuth';
import { useAllPlayers } from '@hooks/useAllPlayers';
import { useChampion } from '@hooks/useChampion';
import { getLevel } from '@services/levelServices';
import { Loading } from '@components/Loading';
import { Header } from '@components/Header';
import { PlayerImage } from '@components/PlayerImage';
import { GameDTO } from '@dtos/GameDTO';
import { UserDTO } from '@dtos/UserDTO';
import { Container, Content, Title, Imagem } from './styles';

export function Performance({route, navigation}: any) {
  const { user } = useAuth();
  const { level, setLevelContext } = useChampion();
  const { setAllPlayersContext } = useAllPlayers();

  const anonymousURL = 'anonymousURL';

  const { name } = route.params;

  const url = "https://firebasestorage.googleapis.com/v0/b/schiavoni-8efc7.appspot.com/o/ProfileImage%2FProfile_Image_Luis%C3%A3o%20.jpeg?alt=media&token=02178a5b-484e-4b44-9ac5-6b5579612b58";

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
        title='Performance'
        text={`Últimas 3 Temporadas`}
        picture={user.profile ? user.profile : anonymousURL}
        headerSize={'big'}
        icon={'keyboard-backspace'}
        onPress={() => navigation.goBack()}
      />
        <Imagem 
          source={{uri: url ? url : anonymousURL}}
        />
      <Content>
        <Title>{name}</Title>
      </Content>
    </Container>
  );
};