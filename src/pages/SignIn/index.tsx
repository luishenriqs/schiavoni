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
import { findNames, findPlayersResults, processRanking } from '@services/rankingServices';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { ButtonText } from '@components/ButtonText';
import LogoSvg from '../../assets/logoOficial/schiavoniOficial.svg';
import { UserDTO } from '@dtos/userDTO'
import { GameDTO, SeasonDTO, ResultsDTO, RankingProps, RankingTypes } from '@dtos/GameDTO'
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

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState<UserDTO>({} as UserDTO);
  const [allPlayers, setAllPlayers] = useState<UserDTO[]>({} as UserDTO[]);
  const [lastGame, setLastGame] = useState(0);
  const [currentSeason, setCurrentSeason] = useState(0);
  const [games, setGames] = useState<GameDTO[]>([] as GameDTO[]);
  const [playersCurrentSeason, setPlayersCurrentSeason] = useState<string[]>([])
  const [playersResult, setPlayersResult] = useState<ResultsDTO[]>([] as ResultsDTO[]);
  const [ranking, setRanking] = useState<RankingProps[]>([] as RankingProps[]);

  useEffect(() => {
    user.email && persistUser();
  }, [user]);

  useEffect(() => {
    allPlayers.length > 0 && persistAllPlayers(allPlayers);
  }, [allPlayers]);

  useEffect(() => {
    ranking.length > 0 && persistRanking(ranking);
  }, [ranking]);

  //==> SIGN IN
  const handleSignInWithEmailAndPassword = async () => {
    await getUserAsyncStorage();
    await getAllPlayersAsyncStorage();
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

  /* *** USER *** */

  //==> RECUPERA USER DO ASYNC STORAGE
  const getUserAsyncStorage  = async () => {
    const key = `@storage_Schiavoni:playerData`;
    try {
      const value = await AsyncStorage.getItem(key)
      const result = value && JSON.parse(value)
      result.email && result.email === email ? setUser(result) : await getUserFirestore()
    } catch (e) {
      Alert.alert('Houve um erro na recuperação dos dados do player!');
      console.error(e);
    };
  };

  //==> RECUPERA USER DO FIRESTORE SE ASYNC STORAGE VAZIO
  const getUserFirestore = async () => {
    const subscribe = firestore()
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

  //==> PERSISTE ASYNC STORAGE
  const setUserAsyncStorage = async (key: string, data: any) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      Alert.alert('Houve um erro ao persistir os dados dos players!');
      console.error(e);
    };
  };

  /* ***ALL PLAYERS*** */

  //==> RECUPERA ALL PLAYERS DO ASYNC STORAGE
  const getAllPlayersAsyncStorage  = async () => {
    const key = `@storage_Schiavoni:allPlayersData`;
    try {
      const value = await AsyncStorage.getItem(key)
      const result = value && JSON.parse(value)
      result.length > 0 ? setAllPlayers(result) : await getAllPlayersFirestore()
    } catch (e) {
      Alert.alert('Houve um erro na recuperação dos dados dos players!');
      console.error(e);
    };
  };

  //==> RECUPERA ALL PLAYERS DO FIRESTORE SE ASYNC STORAGE VAZIO
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
        setAllPlayers(data)
      },
    }) 
    return () => subscribe()
  };

  //==> PERSISTE ALL PLAYERS NO ASYNC STORAGE E CONTEXTO
  const persistAllPlayers = async (allPlayers: UserDTO[]) => {
    const key = `@storage_Schiavoni:allPlayersData`;
    setAllPlayersAsyncStorage(key, allPlayers);
    setAllPlayersContext(allPlayers);
  };

  //==> PERSISTE ASYNC STORAGE
  const setAllPlayersAsyncStorage = async (key: string, data: any) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      Alert.alert('Houve um erro ao persistir os dados dos players!');
      console.error(e);
    };
  };

  /* ***RANKING*** */

  //==> RECUPERA RANKING DO ASYNC STORAGE
  const getRankingAsyncStorage  = async () => {
    const key = `@storage_Schiavoni:rankingData`;
    try {
      const value = await AsyncStorage.getItem(key)
      const result = value && JSON.parse(value)
      !!result && result.lastGame === lastGame ? setRanking(result) : await getCurrentSeason()
    } catch (e) {
      Alert.alert('Houve um erro na recuperação dos dados do ranking!');
      console.error(e);
    };
  };

  //==> RECUPERA ESTÁGIO DA ATUAL TEMPORADA SE ASYNC STORAGE VAZIO
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
        setCurrentSeason(data[0].season);
        setLastGame(data[0].game);
        getGames(data[0].season)
      },
    }) 
    return () => subscribe()
  };
  
  //==> RECUPERA JOGOS DA ATUAL TEMPORADA
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

        setGames(data);
        getPlayers(data);
      },
    }) 
    return () => subscribe()
  };

  //==> RECUPERA PLAYERS DA ATUAL TEMPORADA
  const getPlayers = (games: GameDTO[]) => {
    const players = games.length > 0 && findNames(games);
    players && setPlayersCurrentSeason(players);

    players && getResults(players, games);
  };
  
  //==> FILTRA OS RESULTADOS DE CADA PLAYER NA ATUAL TEMPORADA
  const getResults = (players: string[], games: GameDTO[]) => {
    const results = findPlayersResults(players, games);
    setPlayersResult(results);
    getRanking(results);
  };

  //==> SOMA PONTOS E CLASSIFICA OS PLAYERS
  const getRanking = (results: ResultsDTO[]) => {
    const orderedRanking = processRanking(results);
    setRanking(orderedRanking);
  };

  //==> PERSISTE RANKING NO ASYNC STORAGE E CONTEXTO
  const persistRanking = async (orderedRanking: RankingProps[]) => {
    const key = `@storage_Schiavoni:rankingData`;
    const ranking = {
      lastGame,
      orderedRanking
    }
    setRankingAsyncStorage(key, ranking);
    //setRankingContext(ranking);
  };

  /* PRÓXIMA TAREFA ===> CRIAR CONTEXTO PARA RANKING */
  /* PRÓXIMA TAREFA ===> CRIAR CONTEXTO PARA RANKING */
  /* PRÓXIMA TAREFA ===> CRIAR CONTEXTO PARA RANKING */
  /* PRÓXIMA TAREFA ===> CRIAR CONTEXTO PARA RANKING */
  /* PRÓXIMA TAREFA ===> CRIAR CONTEXTO PARA RANKING */

  //==> PERSISTE ASYNC STORAGE
  const setRankingAsyncStorage = async (key: string, ranking: RankingTypes) => {
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