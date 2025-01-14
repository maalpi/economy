import { createBox, createText, ThemeProvider } from "@shopify/restyle";
import { theme, ThemeProps } from '@/app/theme';
import { FlatList } from "react-native";
import { useState } from "react";

import ModalT from "@/components/modal";
import { Button } from "@/components/button";

const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();

export default function Economiza() {
    const [produtos, setProdutos] = useState<string[]>([]);
    return (
        <ThemeProvider theme={theme}>
            <Box flex={1} bg="white" justifyContent="center" alignItems="center" p='m'>

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
                <ModalT></ModalT>
            </Box>
        </ThemeProvider>
    )
}
