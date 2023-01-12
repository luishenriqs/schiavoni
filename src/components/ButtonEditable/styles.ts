import { TouchableOpacity } from "react-native";
import styled, { css } from "styled-components/native";

export type ButtonTypeStyleProps =
  | "GREEN-BUTTON"
  | "GRAY-BUTTON"
  | "RED-BUTTON";

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
    type === "GREEN-BUTTON" &&
    css`
      background-color: ${theme.COLORS.green_700};
    `};

  ${({ type, theme }) =>
    type === "GRAY-BUTTON" &&
    css`
      background-color: ${theme.COLORS.gray_400};
    `};

  ${({ type, theme }) =>
    type === "RED-BUTTON" &&
    css`
      background-color: ${theme.COLORS.red_200};
    `};
`;

export const Title = styled.Text`
  align-self: center;
  ${({ theme }) => css`
    color: ${theme.COLORS.white};
    font-size: ${theme.FONT_SIZE.MD};
    font-family: ${theme.FONT_FAMILY.bold};
  `};
`;
