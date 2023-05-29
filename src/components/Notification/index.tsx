import React from 'react';
import {
  Container, 
  NotificationWrapper, 
  NotificationContent,
  InfoContainer,
  CloseContainer,
  Icon, 
  Title, 
  Text,
} from './styles';

interface NotificationsProps {
  title?: string;
  text?: string;
  onPress(): void;
  onClose(): void;
};

export function Notification({
  title, 
  text, 
  onPress,
  onClose
}: NotificationsProps) {

  return (
    <Container>
      <NotificationWrapper>
        <NotificationContent>
          <InfoContainer onPress={onPress}>
            <Icon 
              size={30} 
              name='bell-alert-outline' 
            />
            {title && <Title>{title}</Title>}
          </InfoContainer>
          <CloseContainer>
            <Icon 
              size={30} 
              name='close'
              onPress={onClose} 
            />
          </CloseContainer>
        </NotificationContent>
        {text && <Text>{text}</Text>}
      </NotificationWrapper>
    </Container>
  );
};