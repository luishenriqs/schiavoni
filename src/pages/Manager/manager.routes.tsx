import React from 'react';
import { Platform } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NewGame } from './NewGame';
import { NewChampion } from './NewChampion';
import { NewPlayer } from './NewPlayer';
import { Squad } from './Squad';
import { AddGallery } from './AddGallery';

const { Navigator, Screen } = createBottomTabNavigator();

export function ManagerRoutes () {
    const theme = useTheme();
    return (
        <Navigator
            screenOptions= {{
                headerShown: false,
                tabBarStyle: {
                    paddingVertical: Platform.OS === 'ios' ? 20 : 0,
                    height: 52,
                },
                tabBarLabelStyle: {
                    margin: 3,
                },
                tabBarLabelPosition: 'below-icon', 
                tabBarActiveTintColor: theme.COLORS.gray_100,
                tabBarActiveBackgroundColor: theme.COLORS.gray_900,
                tabBarInactiveTintColor: theme.COLORS.gray_700,
                tabBarInactiveBackgroundColor: theme.COLORS.gray_500
            }}
        >
            <Screen 
                name='New Game' 
                component={NewGame} 
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
                name='Champion' 
                component={NewChampion} 
                options={{
                    tabBarIcon: (({ size, color }) => (
                        <MaterialCommunityIcons 
                            name='trophy'
                            size={size}
                            color={color}
                        />
                    ))
                }}
            />
            <Screen
                name='New Player' 
                component={NewPlayer} 
                options={{
                    tabBarIcon: (({ size, color }) => (
                        <MaterialCommunityIcons 
                            name='account-plus'
                            size={size}
                            color={color}
                        />
                    ))
                }}
            />
            <Screen
                name='Squad' 
                component={Squad} 
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
            <Screen
                name='Add Gallery' 
                component={AddGallery} 
                options={{
                    tabBarIcon: (({ size, color }) => (
                        <MaterialIcons 
                            name='add-to-photos'
                            size={size}
                            color={color}
                        />
                    ))
                }}
            />
        </Navigator>
    );
}