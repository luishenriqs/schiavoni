import styled, { css } from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  background: ${({ theme }) => theme.COLORS.black};
`;

export const Content = styled.ScrollView`
  flex: 1;
  width: 70%;
  margin-bottom: 25px;
`;

export const Title = styled.Text`
  align-self: center;
  margin: 25px 0 10px;
  ${({ theme }) => css`
    color: ${theme.COLORS.gold};
    font-size: ${theme.FONT_SIZE.XXM};
    font-family: ${theme.FONT_FAMILY.bold};
  `};
`;

export const Label = styled.Text`
  align-self: center;
  margin-bottom: 15px;
  ${({ theme }) => css`
    color: ${theme.COLORS.gray_400};
    font-size: ${theme.FONT_SIZE.XL};
    font-family: ${theme.FONT_FAMILY.bold};
  `};
`;

export const Text = styled.Text`
  align-self: flex-start;
  ${({ theme }) => css`
    color: ${theme.COLORS.gray_100};
    font-size: ${theme.FONT_SIZE.XML};
    font-family: ${theme.FONT_FAMILY.bold};
  `};
`;
