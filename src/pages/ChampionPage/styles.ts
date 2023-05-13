import { Image } from "react-native";
import styled, { css } from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  background: ${({ theme }) => theme.COLORS.gray_600};
`;

export const Content = styled.ScrollView`
  flex: 1;
  width: 100%;
  padding: 0 15%;
  margin-top: 25px;
`;

export const Imagem = styled(Image)`
  align-self: center;
  width: 300px;
  height: 300px;
`;

export const Title = styled.Text`
  align-self: center;
  ${({ theme }) => css`
    color: ${theme.COLORS.gray_100};
    font-size: ${theme.FONT_SIZE.MD};
    font-family: ${theme.FONT_FAMILY.bold};
  `};
`;

export const Text = styled.Text`
  align-self: center;
  ${({ theme }) => css`
    color: ${theme.COLORS.gold};
    font-size: ${theme.FONT_SIZE.XXM};
    font-family: ${theme.FONT_FAMILY.bold};
    margin-bottom: 20px;
  `};
`;
