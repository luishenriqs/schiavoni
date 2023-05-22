import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import RNPickerSelect from 'react-native-picker-select';
import { useTheme } from 'styled-components';
import { useAllPlayers } from '@hooks/useAllPlayers';
import { getPlayersNames } from '@services/playersServices';
import { Header } from '@components/Header';
import { PsopImage } from '@components/PsopImage';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import ModalComponent from '@components/ModalComponent';
import { SquadOfPlayersDTO, UserDTO } from '@dtos/UserDTO';
import {
  Container, 
  Content
} from './styles';

export function NewHall({navigation}: {navigation: any}) {
  const theme = useTheme();
  const { allPlayers } = useAllPlayers();

  const [name, setName] = useState('');
  const [season, setSeason] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [squad, setSquad] = useState<SquadOfPlayersDTO[]>([] as SquadOfPlayersDTO[]);

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

    useEffect(() => {
      if (allPlayers.length === 0) {
        getAllPlayers();
      } else {
        loadSquadOfPlayers(allPlayers);
      };
    }, []);

    //==> ATUALIZA TODOS OS JOGADORES NO CONTEXTO SE VAZIO
    const getAllPlayers = () => {
      const subscribe: any = firestore()
      .collection('players')
      .onSnapshot({
        error: (e) => console.error(e),
        next: (querySnapshot) => {
          const data = querySnapshot.docs.map(doc => {
            return {
              doc_id: doc.id,
            ...doc.data()
            }
          }) as UserDTO[]
            loadSquadOfPlayers(data);
        },
      }) 
      return () => subscribe();
    };

    //==> PLAYERS POSSÍVEIS PARA O SELECT
    const loadSquadOfPlayers = (allPlayers: UserDTO[]) => {
      const squadOfPlayers = getPlayersNames(allPlayers);
      squadOfPlayers && setSquad(squadOfPlayers);
    };

    //==> HANDLE CREATE
    const handleCreate = () => {
      createHallOfChampions();
      setModalVisible(!modalVisible);
    };

    //==> CRIA NOVO PLAYER NO HALL OF CHAMPION FIRESTORE

    const createHallOfChampions = () => {
      const hallOfChampionData = {
        player: name,
        season: Number(season),
      };

      firestore()
      .collection('hall_of_champions')
      .doc(`Season ${season}`)
      .set(hallOfChampionData)
      .then(() => {
        setModalVisible(!modalVisible);
        Alert.alert(`Champion ${name}, Season ${season} Sucesso!`);
        setName('');
        setSeason('');
      })
      .catch((error) => console.error(error))
    };

  return (
    <Container>
      <Header
        title='New Hall Champion'
        text='Salve um novo campeão'
        headerSize={'big'}
        onPress={() => navigation.openDrawer()}
      />
      <PsopImage />
      <Content>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
        >
          <RNPickerSelect
            placeholder={squad && playersPlaceholder}
            onValueChange={(value) => setName(value)}
            style={pickerSelectStyles}
            items={squad}
            value={name}
          />
          <Input 
            placeholder='Nome'
            autoCorrect={false}
            onChangeText={(value) => setName(value)}
            value={name}
          />
          <Input 
            placeholder='Temporada'
            autoCorrect={false}
            keyboardType='numeric'
            onChangeText={(value) => setSeason(value)}
            value={season}
          />

          <Button 
            title='Champion Hall'
            onPress={() => setModalVisible(!modalVisible)}
          />
        </KeyboardAvoidingView>
      </Content>

      <ModalComponent
        title={`Confirmar!`}
        text={`Champion ${name}, Season ${season}`}
        modalVisible={modalVisible}
        greenButtonText={`Confirmar`}
        redButtonText='Cancelar'
        onPressGreenButton={handleCreate}
        onPressRedButton={() => setModalVisible(!modalVisible)}
      />
    </Container>
  );
};