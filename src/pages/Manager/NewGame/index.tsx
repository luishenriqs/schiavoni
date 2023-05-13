import React, { useState, useEffect } from 'react';
import { Header } from '@components/Header';
import { Alert, KeyboardAvoidingView, Platform } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { format } from 'date-fns';
import RNPickerSelect from 'react-native-picker-select';
import { useTheme } from 'styled-components';
import { useAllPlayers } from '@hooks/useAllPlayers';
import { useChampion } from '@hooks/useChampion';
import { Button } from '@components/Button';
import { PsopImage } from '@components/PsopImage';
import ModalComponent from '@components/ModalComponent';
import { getPlayersNames } from '@services/playersServices';
import { SquadOfPlayersDTO, UserDTO } from '@dtos/UserDTO';
import { SeasonDTO } from '@dtos/GameDTO'
import { Container, Content, Title } from './styles';

export function NewGame({navigation}: {navigation: any}) {
  const theme = useTheme();
  const { allPlayers, setAllPlayersContext } = useAllPlayers();
  const { champion, currentSeason, setCurrentSeasonContext } = useChampion();

  const [squad, setSquad] = useState<SquadOfPlayersDTO[]>([] as SquadOfPlayersDTO[]);
  const [game, setGame] = useState('');
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

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

  const gamePlaceholder = {
    label: 'Selecione uma etapa:',
    value: null,
  };

  const playersPlaceholder = {
    label: 'Selecione um player:',
    value: null,
  };

  const positionsPlaceholder = {
    label: 'Selecione uma posição:',
    value: null,
  };

  //==> ETAPAS POSSÍVEIS PARA O SELECT
  const games = [
    { label: 'Etapa 1', value: '1' },
    { label: 'Etapa 2', value: '2' },
    { label: 'Etapa 3', value: '3' },
    { label: 'Etapa 4', value: '4' },
    { label: 'Etapa 5', value: '5' },
    { label: 'Etapa 6', value: '6' },
    { label: 'Etapa 7', value: '7' },
    { label: 'Etapa 8', value: '8' }
  ];

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
    { label: '10 - Décimo Colocado', value: '10' },
    { label: '11 - Décimo Primeiro Colocado', value: '11' },
    { label: '12 - Décimo Segundo Colocado', value: '12' }
  ];

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
          setAllPlayersContext(data);
          loadSquadOfPlayers(data);
      },
    }) 
    return () => subscribe();
  };

  //==> PLAYERS POSSÍVEIS PARA O SELECT
  const loadSquadOfPlayers = (allPlayers: UserDTO[]) => {
    const squadOfPlayers = getPlayersNames(allPlayers);
    squadOfPlayers && setSquad(squadOfPlayers);
    if (!currentSeason.season) getCurrentSeason();
  };

  //==> RECUPERA CURRENT SEASON E PERSISTE NO CONTEXTO SE CONTEXTO VAZIO
  const getCurrentSeason = () => {
    const subscribe: any = firestore()
    .collection('current_season')
    .onSnapshot({
      error: (e) => console.error(e),
      next: (querySnapshot) => {
        const data = querySnapshot.docs.map(doc => {
          return {
            doc_id: doc.id,
          ...doc.data()
          }
        }) as SeasonDTO[]
        if (data.length === 0) {
          createCurrentSeason();
        } else {
          const season = data[0].season;
          const game = data[0].game;
          const currentSeasonData = { season, game };
          setCurrentSeasonContext(currentSeasonData);
        };
      },
    }) 
    return () => subscribe()
  };

  //==> CRIA DOC CURRENT_SEASON NO FIRESTORE CASO NÃO EXISTA
  const createCurrentSeason = () => {
    firestore()
    .collection('current_season')
    .doc('currentData')
    .set({
      season: champion.season + 1,
      game: 0,
    })
    .then(() => {
      const season = champion.season + 1;
      const game = 0;
      const currentSeasonData = { season, game };
      setCurrentSeasonContext(currentSeasonData);
    })
    .catch((error) => console.error(error))
  };

  //==> REGISTRA UM NOVO RESULTADO
  const handleAddResult = () => {
    let points = 0;
    const positionNumber = Number(position);
    switch (positionNumber) {
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
      case 11:
        points = 0;
        break;
      case 12:
        points = 0;
        break;
    }
    if (!currentSeason.season || !game || !name || !position) {
      Alert.alert('Preencha todos os campos!')
    } else {
      firestore()
      .collection('game_result')
      .doc('Game ' + new Date())
      .set({
        season: currentSeason.season,
        game: Number(game),
        name,
        position: Number(position),
        points,
        date: format(new Date(), 'dd/MM/yyyy'),
      })
      .then(() => {
        Alert.alert('Resultado adicionado com sucesso!');
        setCurrentSeason();
        setName('');
        setPosition('');
        setModalVisible(!modalVisible);
      })
      .catch((error) => console.error(error));
    }
  };

  //==> ATUALIZA GAME NO CURRENT SEASON CONTEXT
  const setCurrentSeason = () => {
    firestore()
    .collection('current_season')
    .doc('currentData')
    .update({
      game: Number(game),
    })
    .catch((error) => console.error(error))
  };

  return (
    <Container>
      <Header
        title='New Game'
        text={`${currentSeason.season}º Temporada`}
        headerSize={'big'}
        onPress={() => navigation.openDrawer()}
      />
      <PsopImage />
      <Content>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
        >
          <Title>Registre um novo resultado</Title>
          <RNPickerSelect
            placeholder={gamePlaceholder}
            onValueChange={(value) => setGame(value)}
            style={pickerSelectStyles}
            items={games}
            value={game}
          />
          <RNPickerSelect
            placeholder={squad && playersPlaceholder}
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
        </KeyboardAvoidingView>
      </Content>

      <ModalComponent
        title={`Novo Resultado`}
        text={`Temporada: ${currentSeason.season}`}
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