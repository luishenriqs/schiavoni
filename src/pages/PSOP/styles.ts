import { Image } from "react-native";
import styled, { css } from "styled-components/native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { RFPercentage } from "react-native-responsive-fontsize";

export const Container = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  background: ${({ theme }) => theme.COLORS.gray_600};
`;

export const Content = styled.View`
  flex: 1;
  width: 100%;
  height: ${getStatusBarHeight() + RFPercentage(9)}px;
  align-items: center;
  justify-content: center;
  padding: 25px 8px 0;
`;

export const Title = styled.Text`
  align-self: center;
  margin-top: 15px;
  ${({ theme }) => css`
    color: ${theme.COLORS.gray_100};
    font-size: ${theme.FONT_SIZE.XML};
    font-family: ${theme.FONT_FAMILY.bold};
  `};
`;

export const Text = styled.Text`
  align-self: center;
  margin-bottom: 5px;
  ${({ theme }) => css`
    color: ${theme.COLORS.gray_100};
    font-size: ${theme.FONT_SIZE.XM};
    font-family: ${theme.FONT_FAMILY.medium};
  `};
`;

export const Imagem = styled(Image)`
  align-self: center;
  width: 200px;
  height: 200px;
  border-radius: 8px;
`;