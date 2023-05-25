import { TouchableOpacity } from "react-native";
import styled, { css } from "styled-components/native";

export type ButtonTypeStyleProps =
  | "GREEN-700-BUTTON"
  | "RED-400-BUTTON"
  | "GRAY-400-BUTTON"
  | "GRAY-500-BUTTON"
  | "GRAY-900-BUTTON";

type Props = {
  type: ButtonTypeStyleProps;
  width: number;
  height: number;
  marginLeft?: number;
  marginRight?: number;
  paddingLeft?: number;
  paddingRight?: number;
};

export const Container = styled(TouchableOpacity)<Props>`
  flex: 1;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.COLORS.black};
  min-width: ${({ width }) => width}%;
  max-width: ${({ width }) => width}%;
  min-height: ${({ height }) => height}%;
  max-height: ${({ height }) => height}%;
  margin-left: ${({ marginLeft }) => marginLeft}px;
  margin-right: ${({ marginRight }) => marginRight}px;
  padding-left: ${({ paddingLeft }) => paddingLeft}px;
  padding-right: ${({ paddingRight }) => paddingRight}px;

  ${({ type, theme }) =>
    type === "GREEN-700-BUTTON" &&
    css`
      background-color: ${theme.COLORS.green_700};
    `};

  ${({ type, theme }) =>
    type === "RED-400-BUTTON" &&
    css`
      background-color: ${theme.COLORS.red_400};
    `};

  ${({ type, theme }) =>
    type === "GRAY-400-BUTTON" &&
    css`
      background-color: ${theme.COLORS.gray_400};
    `};

  ${({ type, theme }) =>
    type === "GRAY-500-BUTTON" &&
    css`
      background-color: ${theme.COLORS.gray_500};
    `};

  ${({ type, theme }) =>
    type === "GRAY-900-BUTTON" &&
    css`
      background-color: ${theme.COLORS.gray_900};
    `};
`;

export const Title = styled.Text`
  align-self: center;
  ${({ theme }) => css`
    color: ${theme.COLORS.white};
    font-size: ${theme.FONT_SIZE.SM};
    font-family: ${theme.FONT_FAMILY.bold};
  `};
`;
