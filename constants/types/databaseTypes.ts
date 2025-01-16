export interface Produto {
    id: number;
    nome: string;
    data_criacao: string;
    descricao?: string;
    cidade?: string; 
  }
  
  export interface Detalhe {
    id: number;
    produto_id: number;
    quantidade: number;
    preco: number;
  }
  