import styled, { css } from "styled-components/native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RFPercentage } from "react-native-responsive-fontsize";

interface IHeaderProps {
  headerSize: "big" | "small";
}
export const Container = styled.View`
  width: 100%;
  background: ${({ theme }) => theme.COLORS.gray_900};
`;

export const HeaderWrapper = styled.View<IHeaderProps>`
  width: 100%;
  align-items: center;

  ${({ headerSize }) =>
    headerSize === "big" &&
    css`
      height: ${RFPercentage(28)}px;
      align-items: center;
      justify-content: flex-start;
    `};
`;

export const HeaderContent = styled.View`
  width: 100%;
  flex-direction: row;
  height: ${getStatusBarHeight() + RFPercentage(9)}px;
  align-items: center;
  justify-content: space-between;
  padding: 35px 15px 0;
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.gray_100};
    font-size: ${theme.FONT_SIZE.XL};
    font-family: ${theme.FONT_FAMILY.medium};
  `};
`;

export const AdditionalText = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.gray_400};
    font-size: ${theme.FONT_SIZE.SM};
    font-family: ${theme.FONT_FAMILY.medium};
  `};
  margin-bottom: 15px;
`;

export const IconContainer = styled.View`
  width: 60px;
  height: 60px;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
`;

export const Icon = styled(MaterialCommunityIcons)`
  color: ${({ theme }) => theme.COLORS.gray_100};
  padding-bottom: 5px;
`;

export const Empty = styled.View`
  width: 28px;
  height: 35px;
`;

export const Image = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 50px;
`;
