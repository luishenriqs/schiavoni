import React from 'react';
import { useAuth } from '@hooks/useAuth';
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
  icon?: string;
  headerSize: 'big' | 'small';
  onPress(): void;
};

export function Header({
  picture,
  title, 
  text, 
  headerSize,
  icon = 'menu',
  onPress
}: HeaderProps) {
  const { user } = useAuth();

  const iconName = !user.termsOfUse ? "logout" : icon;

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
            <Icon 
              size={30} 
              name={iconName}
              onPress={onPress} 
            />
          </IconContainer>
        </HeaderContent>

        {text && (
          <AdditionalText>{text}</AdditionalText>
        )}
      </HeaderWrapper>
    </Container>
  );
};