import 'react-native-gesture-handler';
/* Necessária a instalação para android: ==> yarn add intl */
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import React, { useEffect } from 'react';
import { StatusBar } from 'react-native';
import auth from '@react-native-firebase/auth';
import { Routes } from '@routes/index.routes';
import { Loading } from '@components/Loading';
import { AuthContextProvider } from '@contexts/AuthContext';
import { ThemeProvider } from 'styled-components';
import { useFonts, Roboto_400Regular, Roboto_500Medium, Roboto_700Bold } from '@expo-google-fonts/roboto';
import theme from '@global/theme';

export default function App() {

  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold
  });

  useEffect(() => {
    auth().signOut();
  },[])

  return (
    <ThemeProvider theme={theme}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <AuthContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </AuthContextProvider>
    </ThemeProvider>
  );
};