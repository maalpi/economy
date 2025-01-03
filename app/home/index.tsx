import { createBox, createText } from "@shopify/restyle";
import { ThemeProps } from "../theme";
import { Link } from "expo-router";
/* components*/
import { Item } from "@/components/item";
import { Button } from "@/components/button";
import { spacing } from '../theme/spacing';

const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();


export function Home() {
    return (
        <Box flex={1} bg="primary_800" justifyContent="center" alignItems="center" p='m'>
            <Box width='100%' justifyContent="center" alignItems="center" bg="white" borderRadius={5} p='xl'>
                <Text variant="title">
                    Economize
                </Text>

            </Box>
            <Box  width='100%' height='20%'  flexDirection="column" mt="xl" gap="xl">
                    <Button title="Preços" link="/economiza" variant="secondary"/>
                    <Button title="Conta" link="/conta" variant="primary"/>
            </Box>
        </Box>
    )
}