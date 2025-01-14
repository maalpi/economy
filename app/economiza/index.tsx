import AsyncStorage from '@react-native-async-storage/async-storage';
import { createBox, createText, ThemeProvider } from "@shopify/restyle";
import { theme, ThemeProps } from '@/app/theme';
import { FlatList, SafeAreaView } from "react-native";
import { useEffect, useState } from "react";

import ModalT from "@/components/modal";
import { Button } from "@/components/button";

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
            <Box flex={1} bg="white" justifyContent="center" alignItems="center" pt='xxl' p='m'>

            <Box alignSelf="center">
                {produtos.length === 0 ? (
                    <Text variant="subtitle">nenhum produto adicionado</Text>
                ) : (
                    <FlatList
                        data={produtos}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => <Text variant="title">{item}</Text>}
                    />
                )}
            </Box>
            </Box>

            <Box 
                zIndex={999999}
                alignSelf="flex-end"
                justifyContent="flex-end"
                p='s'
                bottom='12%'
                width='22.5%'
                borderRadius={20}
            >
                {/* <Button icon='add-task' variant="modal" /> */}
                <ModalT placeholder="água mineral" onAdd={(produto) => adicionarProduto(produto)} title="ao seu produto"></ModalT>
            </Box>
        </ThemeProvider>
    )
}
