import styled, { css } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const LabelContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin: 0 5px;
`;

export const LabelPlayer = styled.View`
  width: 66%;
  align-items: center;
  padding: 3px;
  margin: 0 3px;
  border-radius: 5px;
  ${({ theme }) => css`
    border: 1px solid ${theme.COLORS.black};
    background: ${theme.COLORS.gray_700};
  `};
`;

export const LabelPoints = styled.View`
  width: 16%;
  align-items: center;
  padding: 3px;
  border-radius: 5px;
  ${({ theme }) => css`
    border: 1px solid ${theme.COLORS.black};
    background: ${theme.COLORS.gray_700};
  `};
`;

export const LabelText = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.SS};
    font-family: ${theme.FONT_FAMILY.medium};
    color: ${theme.COLORS.gray_200};
  `};
`;
