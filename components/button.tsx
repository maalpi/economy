import { createRestyleComponent, createText, createVariant, spacing, SpacingProps, VariantProps, useTheme } from "@shopify/restyle";
import { TouchableOpacity } from "react-native";
import { ThemeProps } from "@/app/theme";
import { MaterialIcons } from "@expo/vector-icons";

const Text = createText<ThemeProps>();

type BoxCustomProps =
    SpacingProps<ThemeProps> &
    VariantProps<ThemeProps, 'buttonVariants'>;

    const Box = createRestyleComponent<BoxCustomProps, ThemeProps>([
        spacing,
        createVariant({ themeKey: 'buttonVariants'})
    ])


type Props = BoxCustomProps & {
    title?: string,
    onPress?: () => void;
    icon?: keyof typeof MaterialIcons.glyphMap;
}

export function Button(props: Props) {

    const theme = useTheme<ThemeProps>();

    const handlePress = () => {
        if (props.onPress) {
            props.onPress(); 
        }};

    return (
        <TouchableOpacity style={{ flex:1 }} onPress={handlePress}>
            <Box {...props}>

            {props.title ? (
                <Text variant={props.variant === 'primary' ? 'button_primary' : 'button_secondary'}>
                    {props.title}
                </Text> ) : (
                    <MaterialIcons name={props.icon} size={24} color={theme.colors.primary_200}/>
                )};
            </Box>
        </TouchableOpacity>
    )
}