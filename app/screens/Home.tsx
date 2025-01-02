import { createBox, createText } from "@shopify/restyle";
import { ThemeProps } from "../theme";

/* components*/
import { Item } from "@/components/item";
import { Button } from "@/components/button";

const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();


export function Home() {
    return (
        <Box flex={1} bg="primary_800" justifyContent="center" alignItems="center" p='m'>
            <Box width='100%' bg="white" borderRadius={5} p='s'>
                <Text variant="title">
                    Plano Trimestral
                </Text>

                <Box gap="m" borderTopWidth={1} borderColor="gray" pt="xl">
                    <Item icon="timer" title="Entrega em 72 horas"/>
                    <Item icon="local-shipping" title="Delivery gratis"/>
                    <Item icon="credit-card" title="R$ 99,90 por mês"/>
                </Box>
                <Box flexDirection="row" mt="xl" gap="m">
                    <Button title="Simular" variant="secondary"/>
                    <Button title="Contratar" variant="primary"/>
                </Box>
            </Box>
        </Box>
    )
}