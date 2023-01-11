import styled, { css } from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  background: ${({ theme }) => theme.COLORS.gray_600};
`;

export const Content = styled.ScrollView`
  flex: 1;
  width: 100%;
  padding: 0 15%;
  margin-top: 25px;
`;

export const Progress = styled.Text`
  margin-top: 20px;
  align-self: center;
  ${({ theme }) => css`
    color: ${theme.COLORS.gray_300};
    font-size: ${theme.FONT_SIZE.XL};
    font-family: ${theme.FONT_FAMILY.bold};
  `};
`;

export const Transferred = styled.Text`
  align-self: center;
  margin-bottom: 45px;
  ${({ theme }) => css`
    color: ${theme.COLORS.gray_300};
    font-size: ${theme.FONT_SIZE.MD};
    font-family: ${theme.FONT_FAMILY.regular};
  `};
`;
