import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { StatisticsPlayers } from './Players';
import { Performance } from './Performance';

const { Navigator, Screen } = createStackNavigator();

export function StatisticsRoutes () {
    return (
        <Navigator 
        screenOptions= {{
            headerShown: false,
        }}
        >
            <Screen 
                name='Statistics Players' 
                component={StatisticsPlayers} 
            />
            <Screen 
                name='Performance' 
                component={Performance} 
            />
        </Navigator>
    );
}