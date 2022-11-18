import styled, { css } from "styled-components/native";
import { TouchableOpacity } from "react-native";
import { getBottomSpace } from "react-native-iphone-x-helper";
import { MaterialIcons } from "@expo/vector-icons";

export const Container = styled.ScrollView.attrs({
  ShowsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace() + 48,
  },
})`
  flex: 1;
`;

export const Header = styled.View`
  align-items: center;
  margin: 15px 25px;
`;

export const BackButton = styled(TouchableOpacity)`
  width: 100%;
  align-items: flex-start;
  margin-top: 30px;
`;

export const Icon = styled(MaterialIcons)`
  color: ${({ theme }) => theme.COLORS.gray_200};
`;

export const LogoBox = styled.View`
  margin: -10px;
`;

export const FormContent = styled.View``;

export const Title = styled.Text`
  align-self: center;
  margin-top: 15px;
  margin-bottom: 60px;
  ${({ theme }) => css`
    color: ${theme.COLORS.gold};
    font-size: ${theme.FONT_SIZE.MD};
    font-family: ${theme.FONT_FAMILY.bold};
  `};
`;
