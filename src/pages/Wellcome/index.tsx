import React, { useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { LinearGradient } from 'expo-linear-gradient';
import { Button } from '@components/Button';
import LogoSvg from '../../assets/logoOficial/schiavoniOficial.svg';
import { UserDTO } from '@dtos/UserDTO'
import {
    Header,
    WellcomeText,
    Content,
    Title
} from './styles';

export function Wellcome({navigation}: {navigation: any}) {
  const theme = useTheme();

  useEffect(() => {
    getAllPlayers();
  }, []);

  //==> RECUPERA PLAYERS
  const getAllPlayers: () => void = () => {
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

  //==> CRIA DOC PLAYERS CASO NÃO EXISTA
  const createPlayer: () => void = () => {
    const email = 'anonymous@email.com';
    const password = '123456';
    
    firestore()
    .collection('players')
    .doc(email)
    .set({
      name: 'Anonymous Player',
      email,
      isAdmin: true,
      avatar: '',
      profile: ''
    })
    .catch((error) => console.error(error));

    auth()
    .createUserWithEmailAndPassword(email, password)
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
                  type='GRAY-400-BUTTON'
                  onPress={() => navigation.navigate('signIn')}
              />
          </Content>
      </LinearGradient>
  );
};