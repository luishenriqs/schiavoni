import styled, { css } from "styled-components/native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RFPercentage } from "react-native-responsive-fontsize";

export const Container = styled.View`
  width: 100%;
  padding-bottom: 5px;
  background: ${({ theme }) => theme.COLORS.gray_600};
`;

export const NotificationWrapper = styled.View`
  align-items: center;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 0 15px;
`;

export const NotificationContent = styled.View`
  width: 100%;
  flex-direction: row;
  height: ${getStatusBarHeight() + RFPercentage(9)}px;
  align-items: center;
  justify-content: space-between;
  padding: 35px 15px 0;
`;

export const InfoContainer = styled.Pressable`
  height: 40px;
  padding: 0 15px;
  flex-direction: row;
  border-radius: 50px;
  align-items: center;
  justify-content: center;
`;

export const CloseContainer = styled.View`
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

export const Title = styled.Text`
  margin-left: 10px;
  ${({ theme }) => css`
    color: ${theme.COLORS.gray_100};
    font-size: ${theme.FONT_SIZE.XL};
    font-family: ${theme.FONT_FAMILY.bold};
  `};
`;

export const Text = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.gray_400};
    font-size: ${theme.FONT_SIZE.LG};
    font-family: ${theme.FONT_FAMILY.medium};
  `};
  margin-bottom: 15px;
`;
