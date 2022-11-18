import styled, { css } from "styled-components/native";
import { RFPercentage } from "react-native-responsive-fontsize";

export const Header = styled.View`
  width: 100%;
  height: 55%;
  justify-content: center;
  align-items: center;
  padding-top: 90px;
`;

export const WellcomeText = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.gold};
    font-size: ${theme.FONT_SIZE.XL};
    font-family: ${theme.FONT_FAMILY.bold};
  `};
`;

export const Content = styled.View`
  width: 100%;
  height: 45%;
  margin-top: ${RFPercentage(2)}px;
  padding: 0 40px;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  margin-top: 60px;
  margin-bottom: 15px;
  ${({ theme }) => css`
    color: ${theme.COLORS.gray_600};
    font-size: ${theme.FONT_SIZE.MD};
    font-family: ${theme.FONT_FAMILY.bold};
  `};
`;
