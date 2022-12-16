import React from 'react';
import { Header } from '@components/Header';
import { PsopImage } from '@components/PsopImage';
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
  Imagem,
  Title,
  Text
} from './styles';

const mock = {
  season: '25',
  champion: 'Luisão',
  img: TeamLuisao,

}

export function ChampionPage({navigation}: {navigation: any}) {
  return (
    <Container>
      <Header
        title='The Champion'
        text={'Temporada ' + mock.season}
        headerSize={'big'}
        onPress={() => navigation.openDrawer()}
      />
      <PsopImage />
      <Content>
        <Title>The great champion</Title>
        <Text>{mock.champion}</Text>
        <Imagem 
          source={require('../../assets/teams/teamLuisao.jpg')} 
        />
      </Content>
    </Container>
  );
};