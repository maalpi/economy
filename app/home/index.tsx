import { createBox } from "@shopify/restyle";
import { ThemeProps } from "../theme";
import { Button } from "@/components/button";
import { router } from "expo-router";
import {  Circle, Text as SvgText, Path, Rect, Polygon ,TextPath, TSpan, G, Svg }
  from 'react-native-svg';
import { Image, View } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming, withRepeat } from "react-native-reanimated";
import { useEffect } from "react";


const Box = createBox<ThemeProps>();

export function Home() {

    const cloudX = useSharedValue(-100); // Começa fora da tela, à esquerda

    useEffect(() => {
      cloudX.value = withRepeat(
        withTiming(700, { duration: 15000 }), // Move até 300px (ajuste conforme a tela)
        -1, // -1 = animação infinita
        false // false = reinicia após chegar ao final
      );
    }, []);
  
    // Estilo animado para a nuvem
    const animatedCloudStyle = useAnimatedStyle(() => ({
      transform: [{ translateX: cloudX.value }],
    }));

    return (
        <>
        <Box flex={1} bg="sky" justifyContent="center" alignItems="center" p="m">
            {/* Box para conter o texto curvado */}
            <Box width="100%" alignItems="center" justifyContent="center">
            <Svg height="300" width="320"
                viewBox="-35 30 300 300">
                     <G id="circle">
                        <Circle
                        r={75}
                        x={150}
                        y={176}
                        fill="transparent"
                        stroke="transparent"
                        strokeWidth={14}
                        transform="rotate(-205)"
                        />
                    </G>
                <SvgText fill="#000" fontSize="42" fontFamily='Arimo_600SemiBold'>
                    <TextPath href="#circle">
                    <TSpan dx={120} dy={-20}>
                        economiza
                    </TSpan>
                    </TextPath>
                </SvgText>
                </Svg>
            </Box>
            <Animated.View style={[{ position: "absolute", bottom: "15%", left: "-80%" }, animatedCloudStyle]}>
                <Image source={require("@/assets/gif/cloud.gif")} style={{ width: 180, height: 80, resizeMode: "contain" }} />
            </Animated.View>
            <Svg 
                height="20%" // Altura responsiva
                width="20%"  // Largura responsiva
                viewBox="0 0 100 100"
                style={{ position: "absolute", bottom: "-5%", left: "5%" }} // Ajuste de posição
            >
                <Image
                    source={require("@/assets/gif/house.gif")} // Caminho do GIF
                    style={{
                        width: "100%",  // Ocupa toda a largura do SVG
                        height: "100%", // Ocupa toda a altura do SVG
                        resizeMode: "contain", // Mantém proporção
                        transform: [{scaleX:-1}]
                    }}
                />
            </Svg>
        </Box>
        <View style={{ position: "relative", backgroundColor: "rgb(135, 206, 235)", flex: 1, width: "100%" }}>
                <Svg height="100%" width="180%" viewBox="90 0 200 200" style={{ position: "absolute", top: 0 }}>
                    {/* Criando a curva da montanha */}
                    <Path

                        d="M 100,00 Q 100,-20 200,50 T 400,100 L 400,200 L 0,200 Z"
                        fill="#75B996"
                        
                    />

                </Svg>

                {/* Botões abaixo da montanha */}
                <View style={{ flexDirection: "column", width: "80%", height: "50%", marginTop: "20%", marginLeft: "14.8%" }}>
                    <Button title="Preços" onPress={() => router.push("../economiza")} variant="primary" />
                    <Button title="Conta" onPress={() => router.push("../conta")} variant="secondary" />
                </View>
            </View>
    </>
    );
}
