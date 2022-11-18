import React from 'react';
import { Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PSOP } from './PSOP';
import { Players } from './Players';

const { Navigator, Screen } = createBottomTabNavigator();

export function RankingRoutes () {
    const theme = useTheme();
    return (
        <Navigator
            screenOptions= {{
                headerShown: false,
                tabBarStyle: {
                    paddingVertical: Platform.OS === 'ios' ? 20 : 0,
                    height: 50,
                },
                tabBarLabelPosition: 'beside-icon',
                tabBarActiveTintColor: theme.COLORS.gray_100,
                tabBarActiveBackgroundColor: theme.COLORS.gray_900,
                tabBarInactiveTintColor: theme.COLORS.gray_700,
                tabBarInactiveBackgroundColor: theme.COLORS.gray_500
            }}
        >
            <Screen 
                name='PSOP' 
                component={PSOP} 
                options={{
                    tabBarIcon: (({ size, color }) => (
                        <MaterialCommunityIcons 
                            name='cards-club'
                            size={size}
                            color={color}
                        />
                    ))
                }}
            />
            <Screen
                name='Players' 
                component={Players} 
                options={{
                    tabBarIcon: (({ size, color }) => (
                        <MaterialCommunityIcons 
                            name='account-multiple'
                            size={size}
                            color={color}
                        />
                    ))
                }}
            />
        </Navigator>
    );
}