import React, { useState } from 'react';
import { 
  KeyboardAvoidingView, 
  Platform,
  Alert
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'
import { Header } from '@components/Header';
import { PsopImage } from '@components/PsopImage';
import PSOPLogo from '@assets/psop/PSOPLogo.svg';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { ButtonRadio } from '@components/ButtonRadio';
import {
  Container, 
  Content
} from './styles';

export function NewPlayer({navigation}: {navigation: any}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false)

  function handleSelectAdmin() {
    isAdmin ? setIsAdmin(false) : setIsAdmin(true);
  };

  function createNewPlayer(
    name: string,
    email: string, 
    password: string,
    isAdmin: boolean
  ) {
    firestore()
    .collection('players')
    .doc(email + '-' + new Date())
    .set({
      name,
      email,
      isAdmin,
      avatar: '',
      profile: ''
    })
    .catch((error) => console.error(error))

    auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => { Alert.alert('Novo player criado com sucesso!') })
    .catch(erro => {
      console.error(erro.code)
      if (erro.code === 'auth/email-already-in-use') {
        return Alert.alert('Esse email já existe em nosso sistema!');
      };

      if (erro.code === 'auth/invalid-email') {
        return Alert.alert('Email inválido!');
      };

      if (erro.code === 'auth/weak-password') {
        return Alert.alert('Senha deve ter no mínimo 6 dígitos');
      };
    });
  };

  function handleCreateUserAccount() {
    if (!email || !email) {
      Alert.alert('Informe seu email e senha!')
    } else {
      createNewPlayer(name, email, password, isAdmin)
    }
  };

  return (
    <Container>
      <Header
        title='New Player'
        text='Cadastre um novo jogador'
        headerSize={'big'}
        onPress={() => navigation.openDrawer()}
      />
      <PsopImage
        svg={PSOPLogo}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{
            flex: 1, 
            paddingHorizontal: 40,
        }}
      >
        <Content>
          <Input 
            placeholder='Name'
            autoCorrect={false}
            onChangeText={(value) => setName(value)}
          />
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
          <ButtonRadio 
            title='Admin'
            type={isAdmin}
            onPress={handleSelectAdmin}
          />
          <Button 
            title='Add New Player'
            onPress={handleCreateUserAccount}
          />
        </Content>
      </KeyboardAvoidingView>
    </Container>
  );
};