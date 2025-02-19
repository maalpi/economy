// index.tsx
import { createBox, createText, ThemeProvider } from "@shopify/restyle";
import { theme, ThemeProps } from '@/app/theme';
import { FlatList, SafeAreaView } from "react-native";
import { useEffect, useState } from "react";
import { ProductDatabase, useProductDatabase } from '../../hooks/useProdutos';

import ModalT from "@/components/modal";
import { ButtonTwo } from '@/components/button_two';


const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();

export default function Economiza() {
    const productDatabase = useProductDatabase();
    const [produtos, setProdutos] = useState<ProductDatabase[]>([]);

    // Função para criar um novo produto
    async function adicionarProduto({ nome, descricao, cidade, data_criacao }: Omit<ProductDatabase, "id">) {
        try {
        await productDatabase.create({
            nome,
            descricao,
            cidade,
            data_criacao,
        });
        carregarProdutos(); // Atualiza a lista após adicionar
        } catch (error) {
        console.error('Erro ao adicionar produto:', error);
        }
    }

    // Função para carregar os produtos do banco
    async function carregarProdutos() {
        try {
        const resultado = await productDatabase.read(); // Nova função `read` no hook
        setProdutos(resultado); // Atualiza o estado com os produtos
        } catch (error) {
        console.error('Erro ao carregar produtos:', error);
        }
    }

    // Carregar os produtos na inicialização do componente
    useEffect(() => {
        carregarProdutos();
    }, []);
    
    const formatarData = (data: string): string => {
        return new Intl.DateTimeFormat("pt-BR", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }).format(new Date(data));
      };
    return (
        <SafeAreaView style={{flex: 1}}>
        <ThemeProvider theme={theme}>
            <Box  bg="skull_800" justifyContent="center" alignItems="center" >
            <SafeAreaView 
            style={{
                height: '28%', 
                width: '100%', 
                marginTop: 0, 
                borderRadius: 5,
                alignItems:"flex-start",
                justifyContent:"flex-end",
                
            }}
                >
                    <Text variant="title2" color="white" p='m'>Adicione ou selecione um produto:</Text>
            </SafeAreaView>

                <Box alignSelf="center" bg='primary_800' borderRadius={20} mt='s' mb='xl' height={480}>
                    {produtos.length === 0 ? (
                        <Text variant="subtitle">nenhum produto adicionado</Text>
                    ) : (
                        <FlatList
                            data={produtos}
                            keyExtractor={(item, index) => index.toString()}
                            style={{marginTop:'2%',minWidth:330,}}
                            renderItem={({ item }) => <ButtonTwo title={item.nome} 
                                                                 cidade={item.cidade} 
                                                                 descricao={item.descricao} 
                                                                 data={formatarData(item.data_criacao)} 
                                                                 variant="primary">                                                              
                                                      </ButtonTwo>}
                        />
                    )}
                </Box>
            </Box>
            

            <Box 
                
                zIndex={999999}
                alignSelf="flex-end"
                justifyContent="flex-end"
                p="m"
                bottom="16%"
                right='1.5%'
                width="22.5%"
                borderRadius={20}
            >
                <ModalT placeholder="1kg arroz" 
                        onAdd={({ nome, descricao, cidade, data_criacao }) => 
                            adicionarProduto({
                              nome,
                              descricao,
                              cidade,
                              data_criacao,
                            })
                          }
                        title="ao seu produto"></ModalT>
            </Box>
            
        </ThemeProvider>
        </SafeAreaView>
    );
}
