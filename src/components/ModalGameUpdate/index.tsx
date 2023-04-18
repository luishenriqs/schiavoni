import React, { useState, useEffect } from 'react';
import { Modal, ModalProps } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useTheme } from 'styled-components';
import { useAllPlayers } from '@hooks/useAllPlayers';
import { getPlayersNames } from '@services/playersServices';
import { SquadOfPlayersDTO, UserDTO } from '@dtos/UserDTO';
import {
  ModalContainer,
  ModalView,
  ModalTitle,
  ModalText,
  ModalButtonContainer,
  ModalGreenButton,
  ModalRedButton,
  ModalButtonText 
} from './styles';

type Props = ModalProps & {
  title?: string;
  text?: string;
  text2?: string;
  text3?: string;
  text4?: string;
  greenButtonText?: string;
  redButtonText?: string;
  modalVisible?: boolean;
  onPressGreenButton?(): void;
  onPressRedButton?(): void;
  callBackPlayer(value: string): void;
  callBackPosition(value: number): void;
};

export const ModalGameUpdate: React.FC<Props> = ({
  title, 
  text,
  text2,
  text3,
  text4,
  greenButtonText,
  redButtonText,
  modalVisible,
  onPressGreenButton,
  onPressRedButton,
  callBackPlayer,
  callBackPosition
}: Props) => {

  const theme = useTheme();
  const { allPlayers } = useAllPlayers();

  const [squad, setSquad] = useState<SquadOfPlayersDTO[]>([] as SquadOfPlayersDTO[]);
  const [game, setGame] = useState('');
  const [name, setName] = useState('');

  //==> SELECT STYLE
  const pickerSelectStyles = {
    inputIOS: {
      marginBottom: 10,
      backgroundColor: theme.COLORS.gray_600,
      color: theme.COLORS.white,
    },
    inputAndroid: {
      marginBottom: 10,
      backgroundColor: theme.COLORS.gray_600,
      color: theme.COLORS.white,
    },
  };

  const playersPlaceholder = {
    label: 'Selecione um player:',
    value: null,
  };

  const positionsPlaceholder = {
    label: 'Selecione uma posição:',
    value: null,
  };

  //==> PLAYERS POSSÍVEIS PARA O SELECT
  const loadSquadOfPlayers = (allPlayers: UserDTO[]) => {
    const squadOfPlayers = getPlayersNames(allPlayers);
    squadOfPlayers && setSquad(squadOfPlayers);
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
    { label: '10 - Décimo Colocado', value: '10' },
    { label: '11 - Décimo Primeiro Colocado', value: '11' },
    { label: '12 - Décimo Segundo Colocado', value: '12' }
  ];

  useEffect(() => {
    loadSquadOfPlayers(allPlayers);
  }, []);

  return (
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
      >
        <ModalContainer>
          <ModalView>
            {title &&
              <ModalTitle>{title}</ModalTitle>
            }
            {text &&
              <ModalText>{text}</ModalText>
            }
            {text2 &&
              <ModalText>{text2}</ModalText>
            }
            {text3 &&
              <ModalText>{text3}</ModalText>
            }
            {text4 &&
              <ModalText>{text4}</ModalText>
            }
            <RNPickerSelect
              placeholder={squad && playersPlaceholder}
              onValueChange={(value) => {
                callBackPlayer(value);
                setName(value);
              }}
              style={pickerSelectStyles}
              items={squad}
              value={name}
            />
            <RNPickerSelect
              placeholder={positionsPlaceholder}
              onValueChange={(value) => {
                callBackPosition(value);
                setGame(value);
              }}
              style={pickerSelectStyles}
              items={positions}
              value={game}
            />
            <ModalButtonContainer>
              {onPressGreenButton &&
                <ModalGreenButton
                  onPress={onPressGreenButton}
                >
                  <ModalButtonText>{greenButtonText}</ModalButtonText>
                </ModalGreenButton>
              }
              {onPressRedButton &&
                <ModalRedButton
                  onPress={onPressRedButton}
                >
                  <ModalButtonText>{redButtonText}</ModalButtonText>
                </ModalRedButton>
              }     
            </ModalButtonContainer>
          </ModalView>
        </ModalContainer>
      </Modal>
  );
};