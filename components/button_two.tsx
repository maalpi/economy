import { createRestyleComponent, createText, createVariant, spacing, SpacingProps, VariantProps, useTheme } from "@shopify/restyle";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { ThemeProps } from "@/app/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { Button } from "react-native-paper";

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

export function ButtonTwo(props: Props) {

    const theme = useTheme<ThemeProps>();

    const handlePress = () => {
        if (props.onPress) {
            props.onPress(); 
        }};

    return (
        <SafeAreaView style={{ flex:1, padding: '5%', alignContent:'flex-start' ,minWidth:320, minHeight:120, backgroundColor: '#103713', margin:'2%' , elevation: 20, borderRadius: 20 }}>
            
            <TouchableOpacity onPress={handlePress} style={{backgroundColor:'#000', width: '40%', zIndex: 9999999999}}>sdfnjsjnfnj
            {props.title ? (
                <Text variant={props.variant === 'primary' ? 'button_primary' : 'button_secondary'}>
                    {props.title}
                </Text> ) : (
                    <MaterialIcons name={props.icon} size={24} color={theme.colors.primary_200}/>
                )};
            </TouchableOpacity>

        </SafeAreaView>
    )
}