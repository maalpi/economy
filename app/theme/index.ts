import { createTheme } from "@shopify/restyle";
import { spacing } from './spacing';
import { colors } from './colors';
import { textVariants } from './textVariants';

const theme = createTheme({
    colors,
    spacing,
    textVariants
});

type ThemeProps = typeof theme;

export { theme, ThemeProps };