import { createRestyleComponent, createText, createVariant, spacing, SpacingProps, VariantProps, useTheme } from "@shopify/restyle";
import { SafeAreaView, TouchableOpacity } from "react-native";
import { ThemeProps } from "@/app/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { Menu, Divider, IconButton } from 'react-native-paper';
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
    descricao?: string,
    cidade?: string,
    data?: string,
    onPress?: () => void;
    icon?: keyof typeof MaterialIcons.glyphMap;
}

export function ButtonTwo(props: Props) {

    const theme = useTheme<ThemeProps>();

    const handlePress = () => {
        if (props.onPress) {
            props.onPress(); 
        }};

    const editPress = () => {
        alert('editar clicado')};
    

    return (
        <TouchableOpacity onPress={handlePress} style={{ flex:1, padding: '5%', alignContent:'flex-start' ,minWidth:320, height: 100, backgroundColor: '#E2D8D0', margin:'2%', borderRadius: 10 }}>
            
            {props.title ? (
                <SafeAreaView style={{display: 'flex', flexDirection: 'row', elevation: 20}}>
                        <SafeAreaView style={{flexDirection: 'column'}}>
                            <SafeAreaView style={{flexDirection: 'row'}}>
                                <Text style={{fontSize:20, color:'black'}} variant={props.variant === 'primary' ? 'button_primary' : 'button_secondary'}>
                                    {props.title}
                                </Text>
                                <Text style={{fontSize:20}}> - </Text>
                                <Text style={{fontSize:20}}>{props.descricao}</Text>
                            </SafeAreaView>
                            <Text style={{fontSize:10, marginTop: '-5%'}}>{props.cidade}</Text>
                            <Text style={{fontSize:10, marginTop: '-5%'}}>{props.data}</Text>
                            
                        </SafeAreaView>

                    <TouchableOpacity onPress={editPress} style={{backgroundColor:'transparent', height:'100%',alignSelf:'flex-end',position:'absolute', marginLeft:'92%', zIndex: 9999999999}}>
                        <MaterialIcons name="more-vert" size={24} color='black'></MaterialIcons>
                    </TouchableOpacity>
                </SafeAreaView>
                 ) : (
                    <MaterialIcons name={props.icon} size={24} color={theme.colors.primary_200}/>
                )};

        </TouchableOpacity>
    )
}