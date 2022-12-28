import React, { useEffect } from 'react';
import firestore from '@react-native-firebase/firestore'
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '@components/Button';
import LogoSvg from '../../assets/logoOficial/schiavoniOficial.svg';
import { UserDTO } from '@dtos/userDTO'
import { GameDTO, SeasonDTO } from '@dtos/GameDTO'
import { ChampionDTO } from '@dtos/ChampionDTO'
import {
    Header,
    WellcomeText,
    Content,
    Title
} from './styles';

export function Wellcome({navigation}: {navigation: any}) {
  const theme = useTheme();

  useEffect(() => {
    getAllPlayersFirestore();
    getCurrentSeason();
    getGames();
    getChampion();
  }, []);

  /* ***BUSCA DO FIRESTORE*** */
  
  //==> RECUPERA PLAYERS DO FIRESTORE
  const getAllPlayersFirestore = async () => {
    const subscribe = firestore()
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
        if (data.length === 0) createPlayer();
      },
    }) 
    return () => subscribe()
  };

  //==> RECUPERA CURRENT SEASON DO FIRESTORE
  const getCurrentSeason = async () => {
    const subscribe: any = firestore()
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
        if (data.length === 0) createCurrentSeason();
      },
    }) 
    return () => subscribe()
  };

  //==> RECUPERA GAMES DO FIRESTORE
  const getGames = async () => {
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
        if (data.length === 0) createGameResult();
      },
    }) 
    return () => subscribe()
  };

  //==> RECUPERA CHAMPION DO FIRESTORE
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
        if (data.length === 0) createChampion();
      },
    }) 
    return () => subscribe()
  };

  /* ***CRIA DOCS NO FIRESTORE*** */

  //==> CRIA DO DOC PLAYERS NO FIRESTORE CASO NÃO EXISTA
  const createPlayer = () => {
    const email = 'anonymous@email.com';
    firestore()
    .collection('players')
    .doc(email + '-' + new Date())
    .set({
      name: 'Anonymous Player',
      email,
      isAdmin: true,
      avatar: '',
      profile: ''
    })
    .then(() => { console.log('CHAMA PÁG PARA ATUALIZAR PROFILE E AVATAR')})
    .catch((error) => console.error(error))
  };

  //==> CRIA DO DOC CURRENT_SEASON NO FIRESTORE CASO NÃO EXISTA
  const createCurrentSeason = () => {
    firestore()
    .collection('current_season')
    .doc('currentData')
    .set({
      season: 0,
      game: 0,
    })
    .catch((error) => console.error(error))
  };

  //==> CRIA DO DOC GAME_RESULT NO FIRESTORE CASO NÃO EXISTA
  const createGameResult = () => {
    firestore()
    .collection('game_result')
    .doc('Game ' + new Date())
    .set({
      season: 0,
      game: 0,
      name: '',
      position: 0,
      points: 0,
      date: '00/00/0000',
    })
    .catch((error) => console.error(error))
  };

  //==> CRIA DO DOC CHAMPION NO FIRESTORE CASO NÃO EXISTA
  const createChampion = () => {
    firestore()
    .collection('champion')
    .doc('newChampion')
    .set({
      name: 'Anonymous Player',
      season: 0,
      profile: '',
      avatar: '',
      id: '',
      email: 'anonymous@email.com'
    })
    .catch((error) => console.error(error));
  };

  return (
      <LinearGradient
          style={{flex: 1}}
          colors={[
              theme.COLORS.gray_900,
              theme.COLORS.gray_500,
              theme.COLORS.gray_300,
              theme.COLORS.gray_500,
              theme.COLORS.gray_900,
          ]}
      >
          <Header>
              <WellcomeText>Wellcome to</ WellcomeText>
              <LogoSvg 
                  width={RFValue(270)}
                  height={RFValue(270)}
              />
          </Header>
          <Content>
              <Title>Since 2017</ Title>
              <Button
                  title="Let's Play"
                  type='GRAY-BUTTON'
                  onPress={() => navigation.navigate('signIn')}
              />
          </Content>
      </LinearGradient>
  );
};