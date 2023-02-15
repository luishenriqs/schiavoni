import styled, { css } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  width: 100%;
  height: 70px;
  flex-direction: row;
  justify-content: center;
  border-radius: 5px;
  margin: 5px 0;
`;

export const NameBox = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  width: 58%;
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
    font-size: ${theme.FONT_SIZE.LG};
    font-family: ${theme.FONT_FAMILY.medium};
  `};
`;

export const ImageContent = styled.View`
  justify-content: flex-start;
`;

export const ImageProfileAndAvatar = styled.Image`
  width: ${RFValue(65)}px;
  height: ${RFValue(70)}px;
  border-radius: 5px;
`;

export const ButtonBox = styled.View`
  flex-direction: row;
  width: 40%;
  height: 70px;
`;
