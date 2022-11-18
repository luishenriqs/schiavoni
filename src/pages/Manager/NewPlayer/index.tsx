import React, { useState } from 'react';
import { 
  KeyboardAvoidingView, 
  Platform
} from 'react-native';
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
  const [isActive, setIsActive] = useState(false)

  function handleSelectAdmin() {
    isActive ? setIsActive(false) : setIsActive(true);
  }

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
            autoCapitalize='none'
          />
          <Input 
            placeholder='Email'
            keyboardType='email-address'
            autoCorrect={false}
            autoCapitalize='none'
          />
          <Input 
            placeholder='Password'
            secureTextEntry
          />
          <ButtonRadio 
            title='Admin'
            type={isActive}
            onPress={handleSelectAdmin}
          />
          <Button title='Add New Player' />
        </Content>
      </KeyboardAvoidingView>

    </Container>
  );
};