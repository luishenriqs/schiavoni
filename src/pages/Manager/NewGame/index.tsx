import React, { useState, useEffect } from 'react';
import { Header } from '@components/Header';
import { Alert, KeyboardAvoidingView, Platform } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { format } from 'date-fns';
import RNPickerSelect from 'react-native-picker-select';
import { useTheme } from 'styled-components';
import { useAllPlayers } from '@hooks/useAllPlayers';
import { Input } from '@components/Input';
import { Button } from '@components/Button';
import { PsopImage } from '@components/PsopImage';
import ModalComponent from '@components/ModalComponent';
import { ChampionDTO } from '@dtos/ChampionDTO';
import { SquadOfPlayersDTO } from '@dtos/UserDTO';
import { getPlayersNames } from '@services/playersServices';
import { Container, Content } from './styles';

export function NewGame({navigation}: {navigation: any}) {
  const theme = useTheme();
  const { allPlayers } = useAllPlayers();
  const [squad, setSquad] = useState<SquadOfPlayersDTO[]>([] as SquadOfPlayersDTO[]);
  const [currentSeason, setCurrentSeason] = useState(0);
  const [game, setGame] = useState('');
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getCurrentSeason();
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

  const positionsPlaceholder = {
    label: 'Selecione uma posição:',
    value: null,
  };

  //==> POSIÇÕES POSSÍVEIS PARA O SELECT
  const positions = [
    { label: '1 - Primeiro Colocado', value: '1' },
    { label: '2 - Segundo Colocado', value: '2' },
    { label: '3 - Terceiro Colocado', value: '3' },
    { label: '4 - Quarto Colocado', value: '4' },
    { label: '5 - Quinto Colocado', value: '5' },
    { label: '6 - Sexto Colocado', value: '6' },
    { label: '7 - Sétimo Colocado', value: '7' },
    { label: '8 - Oitavo Colocado', value: '8' },
    { label: '9 - Nono Colocado', value: '9' },
    { label: '10 - Décimo Colocado', value: '10' }
  ];

  //==> RECUPERA NÚMERO DA ÚLTIMA TEMPORADA
  const getCurrentSeason = async () => {
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
        }) as ChampionDTO[]
        data[0].season 
          ? setCurrentSeason(data[0].season + 1)
          : setCurrentSeason(1);
      },
    })
    return () => subscribe()
  };

  //==> REGISTRA UM NOVO RESULTADO INDIVIDUAL
  async function handleAddResult() {
    let points = 0;
    switch (Number(position)) {
      case 1:
        points = 25;
        break;
      case 2:
        points = 18;
        break;
      case 3:
        points = 15;
        break;
      case 4:
        points = 12;
        break;
      case 5:
        points = 10;
        break;
      case 6:
        points = 8;
        break;
      case 7:
        points = 6;
        break;
      case 8:
        points = 4;
        break;
      case 9:
        points = 2;
        break;
      case 10:
        points = 1;
        break;
    }
    if (!currentSeason || !game || !name || !position || !points) {
      Alert.alert('Preencha todos os campos!')
    } else {
      firestore()
      .collection('game_result')
      .doc('Game ' + new Date())
      .set({
        season: currentSeason,
        game: Number(game),
        name,
        position: Number(position),
        points,
        date: format(new Date(), 'dd/MM/yyyy'),
      })
      .then(() => {
        Alert.alert('Resultado adicionado com sucesso!')
        setName('')
        setPosition('')
        setModalVisible(!modalVisible)
      })
      .catch((error) => console.error(error))
  
      firestore()
      .collection('current_season')
      .doc('currentData')
      .set({
        season: currentSeason,
        game: Number(game),
      })
      .catch((error) => console.error(error))
    }
  };  

  return (
    <Container>
      <Header
        title='New Game'
        text={`${currentSeason}º Temporada`}
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
            placeholder='Digite o número da etapa'
            keyboardType='numeric'
            onChangeText={(value) => setGame(value)}
            value={String(game)}
          />
          <RNPickerSelect
            placeholder={playersPlaceholder}
            onValueChange={(value) => setName(value)}
            style={pickerSelectStyles}
            items={squad}
            value={name}
          />
          <RNPickerSelect
            placeholder={positionsPlaceholder}
            onValueChange={(value) => setPosition(value)}
            style={pickerSelectStyles}
            items={positions}
            value={position}
          />
          <Button 
            title='Enviar'
            onPress={() => setModalVisible(!modalVisible)}
          />
        </Content>
      </KeyboardAvoidingView>

      <ModalComponent
        title={`Novo Resultado`}
        text={`Temporada: ${currentSeason}`}
        text2={`Etapa: ${game}`}
        text3={`Player: ${name}`}
        text4={`Posição: ${position}`}
        modalVisible={modalVisible}
        greenButtonText={`Confirmar`}
        redButtonText='Cancelar'
        onPressGreenButton={handleAddResult}
        onPressRedButton={() => setModalVisible(!modalVisible)}
      />
    </Container>
  );
};