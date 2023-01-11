import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import RNPickerSelect from 'react-native-picker-select';
import { useTheme } from 'styled-components';
import { useAllPlayers } from '@hooks/useAllPlayers';
import { Header } from '@components/Header';
import { Button } from '@components/Button';
import { PsopImage } from '@components/PsopImage';
import ModalComponent from '@components/ModalComponent';
import { getPlayersNames } from '@services/playersServices';
import { UserDTO } from '@dtos/userDTO';
import { SquadOfPlayersDTO } from '@dtos/UserDTO';
import { 
  Container,
  Content,
  Title
} from './styles';

type OldChampionProps = UserDTO & {
  season: number
};

export function NewChampion({navigation}: {navigation: any}) {
  const theme = useTheme();
  const { allPlayers } = useAllPlayers();
  const [name, setName] = useState('');
  const [squad, setSquad] = useState<SquadOfPlayersDTO[]>([] as SquadOfPlayersDTO[]);
  const [newChampion, setNewChampion] = useState<UserDTO>({} as UserDTO);
  const [currentSeason, setCurrentSeason] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    recoverCurrentChampion();
    getPlayers();
  }, []);

  //==> SELECT STYLE
  const pickerSelectStyles = {
    inputIOS: {
      marginBottom: 10,
      backgroundColor: theme.COLORS.gray_700,
      color: theme.COLORS.white,
    },
    inputAndroid: {
      marginBottom: 10,
      backgroundColor: theme.COLORS.gray_700,
      color: theme.COLORS.white,
    },
  };

  const playersPlaceholder = {
    label: 'Selecione um player:',
    value: null,
  };

  //==> PLAYERS POSSÍVEIS PARA O SELECT
  const getPlayers = () => {
    const squadOfPlayers = getPlayersNames(allPlayers);
    squadOfPlayers && setSquad(squadOfPlayers);
  };

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
        data[0].season 
          ? setCurrentSeason(data[0].season + 1) 
          : setCurrentSeason(1);
      },
    }) 
    return () => subscribe()
  };

  //==> RECUPERA O PERFIL DO NOVO CAMPEÃO
  useEffect(() => {
    findChampionProfile();
  }, [name]);

  //==> RECUPERA PERFIL DO NOVO CAMPEÃO
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

  //==> CONFIRMAÇÃO DE NOVO CAMPEÃO
  function handleAddNewChampion() {
    addNewChampion()
    setModalVisible(!modalVisible)
  };

  //==> SALVA O NOVO CAMPEÃO
  function addNewChampion() {
    firestore()
    .collection('champion')
    .doc('newChampion')
    .set({
      name,
      season: currentSeason,
      profile: newChampion.profile,
      avatar: newChampion.avatar,
      id: newChampion.doc_id,
      email: newChampion.email
    })
    .then(() => {
      Alert.alert('Novo campeão salvo com sucesso!');
      setName('');
    })
    .catch((error) => console.error(error));
  };

  return (
    <Container>
      <Header
        title='New Champion'
        text={`Final da ${currentSeason}º Temporada`}
        headerSize={'big'}
        onPress={() => navigation.openDrawer()}
      />
      <PsopImage />
      <Content>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
        >
          <Title>Novo Campeão do PSOP</Title>
          <RNPickerSelect
            placeholder={playersPlaceholder}
            onValueChange={(value) => setName(value)}
            style={pickerSelectStyles}
            items={squad}
            value={name}
          />
          <Button 
            title='Campeão do PSOP'
            onPress={() => setModalVisible(!modalVisible)}
          />
        </KeyboardAvoidingView>
      </Content>

      <ModalComponent
        title={`${name} é o novo PSOP Champion!`}
        text={`${currentSeason}º Temporada`}
        modalVisible={modalVisible}
        greenButtonText={`${name} CHAMPION`}
        redButtonText='Cancelar'
        onPressGreenButton={handleAddNewChampion}
        onPressRedButton={() => setModalVisible(!modalVisible)}
      />
    </Container>
  );
};