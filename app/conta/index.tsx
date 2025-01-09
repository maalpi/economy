import { createBox, createText, ThemeProvider } from "@shopify/restyle";
import { theme, ThemeProps } from '@/app/theme';
import { FlatList } from "react-native";
import { useState } from "react";

import ModalT from "@/components/modal";
import { Button } from "@/components/button";

const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();

export default function Conta() {
    const [contas, setContas] = useState<string[]>([]);
    return (
        <ThemeProvider theme={theme}>
            <Box flex={1} bg="primary_200" justifyContent="center" alignItems="center" p='m'>

            <Box alignSelf="center">
                {contas.length === 0 ? (
                    <Text variant="subtitle">nenhuma conta existente</Text>
                ) : (
                    <FlatList
                        data={contas}
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
