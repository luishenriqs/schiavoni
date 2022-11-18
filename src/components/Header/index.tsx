import React from 'react';
import {
  Container, 
  HeaderWrapper, 
  HeaderContent,
  Icon, 
  Title, 
  AdditionalText, 
  Empty
} from './styles';

interface HeaderProps {
  title: string;
  text?: string;
  headerSize: 'big' | 'small';
  onPress(): void;
}

export function Header({
  title, 
  text, 
  headerSize, 
  onPress
}: HeaderProps) {
  return (
    <Container>
      <HeaderWrapper headerSize={headerSize}>
        <HeaderContent>
          <Empty/>
          <Title>{title}</Title>
          <Icon size={30} name="menu" onPress={onPress} />
        </HeaderContent>

        {text && (
          <AdditionalText>{text}</AdditionalText>
        )}
      </HeaderWrapper>
    </Container>
  );
};