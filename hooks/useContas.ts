// useProdutos.ts
import { useSQLiteContext } from "expo-sqlite";

export type ContaDatabase = {
  id: number;
  nome: string;
  data_criacao: string;
  descricao: string;
  cidade: string; 
}

export function useContaDatabase(){
  const database = useSQLiteContext()

  async function create( data: Omit<ContaDatabase, 'id'> ) {
    const statement = await database.prepareAsync(
      "INSERT INTO contas (nome, data_criacao, descricao, cidade) VALUES (?, ?, ?, ?)"
    )
    try{
      const result = await statement.executeAsync([
        data.nome,
        data.data_criacao,
        data.descricao,
        data.cidade,
      ])
    } catch(e) {
        throw e
    }
  }

  async function read() {
    try {
      const query = "SELECT * FROM contas"

      const response = await database.getAllAsync<ContaDatabase>(
        query
      )

      return response
    } catch (error) {
      throw error
    }
  }


  return { create, read }
}