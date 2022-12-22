import React, { useState } from 'react';
import { Header } from '@components/Header';
import { Alert, KeyboardAvoidingView, Platform } from 'react-native';
import firestore from '@react-native-firebase/firestore'
import { format } from 'date-fns'
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { PsopImage } from '@components/PsopImage';
import { Container, Content } from './styles';

export function NewGame({navigation}: {navigation: any}) {
  const [season, setSeason] = useState(0)
  const [game, setGame] = useState(0)
  const [name, setName] = useState('')
  const [position, setPosition] = useState(0)
  const [points, setPoints] = useState(0)

  //==> REGISTRA UM NOVO RESULTADO INDIVIDUAL
  async function handleAddResult() {
    firestore()
    .collection('game_result')
    .doc('Game ' + new Date())
    .set({
      season,
      game,
      name,
      position,
      points,
      date: format(new Date(), 'dd/MM/yyyy'),
    })
    .then(() => {
      Alert.alert('Result added successfully')
    })
    .catch((error) => console.error(error))

    firestore()
    .collection('current_season')
    .doc('currentData')
    .set({
      season,
      game
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
      <PsopImage />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{
            flex: 1, 
            paddingHorizontal: 40,
        }}
      >
        <Content>
          <Input 
            placeholder='Season'
            keyboardType='numeric'
            onChangeText={(value) => setSeason(Number(value))}
          />
          <Input 
            placeholder='Game'
            keyboardType='numeric'
            onChangeText={(value) => setGame(Number(value))}
          />
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