import { TouchableOpacity } from "react-native";
import styled, { css } from "styled-components/native";

export type ButtonTypeStyleProps = "GREEN-700-BUTTON" | "GRAY-400-BUTTON";

type Props = {
  type: ButtonTypeStyleProps;
};

export const Container = styled(TouchableOpacity)<Props>`
  flex: 1;
  width: 100%;
  min-height: 54px;
  max-height: 54px;
  align-items: center;
  justify-content: center;
  border-radius: 6px;

  ${({ type, theme }) =>
    type === "GREEN-700-BUTTON" &&
    css`
      background-color: ${theme.COLORS.green_700};
    `};

  ${({ type, theme }) =>
    type === "GRAY-400-BUTTON" &&
    css`
      background-color: ${theme.COLORS.gray_400};
    `};
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.white};
    font-size: ${theme.FONT_SIZE.MD};
    font-family: ${theme.FONT_FAMILY.bold};
  `};
`;
