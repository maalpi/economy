// index.tsx
import { createBox, createText, ThemeProvider } from "@shopify/restyle";
import { theme, ThemeProps } from '@/app/theme';
import { FlatList, SafeAreaView } from "react-native";
import { useEffect, useState } from "react";
import { ContaDatabase, useContaDatabase } from '../../hooks/useContas';

import ModalT from "@/components/modal";
import { ButtonTwo } from '@/components/button_two';


const Box = createBox<ThemeProps>();
const Text = createText<ThemeProps>();

export default function Economiza() {
    const productDatabase = useContaDatabase();
    const [produtos, setProdutos] = useState<ContaDatabase[]>([]);

    // Função para criar um novo produto
    async function adicionarConta({ nome, descricao, cidade, data_criacao }: Omit<ContaDatabase, "id">) {
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
            <Box  bg="royal" justifyContent="center" alignItems="center" >
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
                    <Text variant="title2" color="white" p='m'>Adicione ou selecione uma conta:</Text>
            </SafeAreaView>

                <Box alignSelf="center" mt='s' mb='xl' height={480}>
                    {produtos.length === 0 ? (
                        <Text variant="subtitle" style={{color:'white', fontFamily: 'Arimo_700Bold'}}>nenhuma conta adicionado</Text>
                    ) : (
                        <FlatList
                            data={produtos}
                            keyExtractor={(item, index) => index.toString()}
                            style={{marginTop:'2%',minWidth:330,}}
                            renderItem={({ item }) => <ButtonTwo title={item.nome} 
                                                                 cidade={item.cidade} 
                                                                 descricao={item.descricao} 
                                                                 data={item.data_criacao} 
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
                            adicionarConta({
                              nome,
                              descricao,
                              cidade,
                              data_criacao,
                            })
                          }
                        title="a sua conta"
                        buttonVariant="modalConta"
                        ></ModalT>
            </Box>
            
        </ThemeProvider>
        </SafeAreaView>
    );
}
