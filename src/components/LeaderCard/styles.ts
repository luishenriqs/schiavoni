import { Image } from "react-native";
import styled, { css } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  flex-direction: row;
  height: ${RFValue(130)}px;
  border-radius: 5px;
  margin: -85px 0 10px 0;
  align-items: center;
`;

export const LeaderInfo = styled.View`
  flex: 1;
  width: ${RFValue(200)}px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin: 0 10px;
  align-items: center;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.gray_100};
    font-size: ${theme.FONT_SIZE.LG};
    font-family: ${theme.FONT_FAMILY.medium};
  `};
`;

export const LeadersName = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.gray_100};
    font-size: ${theme.FONT_SIZE.XLL};
    font-family: ${theme.FONT_FAMILY.bold};
  `};
`;

export const Text = styled.Text`
  margin-top: 5px;
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.SM};
    font-family: ${theme.FONT_FAMILY.medium};
    color: ${theme.COLORS.gold};
  `};
`;

export const Imagem = styled(Image)`
  align-self: center;
  width: 126px;
  height: 126px;
`;
