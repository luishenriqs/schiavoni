import styled, { css } from "styled-components/native";
import { getBottomSpace } from "react-native-iphone-x-helper";

export const Container = styled.ScrollView.attrs({
  ShowsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace() + 48,
  },
})`
  flex: 1;
  width: 100%;
  background: ${({ theme }) => theme.COLORS.gray_600};
`;

export const Content = styled.View`
  padding: 25px 0;
  align-items: center;
`;

export const Title = styled.Text`
  margin-bottom: 25px;
  ${({ theme }) => css`
    color: ${theme.COLORS.gray_100};
    font-size: ${theme.FONT_SIZE.LG};
    font-family: ${theme.FONT_FAMILY.medium};
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
  width: 120px;
  height: 60px;
  background-color: ${({ theme }) => theme.COLORS.green_500};
  margin-top: 15px;
  margin-right: 15px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
`;

export const ModalButtonCancel = styled.TouchableOpacity`
  width: 120px;
  height: 60px;
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
