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
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { ButtonText } from '@components/ButtonText';
import LogoSvg from '../../assets/logoOficial/schiavoniOficial.svg';
import { UserDTO } from '@dtos/userDTO'
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

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentPlayer, setCurrentPlayer] = useState<UserDTO>({} as UserDTO);

  useEffect(() => {
    currentPlayer.email && persistUserData(currentPlayer);
  }, [currentPlayer]);

  const dataKey = `@storage_Schiavoni:playerData`;

  //==> PERSISTE ASYNC STORAGE
  const setAsyncStorageData = async (userData: UserDTO) => {
    try {
      await AsyncStorage.setItem(dataKey, JSON.stringify(userData));
    } catch (e) {
      Alert.alert('Houve um erro ao persistir os dados do player!');
      console.error(e);
    };
  };

  //==> RECUPERA ASYNC STORAGE
  const getAsyncStorageData  = async () => {
    try {
      const value = await AsyncStorage.getItem(dataKey)
      const result = value && JSON.parse(value)
      result.email && result.email === email ? setCurrentPlayer(result) : await fetchUser()
    } catch (e) {
      Alert.alert('Houve um erro na recuperação dos dados do player!');
      console.error(e);
    };
  };

  //==> RECUPERA DADOS DO USUÁRIO SE ASYNC STORAGE VAZIO
  const fetchUser = async () => {
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
        setCurrentPlayer(data[0])
      },
    }) 
    return () => subscribe()
  };

  //==> PERSISTE DADOS DO USUÁRIO NO CONTEXTO E ASYNC STORAGE
  const persistUserData = async (user: any) => {
    const userData = {
      doc_id: currentPlayer.doc_id,
      name: currentPlayer.name,
      email: currentPlayer.email,
      isAdmin: currentPlayer.isAdmin,
      avatar: currentPlayer.avatar,
      profile: currentPlayer.profile,
    };

    setAsyncStorageData(userData);
    setUserContext(userData);
  };
  
  //==> SIGN IN
  const handleSignInWithEmailAndPassword = async () => {
    await getAsyncStorageData();

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