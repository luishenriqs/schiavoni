import React, { useEffect, useState } from 'react';
import OneSignal, { NotificationReceivedEvent, OSNotification } from 'react-native-onesignal';
import auth from '@react-native-firebase/auth';
import { Notification } from '@components/Notification';
import { NavigationContainer } from '@react-navigation/native';
import { AuthRoutes } from './auth.routes';
import { AppRoutes } from './app.routes';

type User = {
  uid: string;
}

export function Routes() {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const [notification, setNotification] = useState<OSNotification>();

  useEffect(() => {
    const subscribe = auth().onAuthStateChanged(userInfo => {
      setAuthUser(userInfo);
    });
    return subscribe;
  }, []);

  useEffect(() => {
    const unsubscribe = OneSignal.setNotificationWillShowInForegroundHandler((notificationReceivedEvent: NotificationReceivedEvent) => {
      const response = notificationReceivedEvent.getNotification();
      setNotification(response);
    });
    
    return () => unsubscribe;
  }, []); 

  return(
      <NavigationContainer>
          {notification && 
            //==> EXIBE NOVAS NOTIFICAÇÕES SE EM FOREGROUND
            <Notification 
              title={notification?.title}
              text={notification?.body}
              onPress={() => {console.log('ON PRESS')}}
              onClose={() => {setNotification(undefined)}}
            />
          }
          {authUser ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
  )
}