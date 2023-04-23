import { Image } from "react-native";
import styled, { css } from "styled-components/native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { RFPercentage } from "react-native-responsive-fontsize";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  flex: 1;
  width: 100%;
  background: ${({ theme }) => theme.COLORS.gray_600};
`;

export const Content = styled.View`
  flex: 1;
  width: 100%;
  height: ${getStatusBarHeight() + RFPercentage(9)}px;
  align-items: center;
  justify-content: flex-start;
  padding: 25px 8px 10px;
`;

export const Title = styled.Text`
  margin-bottom: 20px;
  ${({ theme }) => css`
    color: ${theme.COLORS.gold};
    font-size: ${theme.FONT_SIZE.XXL};
    font-family: ${theme.FONT_FAMILY.medium};
  `};
`;

export const Imagem = styled(Image)`
  width: ${RFValue(130)}px;
  height: ${RFValue(130)}px;
  margin: -65px 10px 0;
  align-self: center;
  border-radius: 8px;
  margin-bottom: 5px;
`;
