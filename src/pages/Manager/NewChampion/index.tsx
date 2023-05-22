import React, { useState, useEffect } from 'react';
import { KeyboardAvoidingView, Platform, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import RNPickerSelect from 'react-native-picker-select';
import { useTheme } from 'styled-components';
import { useAllPlayers } from '@hooks/useAllPlayers';
import { useChampion } from '@hooks/useChampion';
import { Header } from '@components/Header';
import { Button } from '@components/Button';
import { PsopImage } from '@components/PsopImage';
import ModalComponent from '@components/ModalComponent';
import { getPlayersNames } from '@services/playersServices';
import { UserDTO, SquadOfPlayersDTO } from '@dtos/UserDTO';
import { GameDTO } from '@dtos/GameDTO';
import { 
  Container,
  Content,
  Title
} from './styles';

export function NewChampion({navigation}: {navigation: any}) {
  const theme = useTheme();
  const { allPlayers, setAllPlayersContext } = useAllPlayers();
  const { currentSeason } = useChampion();

  const [name, setName] = useState('');
  const [squad, setSquad] = useState<SquadOfPlayersDTO[]>([] as SquadOfPlayersDTO[]);
  const [newChampion, setNewChampion] = useState<UserDTO>({} as UserDTO);
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

  //==> SALVA O NOVO CAMPEÃO
  const handleAddNewChampion = () => {
    if (!name) {
      Alert.alert('Selecione o nome do novo campeão');
    } else {
      setModalVisible(!modalVisible);
      
      firestore()
      .collection('champion')
      .doc('newChampion')
      .set({
        name,
        season: currentSeason.season,
        profile: newChampion.profile,
        avatar: newChampion.avatar,
        id: newChampion.doc_id,
        email: newChampion.email
      })
      .then(() => {
        Alert.alert('Novo campeão salvo com sucesso!');
        setName('');
        setNewCurrentSeason();
      })
      .catch((error) => console.error(error));

      const hallOfChampionData = {
        player: name,
        season: Number(currentSeason.season),
      };

      firestore()
      .collection('hall_of_champions')
      .doc(`Season ${currentSeason.season}`)
      .set(hallOfChampionData)
      .catch((error) => console.error(error))
    }
  };

  //==> ATUALIZA CURRENT SEASON
  //==> CHAMA GET ALL GAMES
  const setNewCurrentSeason = () => {
    firestore()
      .collection('current_season')
      .doc('currentData')
      .set({
        season: currentSeason.season + 1,
        game: 0,
      })
      .then(() => {
        getAllGames();
      })
      .catch((error) => console.error(error))
  };

  //==> BUSCA TODOS OS RESULTADOS PARA LIMPEZA
  //==> CHAMA REMOVE OLD SEASON
  const getAllGames = () => {
    const subscribe = firestore()
    .collection('game_result')
    .onSnapshot({
      error: (e) => console.error(e),
      next: (querySnapshot) => {
        const data = querySnapshot.docs.map(doc => {
          return {
            doc_id: doc.id,
          ...doc.data()
          }
        }) as GameDTO[]
        removeOldSeason(data);
      },
    })
    return () => subscribe();
  };

  //==> MANTEM APENAS OS RESULTADOS DAS ÚLTIMAS 3 TEMPORADAS
  const removeOldSeason = (allGames: GameDTO[]) => {
    const gamesFromOldSeasons: GameDTO[] = allGames.filter((item) => {
      if (item.season < currentSeason.season - 2) {
        return item;
      }
    });

    for(let i = 0; i < gamesFromOldSeasons.length; i++) {
      firestore()
      .collection('game_result')
        .doc(gamesFromOldSeasons[i].doc_id)
        .delete()
        .catch(error => console.error(error))
    };
  };

  const openModal = () => {
    if (!name) {
      Alert.alert('Selecione o nome do novo campeão');
    } else {
      setModalVisible(!modalVisible);
    }
  };

  return (
    <Container>
      <Header
        title='New Champion'
        text={`Final da ${currentSeason.season}º Temporada`}
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
            onPress={openModal}
          />
        </KeyboardAvoidingView>
      </Content>

      <ModalComponent
        title={`${name} é o novo PSOP Champion!`}
        text={`${currentSeason.season}º Temporada`}
        modalVisible={modalVisible}
        greenButtonText={`${name} CHAMPION`}
        redButtonText='Cancelar'
        onPressGreenButton={handleAddNewChampion}
        onPressRedButton={() => setModalVisible(!modalVisible)}
      />
    </Container>
  );
};