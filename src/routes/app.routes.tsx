import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'styled-components';
import { ChampionPage } from '@pages/ChampionPage';
import { RankingRoutes } from '@pages/Ranking/ranking.routes';
import { Games } from '@pages/Games';
import { Profile } from '@pages/Profile';
import { Gallery } from '@pages/Gallery';
import { ManagerRoutes } from '@pages/Manager/manager.routes';
import { CustomDrawer } from '@components/CustomDrawer';

const Drawer = createDrawerNavigator();

// Route to app menu;
export function AppRoutes() {
  const theme = useTheme();
  return (
    <Drawer.Navigator 
      drawerContent={props => <CustomDrawer {...props} />} 
      screenOptions={{
        drawerPosition: 'left',
        drawerType: 'front',
        headerShown: false,
        drawerActiveTintColor: theme.COLORS.gray_100,
        drawerLabelStyle: {
          marginLeft: -25,
          fontFamily: theme.FONT_FAMILY.bold,
          fontSize: 15
        }
      }}  
    >
      <Drawer.Screen 
        name="The Champion" 
        component={ChampionPage}
        options={{
          drawerIcon: ({color}) => (
            <MaterialCommunityIcons 
              name='trophy-outline'
              size={20}
              color={color}
            />
          )
        }}
      />
      <Drawer.Screen 
        name="Ranking"
        component={RankingRoutes}
        options={{
          drawerIcon: ({color}) => (
            <MaterialCommunityIcons 
              name='star-outline'
              size={20}
              color={color}
            />
          )
        }}
      />
      <Drawer.Screen 
        name="Games" 
        component={Games}
        options={{
          drawerIcon: ({color}) => (
            <MaterialCommunityIcons 
              name='cards-playing-club-multiple-outline'
              size={20}
              color={color}
            />
          )
        }}
      />
      <Drawer.Screen 
        name="Profile" 
        component={Profile}
        options={{
          drawerIcon: ({color}) => (
            <MaterialCommunityIcons 
              name='account-outline'
              size={20}
              color={color}
            />
          )
        }}
      />
      <Drawer.Screen 
        name="Gallery" 
        component={Gallery}
        options={{
          drawerIcon: ({color}) => (
            <Fontisto 
              name='photograph'
              size={20}
              color={color}
            />
          )
        }}
      />
      <Drawer.Screen 
        name="Manager" 
        component={ManagerRoutes}
        options={{
          drawerIcon: ({color}) => (
            <Ionicons 
              name='md-settings-outline'
              size={20}
              color={color}
            />
          )
        }}
      />
    </Drawer.Navigator>
  );
};