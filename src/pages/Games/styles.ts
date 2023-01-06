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

export const SeasonBox = styled.View`
  width: 80%;
  height: 40px;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  margin-bottom: 3px;
  ${({ theme }) => css`
    border: 1px solid ${theme.COLORS.black};
    background: ${theme.COLORS.gray_900};
  `};
`;

export const Season = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.gray_100};
    font-size: ${theme.FONT_SIZE.XL};
    font-family: ${theme.FONT_FAMILY.medium};
  `};
`;
