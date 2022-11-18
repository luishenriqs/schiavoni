import { TouchableOpacity } from "react-native";
import styled, { css } from "styled-components/native";

type Props = {
  type: boolean;
};

export const Container = styled(TouchableOpacity)<Props>`
  flex: 1;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  min-height: 56px;
  max-height: 56px;
  border-radius: 6px;
  margin-top: 10px;

  ${({ type, theme }) =>
    type &&
    css`
      color: ${theme.COLORS.green_700};
    `};

  ${({ type, theme }) =>
    type &&
    css`
      color: ${theme.COLORS.gray_400};
    `};
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.white};
    font-size: ${theme.FONT_SIZE.MD};
    font-family: ${theme.FONT_FAMILY.regular};
    margin-left: 20px;
  `};
`;
