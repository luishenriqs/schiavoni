import styled from "styled-components/native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { RFPercentage } from "react-native-responsive-fontsize";

export const Container = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  background: ${({ theme }) => theme.COLORS.gray_600};
`;

export const Content = styled.View`
  flex: 1;
  width: 100%;
  height: ${getStatusBarHeight() + RFPercentage(9)}px;
  align-items: center;
  justify-content: center;
  padding: 25px 8px 0;
`;
