import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBox, createText, ThemeProvider } from "@shopify/restyle";
import { theme, ThemeProps } from '@/app/theme';
import { FlatList } from "react-native";
import { useEffect, useState } from "react";
import { LinearGradient } from 'expo-linear-gradient';

import ModalT from "@/components/modal";
import { Button } from "@/components/button";
import { ButtonTwo } from '@/components/button_two';

const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();

export default function Economiza() {
    const [produtos, setProdutos] = useState<string[]>([]);

    useEffect(() => {
        const carregarProdutos = async () => {
          const produtosSalvos = await AsyncStorage.getItem('@produtos');
          if (produtosSalvos) {
            setProdutos(JSON.parse(produtosSalvos));
          }
        };
        carregarProdutos();
    }, []);

    const adicionarProduto = async (produto: string) => {
        const novaLista = [...produtos, produto];
        setProdutos(novaLista);
        await AsyncStorage.setItem('@produtos', JSON.stringify(novaLista));
    };

    return (
        <ThemeProvider theme={theme}>
            <Box flex={1} bg="white" justifyContent="center" alignItems="center" >
            <LinearGradient 
            style={{
                height: '55%', 
                width: '100%', 
                marginTop: 15, 
                borderRadius: 5,
                alignItems:"flex-start",
                justifyContent:"flex-end"
            }}
                start={{x:0,y:1}}
                end={{x:1,y:0}}
                colors={['#628B35','#103713']}>
                    <Text variant="title2" color="white" p='m'>Adicione ou selecione um produto:</Text>
            </LinearGradient>

                <Box alignSelf="center">
                    {produtos.length === 0 ? (
                        <Text variant="subtitle">nenhum produto adicionado</Text>
                    ) : (
                        <FlatList
                            data={produtos}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => <ButtonTwo title={item} variant="primary"></ButtonTwo>}
                        />
                    )}
                </Box>
            </Box>

            <Box 
                zIndex={999999}
                alignSelf="flex-end"
                justifyContent="flex-end"
                p="s"
                bottom="12%"
                width="22.5%"
                borderRadius={20}
            >
                <ModalT placeholder="água mineral" onAdd={(produto) => adicionarProduto(produto)} title="ao seu produto"></ModalT>
            </Box>
        </ThemeProvider>
    );
}
