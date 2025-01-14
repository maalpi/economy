import { Home } from './home';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from '@shopify/restyle';
import { theme } from './theme';

import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';

import {Raleway_400Regular, Raleway_600SemiBold, Raleway_700Bold} from '@expo-google-fonts/raleway'

export default function HomeScreen() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_700Bold,
    Raleway_400Regular,
    Raleway_600SemiBold,
    Raleway_700Bold
  });
  return (
    <ThemeProvider theme={theme}>
      <StatusBar style='auto' />
      { fontsLoaded && <Home />}
    </ ThemeProvider>
  );
}

