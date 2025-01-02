import { createBox, createText } from "@shopify/restyle";
import { ThemeProps } from "@/app/theme";
import { MaterialIcons } from "@expo/vector-icons";

const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();

type Props = {
    title: string;
    icon: keyof typeof MaterialIcons.glyphMap;
}

export function Item({title, icon}: Props) {
    return (
        <Box>
            <MaterialIcons name={icon} size={24}/>
            <Text variant="title">
                Plano Trimestral
            </Text>
        </Box>

    )
}