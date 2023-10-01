import { Image } from "react-native";
import styled, { css } from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export const Container = styled.View`
  flex: 1;
  width: 100%;
  background: ${({ theme }) => theme.COLORS.black};
`;

export const Imagem = styled(Image)`
  flex: 1;
  width: 100%;
  align-self: center;
  border-radius: 8px;
`;

export const StatisticsHeader = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Content = styled.ScrollView`
  flex: 1;
  width: 100%;
  padding: 25px 25px 10px;
`;

export const Title = styled.Text`
  align-self: center;
  ${({ theme }) => css`
    color: ${theme.COLORS.gray_100};
    font-size: ${theme.FONT_SIZE.XL};
    font-family: ${theme.FONT_FAMILY.medium};
  `};
`;

export const Empty = styled(TouchableOpacity)`
  width: 40px;
  height: 40px;
`;

export const BackButton = styled(TouchableOpacity)`
  width: 40px;
  height: 40px;
  justify-content: center;
`;

export const Icon = styled(MaterialIcons)`
  align-self: center;
  justify-self: center;
  color: ${({ theme }) => theme.COLORS.gray_100};
`;

export const ButtonsContainer = styled.View`
  height: 30px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 8px 6px;
`;

export const Columns = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Stats = styled.View`
  margin-top: 15px;
  justify-content: center;
`;

export const Positions = styled.View`
  margin: 15px 0px;
  justify-content: center;
  align-items: center;
`;

export const Text = styled.Text`
  margin-bottom: 5px;
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.LG};
    font-family: ${theme.FONT_FAMILY.bold};
    color: ${theme.COLORS.white};
  `};
`;

export const GreenText = styled.Text`
  margin-bottom: 5px;
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.MD};
    font-family: ${theme.FONT_FAMILY.regular};
    color: ${theme.COLORS.green_500};
  `};
`;

export const RedText = styled.Text`
  margin-bottom: 5px;
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.MD};
    font-family: ${theme.FONT_FAMILY.regular};
    color: ${theme.COLORS.red_200};
  `};
`;

export const YellowText = styled.Text`
  margin-bottom: 5px;
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.MD};
    font-family: ${theme.FONT_FAMILY.regular};
    color: ${theme.COLORS.gold};
  `};
`;

export const WarningContainer = styled.View`
  flex: 1;
  height: 250px;
  justify-content: center;
  align-items: center;
`;

export const Warning = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.XML};
    font-family: ${theme.FONT_FAMILY.bold};
    color: ${theme.COLORS.red_700};
  `};
`;
