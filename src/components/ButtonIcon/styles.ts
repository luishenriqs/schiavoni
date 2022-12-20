import styled from "styled-components/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const Icon = styled(MaterialCommunityIcons)`
  color: ${({ theme }) => theme.COLORS.gray_100};
  padding-bottom: 5px;
`;
