import React from "react";
import { FlatList, KeyboardAvoidingView } from "react-native";
import { SvgProps } from 'react-native-svg';
import { Header } from '@components/Header';
import { LeaderCard } from '@components/LeaderCard';
import { CardRanking }from '@components/CardRanking';
import { LabelPSOP } from "@components/LabelPSOP";
import PSOPLogo from '@assets/psop/PSOPLogo.svg';
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
  LabelContainer,
} from './styles';

interface IRankingProps {
  id: string,
  position: number;
  name: string;
  points: number;
  img: React.FC<SvgProps>;
};

enum Game {
  'Após a primeira etapa' = 1,
  'Após a segunda etapa' = 2,
  'Após a terceira etapa' = 3,
  'Após a quarta etapa' = 4,
  'Após a quinta etapa' = 5,
  'Após a sexta etapa' = 6,
  'Após a sétima etapa' = 7,
  'Após a oitava etapa' = 9,
};

enum WeeksLead {
  '1º semana na liderança' = 1,
  '2º semana na liderança' = 2,
  '3º semana na liderança' = 3,
  '4º semana na liderança' = 4,
  '5º semana na liderança' = 5,
  '6º semana na liderança' = 6,
  '7º semana na liderança' = 7,
  '8º semana na liderança' = 8,
};

// ***********[MOCK]***********
const ranking = {
  game: 5,
  weeksInTheLead: 3,
  rankingList: [
    {
      id: '9',
      position: 9,
      name: 'Léo Criado',
      points: 41,
      img: TeamLeoCriado,
    },
    {
      id: '2',
      position: 7,
      name: 'Leandro Jácomo',
      points: 52,
      img: TeamLeandro,
    },
    {
      id: '8',
      position: 8,
      name: 'Dr. Bó',
      points: 48,
      img: TeamBo,
    },
    {
      id: '4',
      position: 3,
      name: 'Diego Souza',
      points: 73,
      img: TeamDiego,
    },
    {
      id: '3',
      position: 2,
      name: 'Dú Schiavoni',
      points: 86,
      img: TeamDu,
    },
    {
      id: '5',
      position: 5,
      name: 'Roger Prata',
      points: 69,
      img: TeamRoger,
    },
    {
      id: '11',
      position: 11,
      name: 'Ednelson',
      points: 30,
      img: TeamEdnelson,
    },
    {
      id: '6',
      position: 6,
      name: 'Filipe Lobanco',
      points: 66,
      img: TeamFilipe,
    },
    {
      id: '1',
      position: 1,
      name: 'Luisão',
      points: 87,
      img: TeamLuisao,
    },
    {
      id: '7',
      position: 4,
      name: 'Paulinho Coelho',
      points: 71,
      img: TeamPaulinho,
    },
    {
      id: '10',
      position: 10,
      name: 'Márcio Silva',
      points: 31,
      img: TeamMarcio,
    },
  ]
};
// ****************************

export function PSOP({navigation}: {navigation: any}) {

/* ****************** [ORDERING RANKING LIST] *********************** */
  // First: ordering the values;
  const disordered:number[] = [];
  for (var i = 0; i < ranking.rankingList.length; i++) {
      disordered.push(ranking.rankingList[i].position)
  }

  const orderedValue = disordered.sort(order);
  function order(a: number, b: number) {
      return b - a;
  };

  orderedValue.reverse()

  // Second: ordering ranking list array;
  const orderedRankingList: IRankingProps[] = [] 
  for (var i = 0; i < ranking.rankingList.length; i++) {
      const ordered = ranking.rankingList.filter(
          (ranking: IRankingProps) => Number(
              ranking.position) === orderedValue[i]
          );
      orderedRankingList.push(ordered[0]);
  }

  // *******[LEADER IMAGE]*******
  // Initial image value: PSOPLogo;
  let Leader: React.FC<SvgProps> = PSOPLogo;

  if (orderedRankingList[0].name) {
    Leader = orderedRankingList[0].img;
  }
/* ********************************************************************/

  return (
    <KeyboardAvoidingView style={{flex: 1}} enabled>
      <Container>
        <Header
          title='PSOP'
          text='Patos Series Of Poker'
          // text={Game[ranking.game]}
          headerSize={'big'}
          onPress={() => navigation.openDrawer()}
        />
        <Content>
          <LeaderCard 
            svg={Leader}
            title='LÍDER:'
            leadersName={orderedRankingList[0].name}
            weeks={WeeksLead[ranking.weeksInTheLead]}
          />
          <LabelPSOP />

          <FlatList
            data={orderedRankingList}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <CardRanking 
                svg={item.img}
                position={`${item.position} º`}
                name={item.name}
                points={item.points}
              />
            )}
          />
        </Content>
      </Container>
    </KeyboardAvoidingView>

  );
};
