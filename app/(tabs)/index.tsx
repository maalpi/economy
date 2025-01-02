import { Image, StyleSheet, Platform } from 'react-native';

import { Home } from '../screens/Home';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider } from '@shopify/restyle';
import { theme } from '../theme';

export default function HomeScreen() {
  return (
    <ThemeProvider theme={theme}>
      <Home />
      <StatusBar style='auto' />
    </ ThemeProvider>
  );
}

