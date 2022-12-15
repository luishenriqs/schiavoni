import React from "react";
import { FlatList, KeyboardAvoidingView } from "react-native";
import { useAuth } from '@hooks/useAuth';
import { Header } from '@components/Header';
import { CardPlayers } from "@components/CardPlayers";
import { LabelPlayers } from "@components/LabelPlayers";
import TeamBo from '@assets/teams/teamBo.svg';
import TeamDu from '@assets/teams/teamDu.svg';
import TeamDiego from '@assets/teams/teamDiego.svg';
import TeamFilipe from '@assets/teams/teamFilipe.svg';
import TeamLeoCriado from '@assets/teams/teamLeoCriado.svg';
import TeamLuisao from '@assets/teams/teamLuisao.svg';
import TeamPaulinho from '@assets/teams/teamPaulinho.svg';
import TeamRoger from '@assets/teams/teamRoger.svg';
import TeamLeandro from '@assets/teams/teamLeandro.svg';
import TeamMarcio from '@assets/psop/PSOPLogo.svg';
import TeamEdnelson from '@assets/psop/PSOPLogo.svg';
import {
  Container, 
  Content, 
  Title,
} from './styles';

const anonymousURL = 'https://firebasestorage.googleapis.com/v0/b/schiavoni-8efc7.appspot.com/o/ProfileImage%2FProfile_Image_Anonymous%20Player.jpeg?alt=media&token=f3f5e53d-372a-43b4-a0b7-7a7db5462576';
const season = new Date().getFullYear();

// ***********[MOCK]***********
const playersInfo = {
  weeksInTheLead: 3,
  players: [
    {
      id: '2',
      name: 'Leandro Jácomo',
      img: TeamLeandro,
      power: 5
    },
    {
      id: '8',
      name: 'Dr. Bó',
      img: TeamBo,
      power: 3
    },
    {
      id: '4',
      name: 'Diego Souza',
      img: TeamDiego,
      power: 3
    },
    {
      id: '3',
      name: 'Dú Schiavoni',
      img: TeamDu,
      power: 4
    },
    {
      id: '5',
      name: 'Roger Prata',
      img: TeamRoger,
      power: 3
    },
    {
      id: '11',
      name: 'Ednelson',
      img: TeamEdnelson,
      power: 2
    },
    {
      id: '6',
      name: 'Filipe Lobanco',
      img: TeamFilipe,
      power: 3
    },
    {
      id: '1',
      name: 'Luisão',
      img: TeamLuisao,
      power: 1
    },
    {
      id: '7',
      name: 'Paulinho Coelho',
      img: TeamPaulinho,
      power: 2
    },
    {
      id: '10',
      name: 'Márcio Silva',
      img: TeamMarcio,
      power: 5
    },
    {
      id: '9',
      name: 'Léo Criado',
      img: TeamLeoCriado,
      power: 0
    }
  ]
};
// ****************************

export function Players({navigation}: {navigation: any}) {
  const { user } = useAuth();
  
  return (
    <KeyboardAvoidingView style={{flex: 1}} enabled>

<Container>
      <Header
        title='Players'
        text={`${season}`}
        picture={user.profile ? user.profile : anonymousURL}
        headerSize={'small'}
        onPress={() => navigation.openDrawer()}
      />
      <Content>
        <Title>Only legends play here!</Title>
        <LabelPlayers />
        <FlatList
          data={playersInfo.players}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <CardPlayers 
              svg={item.img}
              power={item.power}
              name={item.name}
            />
          )}
        />
      </Content>
    </Container>
    </KeyboardAvoidingView>
  );
};