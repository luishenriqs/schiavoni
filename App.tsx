import 'react-native-gesture-handler';
/* Necessária a instalação para android: ==> yarn add intl */
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import auth from '@react-native-firebase/auth';
import { Routes } from '@routes/index.routes';
import { Loading } from '@components/Loading';
import { AuthContextProvider } from '@contexts/AuthContext';
import { ChampionContextProvider } from '@contexts/ChampionContext';
import { AllPlayersContextProvider } from '@contexts/allPlayersContext';
import { ThemeProvider } from 'styled-components';
import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto';
import theme from '@global/theme';

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold
  });

  // OBSERVADOR DE USUÁRIO AUTENTICADO - (USER | NULL)
  function onAuthStateChanged(user: any) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  // SE USUÁRIO PREVIAMENTE AUTENTICADO ==> SIGN OUT
  //===> TODO RELOAD EXIGE NOVO LOGIN
  //if (initializing && user) auth().signOut();

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <AllPlayersContextProvider>
        <ChampionContextProvider>
          <AuthContextProvider>
            {fontsLoaded ? <Routes /> : <Loading />}
          </AuthContextProvider>
        </ChampionContextProvider>
      </AllPlayersContextProvider>
    </ThemeProvider>
  );
};