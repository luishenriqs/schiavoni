import React, { useState, useEffect } from 'react';
import { 
    KeyboardAvoidingView, 
    TouchableOpacityProps,
    Platform,
    Alert
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '@hooks/useAuth';
import { useAllPlayers } from '@hooks/useAllPlayers';
import { useChampion } from '@hooks/useChampion';
import { findNames, findPlayersResults, processRanking } from '@services/rankingServices';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { ButtonText } from '@components/ButtonText';
import LogoSvg from '../../assets/logoOficial/schiavoniOficial.svg';
import { UserDTO } from '@dtos/userDTO'
import { GameDTO, SeasonDTO, ResultsDTO } from '@dtos/GameDTO'
import { RankingProps, RankingDTO } from '@dtos/RankingDTO'
import {
    Container,
    Header,
    BackButton,
    LogoBox,
    Icon,
    FormContent,
    Title
} from './styles';

type Props = TouchableOpacityProps;

export function SignIn({navigation}: {navigation: any}, { }: Props) {
  const theme = useTheme();
  const { setUserContext } = useAuth();
  const { setAllPlayersContext } = useAllPlayers();
  const { setRankingContext, setCurrentSeasonContext } = useChampion();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState<UserDTO>({} as UserDTO);
  const [allPlayers, setAllPlayers] = useState<UserDTO[]>({} as UserDTO[]);
  const [currentSeason, setCurrentSeason] = useState(0);
  const [lastGame, setLastGame] = useState(0);
  const [ranking, setRanking] = useState<RankingProps[]>([] as RankingProps[]);


  /* ***SIGN IN*** */

  //==> SIGN IN
  const handleSignInWithEmailAndPassword = async () => {
    await getUserAsyncStorage();
    await getAllPlayersFirestore();
    await getCurrentSeasonFirestore();
    await getRankingAsyncStorage();

    if (!email || !email) {
      Alert.alert('Informe seu email e senha!')
    } else {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => console.log('LOGADO COM SUCESSO ', email))
        .catch((error) => {
          console.error(error)
          if (error.code === 'auth/user-not-found') {
            return Alert.alert('Esse player não existe!');
          };
  
          if (error.code === 'auth/invalid-email' || error.code === 'auth/wrong-password') {
            return Alert.alert('Player ou senha inválido!');
          };
  
          if (error.code === 'auth/too-many-requests') {
            return Alert.alert('Muitas tentativas, senha bloqueada. Resete sua senha e tente novamente mais tarde!');
          };
        });
    };
  };


  /* ***USER*** */

  //==> RECUPERA USER DO ASYNC STORAGE
  const getUserAsyncStorage  = async () => {
    const key = `@storage_Schiavoni:playerData`;
    try {
      const value = await AsyncStorage.getItem(key)
      const result = value && JSON.parse(value)
      result && result.email && result.email === email 
        ? setUser(result) 
        : await getUserFirestore();
    } catch (e) {
      Alert.alert('Houve um erro na recuperação dos dados do usuário!');
      console.error(e);
    };
  };

  //==> RECUPERA USER DO FIRESTORE
  const getUserFirestore = async () => {
    const subscribe: any = firestore()
    .collection('players')
    .where('email', '==', email)
    .onSnapshot({
      error: (e) => console.error(e),
      next: (querySnapshot) => {
        const data = querySnapshot.docs.map(doc => {
          return {
            doc_id: doc.id,
          ...doc.data()
          }
        }) as UserDTO[]
        setUser(data[0])
      },
    }) 
    return () => subscribe()
  };

  useEffect(() => {
    user.email && persistUser();
  }, [user]);

  //==> PERSISTE USER NO ASYNC STORAGE E CONTEXTO
  const persistUser = async () => {
    const userData = {
      doc_id: user.doc_id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      avatar: user.avatar,
      profile: user.profile,
    };

    const key = `@storage_Schiavoni:playerData`;
    setUserAsyncStorage(key, userData);
    setUserContext(userData);
  };

  //==> PERSISTE USER NO ASYNC STORAGE
  const setUserAsyncStorage = async (key: string, data: any) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      Alert.alert('Houve um erro ao persistir os dados do usuário!');
      console.error(e);
    };
  };


  /* ***ALL PLAYERS*** */
  
  //==> RECUPERA ALL PLAYERS DO FIRESTORE
  const getAllPlayersFirestore = async () => {
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
        setAllPlayers(data)
      },
    }) 
    return () => subscribe()
  };

  useEffect(() => {
    allPlayers.length > 0 && persistAllPlayers(allPlayers);
  }, [allPlayers]);

  //==> PERSISTE ALL PLAYERS NO CONTEXTO
  const persistAllPlayers = async (allPlayers: UserDTO[]) => {
    setAllPlayersContext(allPlayers);
  };


  /* ***CURRENT SEASON*** */

  //==> RECUPERA CURRENT SEASON DO FIRESTORE
  const getCurrentSeasonFirestore = async () => {
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
          setCurrentSeason(data[0].season);
          setLastGame(data[0].game);
      },
    }) 
    return () => subscribe()
  };

  useEffect(() => {
    currentSeason && persistCurrentSeason();
  }, [currentSeason]);

  //==> PERSISTE CURRENT SEASON NO CONTEXTO
  const persistCurrentSeason = async () => {
    const currentSeasonData = {
      season: currentSeason,
      game: lastGame,
    };

    setCurrentSeasonContext(currentSeasonData);
  };


  /* ***RANKING*** */

  //==> RECUPERA RANKING DO ASYNC STORAGE
  const getRankingAsyncStorage  = async () => {
    const key = `@storage_Schiavoni:rankingData`;
    try {
      const value = await AsyncStorage.getItem(key)
      const result = value && JSON.parse(value)
      !!result && result.lastGame === lastGame 
        ? setRanking(result) 
        : await getGames(currentSeason)
    } catch (e) {
      Alert.alert('Houve um erro na recuperação dos dados do ranking!');
      console.error(e);
    };
  };

  //==> RECUPERA JOGOS DA ATUAL TEMPORADA DO FIRESTORE
  const getGames = async (currentSeason: number) => {
    const subscribe = firestore()
    .collection('game_result')
    .where('season', '==', currentSeason)
    .onSnapshot({
      error: (e) => console.error(e),
      next: (querySnapshot) => {
        const data = querySnapshot.docs.map(doc => {
          return {
            doc_id: doc.id,
          ...doc.data()
          }
        }) as GameDTO[]
        getPlayers(data);
      },
    }) 
    return () => subscribe()
  };

  //==> CHAMA SERVICE FIND NAMES
  const getPlayers = (games: GameDTO[]) => {
    const players = games.length > 0 && findNames(games);
    players && getResults(players, games);
  };
  
  //==> CHAMA SERVICE FIND PLAYERS RESULTS
  const getResults = (players: string[], games: GameDTO[]) => {
    const results = findPlayersResults(players, games);
    getRanking(results);
  };

  //==> CHAMA SERVICE PROCESS RANKING
  const getRanking = (results: ResultsDTO[]) => {
    const orderedRanking = processRanking(results);
    setRanking(orderedRanking);
  };

  useEffect(() => {
    ranking.length > 0 && persistRanking(ranking);
  }, [ranking]);

  //==> PERSISTE RANKING NO ASYNC STORAGE E CONTEXTO
  const persistRanking = async (orderedRanking: RankingProps[]) => {
    const key = `@storage_Schiavoni:rankingData`;
    const ranking = {
      lastGame,
      orderedRanking
    }
    setRankingAsyncStorage(key, ranking);
    setRankingContext(ranking);
  };

  //==> PERSISTE RANKING NO ASYNC STORAGE
  const setRankingAsyncStorage = async (key: string, ranking: RankingDTO) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(ranking));
    } catch (e) {
      Alert.alert('Houve um erro ao persistir os dados do ranking!');
      console.error(e);
    };
  };


  /* ***EMAIL*** */

  //==> RECUPERA SENHA
  function handleForgotPassword() {
    if (!email) {
      Alert.alert('Informe seu email e senha!')
    } else {
      auth()
        .sendPasswordResetEmail(email)
        .then(() => Alert.alert('Nós enviamos um link para o seu email para resetar sua senha.'));
    };
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
          <Container>
              <Header>
                  <BackButton onPress={() => navigation.goBack()}>
                      <Icon name='arrow-back' size={30}/>
                  </BackButton>
                  <LogoBox>
                      <LogoSvg 
                          width={RFValue(270)}
                          height={RFValue(270)}
                      />
                  </LogoBox>
              </Header>
              <KeyboardAvoidingView
                  behavior={Platform.OS === "ios" ? "padding" : undefined}
                  style={{
                      flex: 1, 
                      paddingHorizontal: 40,
                  }}
              >
                  <FormContent>
                      <Title>Only legends play here</ Title>
                      <Input 
                          placeholder='Email'
                          keyboardType='email-address'
                          autoCorrect={false}
                          autoCapitalize='none'
                          onChangeText={(value) => setEmail(value)}
                      />
                      <Input 
                          placeholder='Password'
                          secureTextEntry
                          onChangeText={(value) => setPassword(value)}
                      />
                      <Button
                          title="Sign In"
                          type='GRAY-BUTTON'
                          onPress={handleSignInWithEmailAndPassword}
                      />
                      <ButtonText 
                          title="Recuperar senha" 
                          onPress={handleForgotPassword}
                      />
                  </FormContent>
              </KeyboardAvoidingView>
          </Container>
      </LinearGradient>
  );
};