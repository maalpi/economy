// useProdutos.ts
import { useSQLiteContext } from "expo-sqlite";

export type ProductDatabase = {
  id: number;
  nome: string;
  data_criacao: string;
  descricao: string;
  cidade: string; 
}

export function useProductDatabase(){
  const database = useSQLiteContext()

  async function create( data: Omit<ProductDatabase, 'id'> ) {
    const statement = await database.prepareAsync(
      "INSERT INTO products (nome, data_criacao, descricao, cidade) VALUES (?, ?, ?, ?)"
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
      const query = "SELECT * FROM products"

      const response = await database.getAllAsync<ProductDatabase>(
        query
      )

      return response
    } catch (error) {
      throw error
    }
  }


  return { create, read }
}