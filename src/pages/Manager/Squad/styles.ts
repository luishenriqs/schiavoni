import styled, { css } from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
`;

export const Content = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 25px 8px 0;
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
