import styled, { css } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  height: 70px;
  margin: 5px 5px;
`;

export const InfoBox = styled.View`
  width: 15%;
  height: 70px;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  ${({ theme }) => css`
    border: 1px solid ${theme.COLORS.black};
    background: ${theme.COLORS.gray_700};
  `};
`;

export const Position = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.gray_100};
    font-size: ${theme.FONT_SIZE.XL};
    font-family: ${theme.FONT_FAMILY.medium};
  `};
`;

export const NameBox = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  width: 68%;
  margin: 0 3px;
  height: 70px;
  align-items: center;
  border-radius: 5px;
  ${({ theme }) => css`
    border: 1px solid ${theme.COLORS.black};
    background: ${theme.COLORS.gray_700};
  `};
`;

export const Name = styled.Text`
  margin-left: 12px;
  ${({ theme }) => css`
    color: ${theme.COLORS.gray_100};
    font-size: ${theme.FONT_SIZE.XL};
    font-family: ${theme.FONT_FAMILY.medium};
  `};
`;

export const Points = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.gray_100};
    font-size: ${theme.FONT_SIZE.XL};
    font-family: ${theme.FONT_FAMILY.medium};
  `};
`;

export const ImageContent = styled.View`
  justify-content: flex-start;
`;

export const ImageProfileAndAvatar = styled.Image`
  width: ${RFValue(70)}px;
  height: ${RFValue(70)}px;
  border-radius: 5px;
`;
