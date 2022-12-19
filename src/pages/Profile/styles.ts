import styled, { css } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.ScrollView`
  flex: 1;
  width: 100%;
  background: ${({ theme }) => theme.COLORS.gray_600};
`;

export const ImageContainer = styled.View`
  flex-direction: row;
  align-items: center;
  align-self: center;
`;

export const ImageContent = styled.View`
  justify-content: flex-start;
`;

export const LabelContainer = styled.View`
  width: 100px;
  align-self: center;
  margin: -75px 0 10px;
  border-radius: 5px;
  background: ${({ theme }) => theme.COLORS.gray_300};
`;

export const Label = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.gray_700};
    font-size: ${theme.FONT_SIZE.XL};
    font-family: ${theme.FONT_FAMILY.bold};
  `};
  align-self: center;
`;

export const ImageProfileAndAvatar = styled.Image`
  width: ${RFValue(130)}px;
  height: ${RFValue(130)}px;
  margin: 0px 10px 0;
  border-radius: 5px;
`;

export const Content = styled.View`
  align-items: center;
  justify-content: center;
  padding: 20px 15px 0;
  margin-left: 20px;
  margin-right: 20px;
`;

export const Update = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Status = styled.View`
  flex-direction: row;
  margin-bottom: 20px;
`;

export const Progress = styled.Text`
  margin-right: 25px;
  ${({ theme }) => css`
    color: ${theme.COLORS.gray_300};
    font-size: ${theme.FONT_SIZE.XL};
    font-family: ${theme.FONT_FAMILY.bold};
  `};
`;

export const Transferred = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.gray_300};
    font-size: ${theme.FONT_SIZE.MD};
    font-family: ${theme.FONT_FAMILY.regular};
  `};
`;

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

export const ModalText = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.gray_800};
    font-size: ${theme.FONT_SIZE.XL};
    font-family: ${theme.FONT_FAMILY.medium};
  `};
  text-align: center;
  margin-bottom: 8px;
`;

export const ModalButtonContainer = styled.View`
  flex-direction: row;
`;

export const ModalButtonLogin = styled.TouchableOpacity`
  width: 100px;
  height: 40px;
  background-color: ${({ theme }) => theme.COLORS.green_500};
  margin-top: 15px;
  margin-right: 15px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
`;

export const ModalButtonCancel = styled.TouchableOpacity`
  width: 100px;
  height: 40px;
  background-color: ${({ theme }) => theme.COLORS.red_400};
  margin-top: 15px;
  margin-left: 15px;
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
