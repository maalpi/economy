import { createRestyleComponent, createText, createVariant, spacing, SpacingProps, VariantProps, useTheme } from "@shopify/restyle";
import { TouchableOpacity, View } from "react-native";
import { ThemeProps } from "@/app/theme";
import { MaterialIcons } from "@expo/vector-icons";
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming } from "react-native-reanimated";
import { useEffect } from "react";

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

    const floatAnim = useSharedValue(0);

    useEffect(() => {
        // Criando a animação de flutuação (sobe e desce infinitamente)
        floatAnim.value = withRepeat(
            withTiming(-5, { duration: 1000 }), // Sobe um pouco
            -1, // Repetir infinitamente
            true // Alterna entre valores (vai e volta)
        );
    }, []);

    // Aplicando a animação ao botão
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: floatAnim.value }],
    }));

    const handlePress = () => {
        if (props.onPress) {
            props.onPress(); 
        }};

    return (
        <View style={{flexDirection:'column',  minHeight: 60, justifyContent: "center", marginBottom:'10%'}}> 
        <Animated.View style={animatedStyle}>
            <TouchableOpacity style={{ flex:1 }} onPress={handlePress}>
                <Box {...props}>

                {props.title ? (
                    <Text variant={props.variant === 'primary' ? 'button_primary' : 'button_primary'}>
                        {props.title}
                    </Text> ) : (
                        <MaterialIcons name={props.icon} size={24} color={theme.colors.primary_200}/>
                    )};
                </Box>
                
            </TouchableOpacity>
        </Animated.View>  
        </View>   
    )
}