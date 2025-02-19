import { createRestyleComponent, createText, createVariant, spacing, SpacingProps, VariantProps, useTheme } from "@shopify/restyle";
import { SafeAreaView, View, TouchableOpacity } from "react-native";
import { ThemeProps } from "@/app/theme";
import { MaterialIcons } from "@expo/vector-icons";
import { Menu, Divider, IconButton } from 'react-native-paper';
import { Button } from "react-native-paper";
import { Arimo_400Regular, Arimo_500Medium, Arimo_700Bold } from "@expo-google-fonts/arimo";

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
    const data = formatDate(props.data);

    const handlePress = () => {
        if (props.onPress) {
            props.onPress(); 
        }};

    const editPress = () => {
        alert('editar clicado')};
    
    function formatDate(dateString?: string){
        if (!dateString) return { dia: "", mes: "", ano: "", hora: "" };
          
        const date = new Date(dateString);
          
        return {
            dia: date.getDate().toString().padStart(2, "0"), // Dia formatado com 2 dígitos
            mes: (date.getMonth() + 1).toString().padStart(2, "0"), // Mês (começa em 0)
            ano: date.getFullYear().toString(), // Ano
            hora: date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true }) // Hora com AM/PM
        };
    };

    return (
        <TouchableOpacity onPress={handlePress} style={{ alignSelf:'center', flex:1, padding: '5%', alignContent:'flex-start' ,minWidth:310, height: 100, backgroundColor: '#fff', margin:'2%', borderRadius: 10 }}>
            
            {props.title ? (
                <SafeAreaView style={{display: 'flex', flexDirection: 'row', elevation: 20}}>
                            <SafeAreaView style={{flexDirection: 'column'}}>
                                
                                <Text style={{fontSize:18, marginTop: '-4%',fontFamily: 'Arimo_500Medium'}}>{data.mes}</Text>
                                <Text style={{fontSize:18, marginTop: '-20%', fontFamily: 'Arimo_500Medium'}}>{data.dia}</Text>
                                <Text style={{fontSize:10, marginTop: '5%', fontFamily: 'Arimo_400Regular'}}>{data.ano}</Text>
                                <Text style={{fontSize:10, fontFamily: 'Arimo_400Regular'}}>{data.hora}</Text>
                            </SafeAreaView>
                            <View style={{
                                width: 0.5,
                                height: '100%', // Ajuste conforme necessário
                                backgroundColor: "gray",
                                marginHorizontal: 6,
                            }} />
                            
                            <SafeAreaView style={{flexDirection: 'column', alignItems:'flex-start', justifyContent:'center', minWidth:200}}>
                                <Text style={{fontSize:16, color:'black',  maxWidth: 210, fontFamily: 'Arimo_500Medium', }} variant={props.variant === 'primary' ? 'button_primary' : 'button_secondary'}>
                                    {props.title}, {props.descricao}
                                </Text>
                                <View style={{
                                    width: 150,
                                    height: 0.4, // Ajuste conforme necessário
                                    backgroundColor: "gray",
                                    marginVertical: 5,
                                    position:'fixed'
                                }} />
                                <Text style={{fontSize:16, color:'black',  maxWidth: 280, fontFamily: 'Arimo_500Medium', }} variant={props.variant === 'primary' ? 'button_primary' : 'button_secondary'}>
                                    {props.cidade}
                                </Text>
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