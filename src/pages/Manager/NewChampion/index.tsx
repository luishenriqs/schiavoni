import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore'
import { Header } from '@components/Header';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { PsopImage } from '@components/PsopImage';
import ModalComponent from '@components/ModalComponent';
import { UserDTO } from '@dtos/userDTO'
import { 
  Container,
  Content,
  Title
} from './styles';

type OldChampionProps = UserDTO & {
  season: number
};

export function NewChampion({navigation}: {navigation: any}) {
  const [name, setName] = useState('');
  const [season, setSeason] = useState(0);
  const [newChampion, setNewChampion] = useState<UserDTO>({} as UserDTO);
  const [oldChampion, setOldChampion] = useState<OldChampionProps>({} as OldChampionProps);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    recoverCurrentChampion();
  }, []);

  //==> RECUPERA O PERFIL DO ATUAL CAMPEÃO
  const recoverCurrentChampion = () => {
    const subscribe = firestore()
    .collection('champion')
    .onSnapshot({
      error: (e) => console.error(e),
      next: (querySnapshot) => {
        const data = querySnapshot.docs.map(doc => {
          return {
            doc_id: doc.id,
          ...doc.data()
          }
        }) as OldChampionProps[]
        setOldChampion(data[0])
      },
    }) 
    return () => subscribe()
  };

  //==> RECUPERA O PERFIL DO NOVO CAMPEÃO
  useEffect(() => {
    findChampionProfile();
  }, [name]);

  const findChampionProfile = () => {
    const subscribe = firestore()
    .collection('players')
    .where('name', '==', name)
    .onSnapshot({
      error: (e) => console.error(e),
      next: (querySnapshot) => {
        const data = querySnapshot.docs.map(doc => {
          return {
            doc_id: doc.id,
            ...doc.data()
          };
        }) as unknown as UserDTO[]
        setNewChampion(data[0])
      },
    }) 
    return () => subscribe()
  };

  //==> SALVA O NOVO CAMPEÃO
  function addNewChampion() {
    firestore()
    .collection('champion')
    .doc('newChampion')
    .set({
      name,
      season,
      profile: newChampion.profile,
      avatar: newChampion.avatar,
      id: newChampion.doc_id,
      email: newChampion.email
    })
    .then(() => {
      Alert.alert('Novo campeão salvo com sucesso!')
    })
    .catch((error) => console.error(error));
  };

  function handleAddNewChampion() {
    addNewChampion()
    setModalVisible(!modalVisible)
  };

  return (
    <Container>
      <Header
        title='New Champion'
        text={`Final da Temporada ${oldChampion.season + 1}`}
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
          <Input 
            placeholder='Season'
            keyboardType='numeric'
            onChangeText={(value) => setSeason(Number(value))}
          />
          <Button 
            title='Novo PSOP Champion'
            onPress={() => setModalVisible(true)}
          />
        </Content>
      </KeyboardAvoidingView>

      <ModalComponent
        title={`${name} é o novo PSOP Champion!`}
        text={`Temporada ${season}`}
        modalVisible={modalVisible}
        greenButtonText={`${name} CHAMPION`}
        redButtonText='Cancelar'
        onPressGreenButton={handleAddNewChampion}
        onPressRedButton={() => setModalVisible(!modalVisible)}
      />
    </Container>
  );
};