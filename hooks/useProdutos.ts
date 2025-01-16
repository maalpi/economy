import { useState, useEffect } from 'react';
import db from '@/services/database';
import { Produto } from '@/constants/types/databaseTypes';

// Hook para gerenciar produtos
export const useProdutos = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  // Função para carregar produtos
  const carregarProdutos = () => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM produtos ORDER BY data_criacao DESC;',
        [],
        (_, { rows: { _array } }) => setProdutos(_array),
        (_, error) => {
          console.error('Erro ao carregar produtos:', error);
          return false;
        }
      );
    });
  };

  // Função para adicionar um produto
  const adicionarProduto = (produto: Omit<Produto, 'id'>) => {
    const { nome, data_criacao, descricao, cidade } = produto;

    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO produtos (nome, data_criacao, descricao, cidade) VALUES (?, ?, ?, ?);',
        [nome, data_criacao, descricao, cidade],
        () => {
          console.log('Produto adicionado com sucesso!');
          carregarProdutos(); // Recarrega a lista após adicionar
        },
        (_, error) => {
          console.error('Erro ao adicionar produto:', error);
          return false;
        }
      );
    });
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  return {
    produtos,
    carregarProdutos,
    adicionarProduto,
  };
};
