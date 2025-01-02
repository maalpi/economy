import { createTheme } from "@shopify/restyle";
import { spacing } from './spacing';
import { colors } from './colors';
import { textVariants } from './textVariants';
import { buttonVariants } from './buttonVariants';

const theme = createTheme({
    colors,
    spacing,
    textVariants,
    buttonVariants
});

type ThemeProps = typeof theme;

export { theme, ThemeProps };