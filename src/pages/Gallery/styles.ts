import { Image } from "react-native";
import styled, { css } from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  width: 100%;
  background: ${({ theme }) => theme.COLORS.gray_600};
`;

export const Content = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 25px 15px 0;
`;

export const Memory = styled.View`
  margin-bottom: 35px;
`;

export const Imagem = styled(Image)`
  align-self: center;
  width: 300px;
  height: 300px;
  border-radius: 8px;
  margin-bottom: 5px;
`;

export const Legend = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.gray_100};
    font-size: ${theme.FONT_SIZE.LG};
    font-family: ${theme.FONT_FAMILY.medium};
  `};
  align-self: center;
`;
