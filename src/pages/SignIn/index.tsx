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
  const { setRankingContext } = useChampion();

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

  
  /* ***PRIMEIRO ACESSO*** */
  /* ***PRIMEIRO ACESSO*** */
  /* ***PRIMEIRO ACESSO*** */
  /* ***PRIMEIRO ACESSO*** */
  /* ***PRIMEIRO ACESSO*** */
  /* ***PRIMEIRO ACESSO*** */
  /* ***PRIMEIRO ACESSO*** */
  /* ***PRIMEIRO ACESSO*** */
  /* ***PRIMEIRO ACESSO*** */
  /* ***PRIMEIRO ACESSO*** */

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


  /* ***SIGN IN*** */

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


  /* ***BUSCA DO ASYNC STORAGE*** */

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

  //==> RECUPERA ALL PLAYERS DO ASYNC STORAGE
  const getAllPlayersAsyncStorage  = async () => {
    const key = `@storage_Schiavoni:allPlayersData`;
    try {
      const value = await AsyncStorage.getItem(key)
      const result = value && JSON.parse(value)
      result && result.length > 0 
        ? setAllPlayers(result) 
        : await getAllPlayersFirestore()
    } catch (e) {
      Alert.alert('Houve um erro na recuperação dos dados dos players!');
      console.error(e);
    };
  };

  //==> RECUPERA RANKING DO ASYNC STORAGE
  const getRankingAsyncStorage  = async () => {
    const key = `@storage_Schiavoni:rankingData`;
    try {
      const value = await AsyncStorage.getItem(key)
      const result = value && JSON.parse(value)
      !!result && result.lastGame === lastGame 
        ? setRanking(result) 
        : await getCurrentSeason()
    } catch (e) {
      Alert.alert('Houve um erro na recuperação dos dados do ranking!');
      console.error(e);
    };
  };


  /* ***BUSCA DO FIRESTORE*** */
  
  //==> RECUPERA USER DO FIRESTORE
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

  //==> RECUPERA ALL PLAYERS DO FIRESTORE
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
        if (data.length === 0) {
          createCurrentSeason();
          getCurrentSeason();
        } else {
          setCurrentSeason(data[0].season);
          setLastGame(data[0].game);
          getGames(data[0].season);
        };
      },
    }) 
    return () => subscribe()
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
        if (data.length === 0) {
          createGameResult();
          getGames(0);
        } else {
          setGames(data);
          getPlayers(data);
        };
      },
    }) 
    return () => subscribe()
  };



  /* ***PERSIST*** */

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

  useEffect(() => {
    allPlayers.length > 0 && persistAllPlayers(allPlayers);
  }, [allPlayers]);

  //==> PERSISTE ALL PLAYERS NO ASYNC STORAGE E CONTEXTO
  const persistAllPlayers = async (allPlayers: UserDTO[]) => {
    const key = `@storage_Schiavoni:allPlayersData`;
    setAllPlayersAsyncStorage(key, allPlayers);
    setAllPlayersContext(allPlayers);
  };

  //==> PERSISTE TODOS OS PLAYERS NO ASYNC STORAGE
  const setAllPlayersAsyncStorage = async (key: string, data: any) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      Alert.alert('Houve um erro ao persistir os dados dos players!');
      console.error(e);
    };
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


  /* ***SERVICES*** */

  //==> CHAMA SERVICE FIND NAMES
  const getPlayers = (games: GameDTO[]) => {
    const players = games.length > 0 && findNames(games);
    players && setPlayersCurrentSeason(players);

    players && getResults(players, games);
  };
  
  //==> CHAMA SERVICE FIND PLAYERS RESULTS
  const getResults = (players: string[], games: GameDTO[]) => {
    const results = findPlayersResults(players, games);
    setPlayersResult(results);
    getRanking(results);
  };

  //==> CHAMA SERVICE PROCESS RANKING
  const getRanking = (results: ResultsDTO[]) => {
    const orderedRanking = processRanking(results);
    setRanking(orderedRanking);
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