import styled from "styled-components/native";

export const Title = styled.Text`
  align-self: center;
  font-size: 14px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.medium};
  color: ${({ theme }) => theme.COLORS.white};
  margin-top: 20px;
`;
