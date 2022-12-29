import React from 'react';
import { Modal, ModalProps } from 'react-native';
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
};

const ModalComponent: React.FC<Props> = ({
  title, 
  text,
  text2,
  text3,
  text4,
  greenButtonText,
  redButtonText,
  modalVisible,
  onPressGreenButton,
  onPressRedButton
}: Props) => {
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

export default ModalComponent;