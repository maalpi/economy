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

type ValidLinks = "/conta" | "/economiza";

type Props = BoxCustomProps & {
    title: string,
    link: ValidLinks 
}

export function Button(props: Props) {

    return (
        <TouchableOpacity style={{ flex:1 }} onPress={() => router.push(props.link)}>
            <Box {...props}>
                <Text variant={props.variant === 'primary' ? 'button_primary' : 'button_secondary'}>
                    {props.title}
                </Text>
            </Box>
        </TouchableOpacity>
    )
}