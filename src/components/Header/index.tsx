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
};

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
            ? picture === 'anonymousURL'
              ? <Image source={require('@assets/anonymousImage/AnonymousImage.png')}/>
              : <Image source={{uri: picture}}/>
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