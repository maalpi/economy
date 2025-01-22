import { useSQLiteContext } from "expo-sqlite";

export type ProductDatabase = {
  id: number;
  nome: string;
  data_criacao: string;
  descricao?: string;
  cidade?: string; 
}

export function useProductDatabase(){
  const database = useSQLiteContext()

  async function create( data: Omit<ProductDatabase, 'id'> ) {
    const statement = await database.prepareAsync(
      "INSERT INTO products (nome, data_criacao, descricao, cidade) VALUES ($name, $data_criacao, $descricao, $cidade)"
    )
    try{
      
    } catch(e) {
        throw e
    }
  }


  return { create }
}