import React, { useState } from 'react';
import { 
  KeyboardAvoidingView, 
  Platform,
  Alert
} from 'react-native';
import auth from '@react-native-firebase/auth';
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
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isActive, setIsActive] = useState(false)

  function handleSelectAdmin() {
    isActive ? setIsActive(false) : setIsActive(true);
  }

  function handleCreateUserAccount() {
    if (!email || !email) {
      Alert.alert('Informe seu email e senha!')
    } else {
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
          {/* <Input 
            placeholder='Name'
            autoCorrect={false}
            autoCapitalize='none'
          /> */}
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
          {/* <ButtonRadio 
            title='Admin'
            type={isActive}
            onPress={handleSelectAdmin}
          /> */}
          <Button 
            title='Add New Player'
            onPress={handleCreateUserAccount}
          />
        </Content>
      </KeyboardAvoidingView>

    </Container>
  );
};