import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore'
import { Header } from '@components/Header';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { PsopImage } from '@components/PsopImage';
import { Container, Content, Title } from './styles';

export function NewChampion({navigation}: {navigation: any}) {
  const [name, setName] = useState('');
  const [season, setSeason] = useState(26);

  function handleAddNewChampion() {
    firestore()
    .collection('champion')
    .doc('Champion')
    .set({
      name,
      season: season + 1
    })
    .then(() => {
      Alert.alert('Novo campeão salvo com sucesso!')
    })
    .catch((error) => console.error(error));
  };

  return (
    <Container>
      <Header
        title='New Champion'
        text='Season 27'
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
          <Title>New PSOP Champion</Title>
          <Input 
            placeholder='Name'
            autoCorrect={false}
            autoCapitalize='none'
            onChangeText={(value) => setName(value)}
          />
          <Button 
            title='Novo PSOP Champion'
            onPress={handleAddNewChampion}
          />
        </Content>
      </KeyboardAvoidingView>
    </Container>
  );
};