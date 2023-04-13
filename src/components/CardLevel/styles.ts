import styled, { css } from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";
import { RFValue } from "react-native-responsive-fontsize";

type Props = {
  power: boolean;
};

type PercentProps = {
  percent: number;
};

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  height: 70px;
  margin: 5px;
`;

export const PlayerContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 74%;
  margin: 0 3px;
  height: 70px;
  align-items: center;
  border-radius: 5px;
  ${({ theme }) => css`
    border: 1px solid ${theme.COLORS.black};
    background: ${theme.COLORS.gray_700};
  `};
`;

export const NameContainer = styled.View`
  height: 65px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  ${({ theme }) => css`
    background: ${theme.COLORS.gray_700};
  `};
`;

export const Name = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.gray_100};
    font-size: ${theme.FONT_SIZE.MD};
    font-family: ${theme.FONT_FAMILY.medium};
  `};
`;

export const PercentContainer = styled.View`
  width: 40px;
  height: 65px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  ${({ theme }) => css`
    background: ${theme.COLORS.gray_700};
  `};
`;

export const PercentText = styled.Text<PercentProps>`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.MD};
    font-family: ${theme.FONT_FAMILY.medium};
  `};

  ${({ percent, theme }) =>
    percent >= 50 &&
    css`
      color: ${theme.COLORS.green_500};
    `};

  ${({ percent, theme }) =>
    percent < 50 &&
    percent >= 40 &&
    css`
      color: ${theme.COLORS.gold};
    `};

  ${({ percent, theme }) =>
    percent < 40 &&
    css`
      color: ${theme.COLORS.red_200};
    `};
`;

export const PowerContainer = styled.View`
  width: 24%;
  height: 70px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  ${({ theme }) => css`
    border: 1px solid ${theme.COLORS.black};
    background: ${theme.COLORS.gray_700};
  `};
`;

export const Icon = styled(MaterialIcons).attrs<Props>(({ theme, power }) => ({
  size: 16,
  color: power ? theme.COLORS.gold : theme.COLORS.gray_600,
}))``;

export const ImageContent = styled.View`
  justify-content: flex-start;
`;

export const ImageProfileAndAvatar = styled.Image`
  width: ${RFValue(70)}px;
  height: ${RFValue(70)}px;
  border-radius: 5px;
`;
