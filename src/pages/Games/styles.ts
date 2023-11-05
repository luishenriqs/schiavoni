import styled, { css } from "styled-components/native";
import { TouchableOpacity } from "react-native";

export const Container = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  background: ${({ theme }) => theme.COLORS.gray_600};
`;

export const Content = styled.ScrollView`
  flex: 1;
  width: 85%;
  padding: 0 10%;
  margin-top: 15px;
`;

export const GameWrapper = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
`;

export const SeasonBox = styled.View`
  width: 100%;
  height: 40px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  margin-bottom: 3px;
  ${({ theme }) => css`
    border: 1px solid ${theme.COLORS.black};
    background: ${theme.COLORS.gray_900};
  `};
`;

export const Season = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.gray_100};
    font-size: ${theme.FONT_SIZE.XM};
    font-family: ${theme.FONT_FAMILY.medium};
  `};
`;

export const ButtonsContainer = styled.View`
  height: 30px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 8px 6px;
`;

export const SeasonLabel = styled.Text`
  ${({ theme }) => css`
    font-size: ${theme.FONT_SIZE.MD};
    font-family: ${theme.FONT_FAMILY.bold};
    color: ${theme.COLORS.gold};
  `};
`;

export const Empty = styled(TouchableOpacity)`
  width: 40px;
  height: 40px;
`;
