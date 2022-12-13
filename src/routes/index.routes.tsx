import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import { AuthRoutes } from './auth.routes';
import { AppRoutes } from './app.routes';

type User = {
  uid: string;
}

export function Routes() {
  const [authUser, setAuthUser] = useState<User | null>(null);

  useEffect(() => {
    const subscribe = auth().onAuthStateChanged(userInfo => {
      setAuthUser(userInfo);
    });

    return subscribe;
  }, [])
  return(
      <NavigationContainer>
          {authUser ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
  )
}