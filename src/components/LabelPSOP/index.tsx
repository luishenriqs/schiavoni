import React from 'react';
import { LabelContainer, LabelPoints, LabelPlayer, LabelText } from './styles';

export function LabelPSOP() {
  return (
    <LabelContainer>
      <LabelPoints>
        <LabelText>Posição</LabelText>
      </LabelPoints>
      <LabelPlayer>
        <LabelText>Jogador</LabelText>
      </LabelPlayer>
      <LabelPoints>
        <LabelText>Pontos</LabelText>
      </LabelPoints>
    </LabelContainer>
  );
};
