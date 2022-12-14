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
import { getRanking } from '@services/rankingServices';
import { ChampionDTO } from '@dtos/ChampionDTO';
import { UserDTO, SquadOfPlayersDTO } from '@dtos/UserDTO';
import { GameDTO } from '@dtos/GameDTO'
import { Container, Content, Title } from './styles';

export function NewGame({navigation}: {navigation: any}) {
  const theme = useTheme();
  const { allPlayers } = useAllPlayers();
  const { setRankingContext, setGameResultContext } = useChampion();

  const [squad, setSquad] = useState<SquadOfPlayersDTO[]>([] as SquadOfPlayersDTO[]);
  const [currentSeason, setCurrentSeason] = useState(0);
  const [game, setGame] = useState('');
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    getPlayers();
    getCurrentSeason();
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

  const gamePlaceholder = {
    label: 'Selecione uma etapa:',
    value: null,
  };

  const playersPlaceholder = {
    label: 'Selecione um player:',
    value: null,
  };

  const positionsPlaceholder = {
    label: 'Selecione uma posi????o:',
    value: null,
  };

  //==> ETAPAS POSS??VEIS PARA O SELECT
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

  //==> POSI????ES POSS??VEIS PARA O SELECT
  const positions = [
    { label: '1 - Primeiro Colocado', value: '1' },
    { label: '2 - Segundo Colocado', value: '2' },
    { label: '3 - Terceiro Colocado', value: '3' },
    { label: '4 - Quarto Colocado', value: '4' },
    { label: '5 - Quinto Colocado', value: '5' },
    { label: '6 - Sexto Colocado', value: '6' },
    { label: '7 - S??timo Colocado', value: '7' },
    { label: '8 - Oitavo Colocado', value: '8' },
    { label: '9 - Nono Colocado', value: '9' },
    { label: '10 - D??cimo Colocado', value: '10' },
    { label: '11 - D??cimo Primeiro Colocado', value: '11' },
    { label: '12 - D??cimo Segundo Colocado', value: '12' }
  ];

  //==> PLAYERS POSS??VEIS PARA O SELECT
  const getPlayers = () => {
    const squadOfPlayers = getPlayersNames(allPlayers);
    squadOfPlayers && setSquad(squadOfPlayers);
  };

  //==> RECUPERA N??MERO DA ??LTIMA TEMPORADA
  const getCurrentSeason = () => {
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
  const handleAddResult = () => {
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
      case 11:
        points = 0;
        break;
      case 12:
        points = 0;
        break;
    }
    if (!currentSeason || !game || !name || !position) {
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
      .then(() => {
        const season = currentSeason;
        getGamesResultsFirestore(season, Number(game), allPlayers);
      })
      .catch((error) => console.error(error))
    }
  };  

  //==> RECUPERA JOGOS DA ATUAL TEMPORADA NO FIRESTORE
  //==> RECUPERA E PERSISTE GAME RESULTS NO CONTEXTO
  //==> PROCESSA, ATUALIZA E PERSISTE RANKING NO CONTEXTO
  const getGamesResultsFirestore = (
    currentSeason: number, 
    lastGame: number,
    allPlayers: UserDTO[]
  ) => {
    const subscribe = firestore()
    .collection('game_result')
    .where('season', '==', currentSeason)
    .onSnapshot({
      error: (e) => console.error(e),
      next: (querySnapshot) => {
        const data = querySnapshot.docs.map(doc => {
          return {
            doc_id: doc.id,
          ...doc.data()
          }
        }) as GameDTO[];
        data && setGameResultContext(data);
        const ranking = getRanking(data, lastGame, allPlayers);
        ranking && setRankingContext(ranking);
      },
    }) 
    return () => subscribe();
  };

  return (
    <Container>
      <Header
        title='New Game'
        text={`${currentSeason}?? Temporada`}
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
          <Title>Registre um novo resultado</Title>
          <RNPickerSelect
            placeholder={gamePlaceholder}
            onValueChange={(value) => setGame(value)}
            style={pickerSelectStyles}
            items={games}
            value={game}
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
        text4={`Posi????o: ${position}`}
        modalVisible={modalVisible}
        greenButtonText={`Confirmar`}
        redButtonText='Cancelar'
        onPressGreenButton={handleAddResult}
        onPressRedButton={() => setModalVisible(!modalVisible)}
      />
    </Container>
  );
};