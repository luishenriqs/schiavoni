import styled, { css } from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  background: ${({ theme }) => theme.COLORS.gray_600};
`;

export const Content = styled.ScrollView`
  flex: 1;
  width: 80%;
  padding: 0 5%;
  margin-top: 25px;
  margin-bottom: 30px;
  background: ${({ theme }) => theme.COLORS.white};
`;

export const TextBox = styled.View`
  margin-top: 25px;
`;

export const Title = styled.Text`
  margin-left: 12px;
  align-self: center;
  ${({ theme }) => css`
    color: ${theme.COLORS.gray_600};
    font-size: ${theme.FONT_SIZE.XM};
    font-family: ${theme.FONT_FAMILY.bold};
  `};
`;

export const SubTitleBox = styled.View`
  width: 100%;
  flex-direction: row;
  margin-top: 25px;
  padding-right: 20px;
`;

export const SubTitle = styled.Text`
  margin-left: 12px;
  ${({ theme }) => css`
    color: ${theme.COLORS.gray_600};
    font-size: ${theme.FONT_SIZE.XM};
    font-family: ${theme.FONT_FAMILY.bold};
  `};
`;

export const Text = styled.Text`
  margin-left: 12px;
  ${({ theme }) => css`
    color: ${theme.COLORS.gray_600};
    font-size: ${theme.FONT_SIZE.XM};
    font-family: ${theme.FONT_FAMILY.medium};
  `};
`;

export const BulletBox = styled.View`
  width: 100%;
  flex-direction: row;
  margin-top: 10px;
  padding-right: 20px;
`;

export const BulletPoint = styled.Text`
  margin-left: 10px;
  align-self: flex-start;
  ${({ theme }) => css`
    color: ${theme.COLORS.gray_600};
    font-size: ${theme.FONT_SIZE.XML};
    font-family: ${theme.FONT_FAMILY.bold};
  `};
`;

export const BulletText = styled.Text`
  margin-left: 12px;
  align-self: center;
  ${({ theme }) => css`
    color: ${theme.COLORS.gray_600};
    font-size: ${theme.FONT_SIZE.XM};
    font-family: ${theme.FONT_FAMILY.medium};
  `};
`;

export const MarginBotton = styled.View`
  width: 100%;
  margin-bottom: 40px;
`;

export const ButtonContainer = styled.View`
  height: 90px;
  width: 80%;
  align-items: flex-start;
  margin-bottom: 30px;
`;

export const TermsAlreadRead = styled.Text`
  ${({ theme }) => css`
    color: ${theme.COLORS.gold};
    font-size: ${theme.FONT_SIZE.MD};
    font-family: ${theme.FONT_FAMILY.regular};
    margin-left: 20px;
  `};
`;
