import { Image, StyleSheet, Platform } from 'react-native';

import { Home } from './home';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from '@shopify/restyle';
import { theme } from './theme';
import Conta from './conta';
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';

export default function HomeScreen() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold
  });
  return (
    <ThemeProvider theme={theme}>
      <StatusBar style='auto' />
      { fontsLoaded && <Home />}
    </ ThemeProvider>
  );
}

