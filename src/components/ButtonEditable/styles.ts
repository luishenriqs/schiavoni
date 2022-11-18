import { TouchableOpacity } from "react-native";
import styled, { css } from "styled-components/native";

export type ButtonTypeStyleProps = "GREEN-BUTTON" | "GRAY-BUTTON";

type Props = {
  type: ButtonTypeStyleProps;
  width: number;
  length: number;
};

export const Container = styled(TouchableOpacity)<Props>`
  flex: 1;
  min-width: ${({ width }) => width}px;
  max-width: ${({ width }) => width}px;
  min-height: ${({ length }) => length}px;
  max-height: ${({ length }) => length}px;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  margin-left: 20px;
  padding-left: 10px;
  padding-right: 30px;

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
`;

export const Title = styled.Text`
  align-self: flex-start;
  ${({ theme }) => css`
    color: ${theme.COLORS.white};
    font-size: ${theme.FONT_SIZE.MD};
    font-family: ${theme.FONT_FAMILY.bold};
  `};
`;
