import { createRestyleComponent, createText, createVariant, spacing, SpacingProps, VariantProps } from "@shopify/restyle";
import { TouchableOpacity } from "react-native";
import { ThemeProps } from "@/app/theme";
import { router,  } from "expo-router";

const Text = createText<ThemeProps>();

type BoxCustomProps =
    SpacingProps<ThemeProps> &
    VariantProps<ThemeProps, 'buttonVariants'>;

    const Box = createRestyleComponent<BoxCustomProps, ThemeProps>([
        spacing,
        createVariant({ themeKey: 'buttonVariants'})
    ])


type Props = BoxCustomProps & {
    title: string,
    onPress?: () => void;
}

export function Button(props: Props) {
    const handlePress = () => {
        if (props.onPress) {
            props.onPress(); 
        }};

    return (
        <TouchableOpacity style={{ flex:1 }} onPress={handlePress}>
            <Box {...props}>
                <Text variant={props.variant === 'primary' ? 'button_primary' : 'button_secondary'}>
                    {props.title}
                </Text>
            </Box>
        </TouchableOpacity>
    )
}