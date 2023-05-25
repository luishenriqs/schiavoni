import { Image } from "react-native";
import styled, { css } from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

export const Container = styled.View`
  flex: 1;
  width: 100%;
  background: ${({ theme }) => theme.COLORS.gray_600};
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
  padding: 0px 25px 10px;
  margin-top: -25px;
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
  margin: 0 8px 35px;
`;

export const Stats = styled.View`
  margin-top: 15px;
`;

export const Positions = styled.View`
  margin-top: 15px;
  margin-bottom: 15px;
`;

export const Text = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.MD};
    font-family: ${theme.FONT_FAMILY.regular};
    color: ${theme.COLORS.white};
  `};
`;

export const GreenText = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.MD};
    font-family: ${theme.FONT_FAMILY.regular};
    color: ${theme.COLORS.green_500};
  `};
`;

export const RedText = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.MD};
    font-family: ${theme.FONT_FAMILY.regular};
    color: ${theme.COLORS.red_200};
  `};
`;

export const YellowText = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.MD};
    font-family: ${theme.FONT_FAMILY.regular};
    color: ${theme.COLORS.gold};
  `};
`;
