import { Image, TouchableOpacity, TouchableOpacityProps } from "react-native";
import styled from "styled-components/native";

type Props = TouchableOpacityProps & {
  onPress: () => void;
};

export const Container = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.COLORS.gray_400};
`;

export const DrawerContent = styled.View`
  flex: 1;
  background: ${({ theme }) => theme.COLORS.gray_400};
`;

export const Imagem = styled(Image)`
  align-self: center;
  width: 150px;
  height: 150px;
  margin: 0 15px;
`;

export const Line = styled.View`
  border: solid 1px ${({ theme }) => theme.COLORS.gray_500};
`;

export const DrawerListContent = styled.View`
  padding: 15px;
`;

export const ButtonBottom = styled(TouchableOpacity)<Props>`
  padding: 10px 0;
`;

export const ButtonContent = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const TextButton = styled.Text`
  font-size: ${({ theme }) => theme.FONT_SIZE.SM};
  font-family: ${({ theme }) => theme.FONT_FAMILY.bold};
  color: ${({ theme }) => theme.COLORS.gray_600};
  margin-left: 10px;
`;
