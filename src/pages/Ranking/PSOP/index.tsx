import React from "react";
import { FlatList, KeyboardAvoidingView } from "react-native";
import { useAuth } from '@hooks/useAuth';
import { SvgProps } from 'react-native-svg';
import { Header } from '@components/Header';
import { LeaderCard } from '@components/LeaderCard';
import { CardRanking }from '@components/CardRanking';
import { LabelPSOP } from "@components/LabelPSOP";
import TeamBo from '@assets/teams/teamBo.svg';
import TeamDu from '@assets/teams/teamDu.svg';
import TeamDiego from '@assets/teams/teamDiego.svg';
import TeamFilipe from '@assets/teams/teamFilipe.svg';
import TeamLuisao from '@assets/teams/teamLuisao.svg';
import TeamPaulinho from '@assets/teams/teamPaulinho.svg';
import TeamRoger from '@assets/teams/teamRoger.svg';
import TeamLeandro from '@assets/teams/teamLeandro.svg';
import { Container, Content } from './styles';

interface IRankingProps {
  id: string,
  position: number;
  name: string;
  points: number;
  img: React.FC<SvgProps>;
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

const anonymousURL = 'https://firebasestorage.googleapis.com/v0/b/schiavoni-8efc7.appspot.com/o/ProfileImage%2FProfile_Image_Anonymous%20Player.jpeg?alt=media&token=f3f5e53d-372a-43b4-a0b7-7a7db5462576';

// ***********[MOCK]***********
const ranking = {
  game: 5,
  weeksInTheLead: 3,
  rankingList: [
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
    }
  ]
};
// ****************************

export function PSOP({navigation}: {navigation: any}) {
  const { user } = useAuth();
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
  if (orderedRankingList[0].name) {
    let Leader = orderedRankingList[0].img;
  }
/* ********************************************************************/

  return (
    <KeyboardAvoidingView style={{flex: 1}} enabled>
      <Container>
        <Header
          title='PSOP'
          text='Patos Series Of Poker'
          picture={user.profile ? user.profile : anonymousURL}
          headerSize={'big'}
          onPress={() => navigation.openDrawer()}
        />
        <Content>
          <LeaderCard 
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
