import styled, { css } from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";

type Props = {
  power: boolean;
};

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  height: 70px;
  margin: 5px;
`;

export const NameContainer = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  width: 68%;
  margin: 0 3px;
  height: 70px;
  align-items: center;
  border-radius: 5px;
  ${({ theme }) => css`
    border: 1px solid ${theme.COLORS.black};
    background: ${theme.COLORS.gray_700};
  `};
`;

export const PowerContainer = styled.View`
  width: 30%;
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

export const Name = styled.Text`
  margin-left: 12px;
  ${({ theme }) => css`
    color: ${theme.COLORS.gray_100};
    font-size: ${theme.FONT_SIZE.XL};
    font-family: ${theme.FONT_FAMILY.medium};
  `};
`;

export const Icon = styled(MaterialIcons).attrs<Props>(({ theme, power }) => ({
  size: 16,
  color: power ? theme.COLORS.gold : theme.COLORS.gray_600,
}))``;
