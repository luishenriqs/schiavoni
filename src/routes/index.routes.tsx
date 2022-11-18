import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthRoutes } from './auth.routes';
import { AppRoutes } from './app.routes';
// import { useAuth } from '../hooks/Auth';

export function Routes() {
  // const { user } = useAuth();
  //console.log(user);
  return(
      <NavigationContainer>
          {true ? <AppRoutes /> : <AuthRoutes />}
      </NavigationContainer>
  )
}