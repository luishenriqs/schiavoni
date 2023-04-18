import React, { useState } from 'react';
import { 
    KeyboardAvoidingView, 
    TouchableOpacityProps,
    Platform,
    Alert
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '@hooks/useAuth';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { ButtonText } from '@components/ButtonText';
import LogoSvg from '../../assets/logoOficial/schiavoniOficial.svg';
import { UserDTO } from '@dtos/UserDTO'
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

  //==> RECUPERA USER DO FIRESTORE
  const getUser = () => {
    if (!email || !password) {
      Alert.alert('Informe seu email e senha!');
    } else {
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
          if (data.length > 0) {
            persistUser(data[0]);
            handleSignInWithEmailAndPassword();
          } else {
            Alert.alert('Email não encontrado no sistema!')
          };
        },
      }) 
      return () => subscribe();
    }
  };

  //==> PERSISTE USER NO CONTEXTO
  const persistUser = async (user: UserDTO) => {
    const userData = {
      name: user.name,
      email: user.email,
      profile: user.profile,
      avatar: user.avatar,
      doc_id: user.doc_id,
      isAdmin: user.isAdmin,
      termsOfUse: user.termsOfUse,
    };

    setUserContext(userData);
  };

  //==> SIGN IN
  const handleSignInWithEmailAndPassword = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => console.log('LOGADO COM SUCESSO ', email))
      .catch((error) => {
        console.error(error)
        if (error.code === 'auth/user-not-found') {
          return Alert.alert('Email não encontrado no sistema!');
        };

        if (error.code === 'auth/invalid-email' || error.code === 'auth/wrong-password') {
          return Alert.alert('Email ou senha inválidos!');
        };

        if (error.code === 'auth/too-many-requests') {
          return Alert.alert('Muitas tentativas, senha bloqueada. Resete sua senha e tente novamente mais tarde!');
        };
      });
  };

  /* ***EMAIL*** */

  //==> RECUPERA SENHA
  function handleForgotPassword() {
    if (!email) {
      Alert.alert('Informe seu email!')
    } else {
      auth()
        .sendPasswordResetEmail(email)
        .then(() => Alert.alert('Nós enviamos um link em seu email para redefinição de senha.'));
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
                          title="Entrar"
                          type='GRAY-BUTTON'
                          onPress={getUser}
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