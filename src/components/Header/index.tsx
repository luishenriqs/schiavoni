import React from 'react';
import {
  Container, 
  HeaderWrapper, 
  HeaderContent,
  IconContainer,
  Icon, 
  Title, 
  AdditionalText,
  Image,
  Empty
} from './styles';

interface HeaderProps {
  picture?: string;
  title: string;
  text?: string;
  headerSize: 'big' | 'small';
  onPress(): void;
}

export function Header({
  picture,
  title, 
  text, 
  headerSize, 
  onPress
}: HeaderProps) {
  return (
    <Container>
      <HeaderWrapper headerSize={headerSize}>
        <HeaderContent>
          {picture
          ? <Image source={{uri: 'https://avatars.githubusercontent.com/u/63956850?v=4'}}/>
          : <Empty/>
        }
          <Title>{title}</Title>
          <IconContainer>
            <Icon size={30} name="menu" onPress={onPress} />
          </IconContainer>
        </HeaderContent>

        {text && (
          <AdditionalText>{text}</AdditionalText>
        )}
      </HeaderWrapper>
    </Container>
  );
};