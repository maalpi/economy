import { createTheme } from "@shopify/restyle";
import { spacing } from './spacing';
import { colors } from './colors';

const theme = createTheme({
    colors,
    spacing,
});

type ThemePros = typeof theme;

export { theme, ThemePros };