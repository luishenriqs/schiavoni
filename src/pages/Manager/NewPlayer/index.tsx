import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'
import { Header } from '@components/Header';
import { PsopImage } from '@components/PsopImage';
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

  //==> VERIFICAÇÃO DE CAMPOS OBRIGATÓRIOS
  function handleCreateUserAccount() {
    if (!email || !email) {
      Alert.alert('Informe seu email e senha!')
    } else {
      createNewPlayer(name, email, password, isAdmin)
    }
  };

  //==> CRIA NOVO USUÁRIO NO FIRESTORE E NO FIREBASE/AUTH
  function createNewPlayer(
    name: string,
    email: string, 
    password: string,
    isAdmin: boolean
  ) {
    firestore()
    .collection('players')
    .doc(email)
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
    .then(() => { 
      Alert.alert('Novo player criado com sucesso!');
      setName('');
      setEmail('');
      setPassword('');
    })
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

  return (
    <Container>
      <Header
        title='New Player'
        text='Cadastre um novo jogador'
        headerSize={'big'}
        onPress={() => navigation.openDrawer()}
      />
      <PsopImage />
      <Content>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
        >
          <Input 
            placeholder='Name'
            autoCorrect={false}
            onChangeText={(value) => setName(value)}
            value={name}
          />
          <Input 
            placeholder='Email'
            keyboardType='email-address'
            autoCorrect={false}
            autoCapitalize='none'
            onChangeText={(value) => setEmail(value)}
            value={email}
          />
          <Input 
            placeholder='Password'
            secureTextEntry
            onChangeText={(value) => setPassword(value)}
            value={password}
          />
          <ButtonRadio 
            title='Admin'
            type={isAdmin}
            onPress={handleSelectAdmin}
          />
          <Button 
            title='Novo Player'
            onPress={handleCreateUserAccount}
          />
        </KeyboardAvoidingView>
      </Content>
    </Container>
  );
};