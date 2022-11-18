import styled from "styled-components/native";

type Prop = {
  size: number;
};

export const Container = styled.View<Prop>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  margin: 20px 0;
`;

export const EmptyPhotoContainer = styled.View<Prop>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  padding-left: 5px;
  padding-right: 5px;
  border-width: 3px;
  border-radius: 5px;
  border-color: ${({ theme }) => theme.COLORS.gray_200};
  border-style: dashed;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.COLORS.gray_500};
`;

export const Image = styled.Image<Prop>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 5px;
`;

export const EmptyPhotoText = styled.Text`
  font-size: 18px;
  font-family: ${({ theme }) => theme.FONT_FAMILY.regular};
  color: ${({ theme }) => theme.COLORS.gray_300};
  text-align: center;
  padding-top: 18px;
  padding-bottom: 18px;
`;
