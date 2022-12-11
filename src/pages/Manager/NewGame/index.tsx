import React, { useState } from 'react';
import { Header } from '@components/Header';
import { 
  Alert,
  KeyboardAvoidingView, 
  Platform
} from 'react-native';
import firestore from '@react-native-firebase/firestore'
import { format } from 'date-fns'
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { PsopImage } from '@components/PsopImage';
import PSOPLogo from '@assets/psop/PSOPLogo.svg';
import {
  Container, 
  Content
} from './styles';

export function NewGame({navigation}: {navigation: any}) {
  const [name, setName] = useState('')
  const [position, setPosition] = useState(0)
  const [points, setPoints] = useState(0)

  async function handleAddResult() {
    firestore()
    .collection('game_result')
    .doc('Game ' + new Date())
    .set({
      name,
      position,
      points,
      date: format(new Date(), 'dd/MM/yyyy'),
      createdAt: firestore.FieldValue.serverTimestamp()
    })
    .then(() => {
      Alert.alert('Result added successfully')
    })
    .catch((error) => console.error(error))
  }

  return (
    <Container>
      <Header
        title='New Game'
        text='De 02/ago a 20/set'
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
            onChangeText={(value) => setName(value)}
          />
          <Input 
            placeholder='Position'
            keyboardType='numeric'
            onChangeText={(value) => setPosition(Number(value))}
          />
          <Input 
            placeholder='Points'
            keyboardType='numeric'
            onChangeText={(value) => setPoints(Number(value))}
          />
          <Button 
            title='Add New Result'
            onPress={handleAddResult}
          />
        </Content>
      </KeyboardAvoidingView>
    </Container>
  );
};