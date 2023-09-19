import styled, { css } from "styled-components/native";

export const ModalContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-top: 22px;
`;

export const ModalView = styled.View`
  margin: 20px;
  background-color: ${({ theme }) => theme.COLORS.white};
  border-radius: 15px;
  padding: 30px;
  align-items: center;
`;

export const ModalTitle = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.gray_800};
    font-size: ${theme.FONT_SIZE.XXM};
    font-family: ${theme.FONT_FAMILY.bold};
  `};
  text-align: center;
  margin-bottom: 8px;
`;

export const ModalText = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.gray_800};
    font-size: ${theme.FONT_SIZE.XM};
    font-family: ${theme.FONT_FAMILY.medium};
  `};
  text-align: center;
  margin-bottom: 8px;
`;

export const ModalButtonContainer = styled.View`
  flex-direction: row;
`;

export const ModalGreenButton = styled.TouchableOpacity`
  width: 100px;
  height: 40px;
  background-color: ${({ theme }) => theme.COLORS.green_500};
  margin-top: 15px;
  margin-right: 15px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
`;

export const ModalRedButton = styled.TouchableOpacity`
  width: 100px;
  height: 40px;
  background-color: ${({ theme }) => theme.COLORS.red_400};
  margin-top: 15px;
  margin-right: 15px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
`;

export const ModalButtonText = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.white};
    font-size: ${theme.FONT_SIZE.MD};
    font-family: ${theme.FONT_FAMILY.bold};
  `};
  text-align: center;
`;
