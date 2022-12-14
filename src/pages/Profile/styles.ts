import styled, { css } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.ScrollView`
  flex: 1;
  width: 100%;
  background: ${({ theme }) => theme.COLORS.gray_600};
`;

export const ImageContainer = styled.View`
  flex: 1;
  align-items: center;
  margin: 15px 15% 0;
`;

export const LabelContainer = styled.View`
  flex: 1;
  width: 100%;
  max-height: 30px;
  align-self: center;
  border-radius: 5px;
  background: ${({ theme }) => theme.COLORS.gray_300};
`;

export const Label = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.gray_700};
    font-size: ${theme.FONT_SIZE.XL};
    font-family: ${theme.FONT_FAMILY.bold};
  `};
  align-self: center;
`;

export const ImageWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  align-self: center;
`;

export const ImageContent = styled.View`
  justify-content: flex-start;
`;

export const ImageProfileAndAvatar = styled.Image`
  width: ${RFValue(130)}px;
  height: ${RFValue(130)}px;
  margin: 15px 10px;
  border-radius: 5px;
`;

export const Status = styled.View`
  flex-direction: row;
  margin-top: 10px;
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
