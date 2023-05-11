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

export const BackButton = styled(TouchableOpacity)`
  width: 40px;
  height: 40px;
  align-self: flex-end;
  margin: 10px 10px 0 0;
`;

export const Icon = styled(MaterialIcons)`
  align-self: center;
  justify-self: center;
  color: ${({ theme }) => theme.COLORS.gray_200};
`;

export const Content = styled.ScrollView`
  flex: 1;
  width: 100%;
  padding: 0px 25px 10px;
  margin-top: -25px;
`;

export const Title = styled.Text`
  margin: 20px 0 10px;
  align-self: center;
  ${({ theme }) => css`
    color: ${theme.COLORS.gold};
    font-size: ${theme.FONT_SIZE.XXL};
    font-family: ${theme.FONT_FAMILY.bold};
  `};
`;

export const Text = styled.Text`
  margin-top: 5px;
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.XL};
    font-family: ${theme.FONT_FAMILY.regular};
    color: ${theme.COLORS.white};
  `};
`;
