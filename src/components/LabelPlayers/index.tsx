import React from 'react';
import { LabelContainer, LabelPlayer, LabelPower, LabelText } from './styles';

export function LabelPlayers() {
  return (
    <LabelContainer>
      <LabelPlayer>
        <LabelText>Jogador / Aproveitamento de pontos</LabelText>
      </LabelPlayer>
      <LabelPower>
        <LabelText>Força</LabelText>
      </ LabelPower>
    </LabelContainer>
  );
};
