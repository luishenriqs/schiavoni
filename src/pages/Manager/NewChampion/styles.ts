import styled, { css } from "styled-components/native";
import { getBottomSpace } from "react-native-iphone-x-helper";

export const Container = styled.ScrollView.attrs({
  ShowsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace() + 48,
  },
})`
  flex: 1;
  width: 100%;
  background: ${({ theme }) => theme.COLORS.gray_600};
`;

export const Content = styled.View`
  padding: 25px 0;
`;

export const Title = styled.Text`
  margin-bottom: 25px;
  ${({ theme }) => css`
    color: ${theme.COLORS.gray_100};
    font-size: ${theme.FONT_SIZE.LG};
    font-family: ${theme.FONT_FAMILY.medium};
  `};
`;
