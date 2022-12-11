import styled from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  width: 100%;
  background: ${({ theme }) => theme.COLORS.gray_600};
`;

export const Content = styled.View`
  padding: 25px 0;
`;
