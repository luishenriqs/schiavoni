import styled, { css } from "styled-components/native";

export const Container = styled.ScrollView`
  flex: 1;
  width: 100%;
  background: ${({ theme }) => theme.COLORS.gray_600};
`;

export const Content = styled.View`
  align-items: center;
  justify-content: center;
  padding: 25px 15px 0;
  margin-left: 20px;
  margin-right: 20px;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.gray_100};
    font-size: ${theme.FONT_SIZE.LG};
    font-family: ${theme.FONT_FAMILY.medium};
  `};
`;

export const Update = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Status = styled.View`
  flex-direction: row;
  margin-bottom: 20px;
`;

export const Progress = styled.Text`
  margin-right: 25px;
  ${({ theme }) => css`
    color: ${theme.COLORS.gray_300};
    font-size: ${theme.FONT_SIZE.XL};
    font-family: ${theme.FONT_FAMILY.bold};
  `};
`;

export const Transferred = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.gray_300};
    font-size: ${theme.FONT_SIZE.MD};
    font-family: ${theme.FONT_FAMILY.regular};
  `};
`;
