import styled, { css } from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
`;

export const Content = styled.ScrollView`
  flex: 1;
  width: 100%;
  padding: 0 15%;
  margin-top: 25px;
`;

export const Title = styled.Text`
  align-self: center;
  margin-bottom: 30px;
  ${({ theme }) => css`
    color: ${theme.COLORS.gray_100};
    font-size: ${theme.FONT_SIZE.LG};
    font-family: ${theme.FONT_FAMILY.medium};
  `};
`;
