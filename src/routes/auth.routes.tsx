import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

import { SignIn } from '../pages/SignIn';
import { Wellcome } from '../pages/Wellcome';

const Stack = createStackNavigator();

export function AuthRoutes() {
  return (
    <Stack.Navigator >
      <Stack.Screen 
        name="wellcome"
        component={Wellcome}
        options={{headerShown: false}}
      />
      <Stack.Screen 
        name="signIn"
        component={SignIn}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  )
};