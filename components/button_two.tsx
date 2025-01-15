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
        <SafeAreaView style={{ flex:1, padding: '5%', alignContent:'flex-start' ,minWidth:320, height: 100, backgroundColor: '#E2D8D0', margin:'2%', borderRadius: 10 }}>
            
            {props.title ? (
                <SafeAreaView style={{display: 'flex', flexDirection: 'row', elevation: 20}}>
                    <TouchableOpacity onPress={handlePress} style={{backgroundColor:'#000', width: '40%', height:'100%', zIndex: 9999999999}}>
                        <Text variant={props.variant === 'primary' ? 'button_primary' : 'button_secondary'}>
                            {props.title}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{backgroundColor:'transparent', height:'100%',alignSelf:'flex-end',position:'absolute', marginLeft:'92%', zIndex: 9999999999}}>
                        <MaterialIcons name="delete" size={24} color='red'></MaterialIcons>
                    </TouchableOpacity>
                </SafeAreaView>
                 ) : (
                    <MaterialIcons name={props.icon} size={24} color={theme.colors.primary_200}/>
                )};

        </SafeAreaView>
    )
}