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
  padding: 0 14%;
  margin-top: 25px;
`;

export const TitleContainer = styled.View`
  margin: 10px 0;
  align-items: center;
`;

export const Title = styled.Text`
  margin-bottom: 20px;
  ${({ theme }) => css`
    color: ${theme.COLORS.gold};
    font-size: ${theme.FONT_SIZE.LG};
    font-family: ${theme.FONT_FAMILY.medium};
  `};
`;
