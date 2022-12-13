import React, { useState, useEffect } from 'react';
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

export type PlayersProps = {
  id: string;
  avatar: string;
  email: string;
  isAdmin: boolean;
  name: string;
  profile: string;
};

export function SignIn({navigation}: {navigation: any}, { }: Props) {
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [players, setPlayers] = useState<PlayersProps[]>([]);

  const { signIn } = useAuth();

  useEffect(() => {
    const subscribe = firestore()
    .collection('players')
    .where('email', '==', email)
    .onSnapshot({
      error: (e) => console.error(e),
      next: (querySnapshot) => {
        const data = querySnapshot.docs.map(doc => {
          return {
            id: doc.id,
          ...doc.data()
          }
        }) as PlayersProps[]
        setPlayers(data)
      },
    }) 
    return () => subscribe()
  }, [email])

  function setContext(user: any) {
    const id = user.uid
    const name = players[0].name
    const email = user.email
    const isAdmin = players[0].isAdmin
    const avatar = players[0].avatar
    const profile = players[0].profile

    signIn(
      id,
      name,
      email,
      isAdmin,
      avatar,
      profile
    )
  };
  
  function handleSignInWithEmailAndPassword() {
    if (!email || !email) {
      Alert.alert('Informe seu email e senha!')
    } else {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(({ user }) => setContext(user))
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