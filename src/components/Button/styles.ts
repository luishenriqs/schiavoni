import { TouchableOpacity } from "react-native";
import styled, { css } from "styled-components/native";

export type ButtonTypeStyleProps = "GREEN-BUTTON" | "GRAY-BUTTON";

type Props = {
  type: ButtonTypeStyleProps;
};

export const Container = styled(TouchableOpacity)<Props>`
  flex: 1;
  width: 100%;
  min-height: 56px;
  max-height: 56px;
  align-items: center;
  justify-content: center;
  border-radius: 6px;

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
  ${({ theme }) => css`
    color: ${theme.COLORS.white};
    font-size: ${theme.FONT_SIZE.MD};
    font-family: ${theme.FONT_FAMILY.bold};
  `};
`;
