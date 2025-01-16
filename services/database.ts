import * as SQLite from 'expo-sqlite/legacy';


// Tipagem para resultados da execução de SQL
export interface SQLResult {
  rows: {
    _array: any[]; // Array contendo os dados das linhas
    length: number; // Número de linhas retornadas
  };
  insertId?: number; // ID da última inserção
  rowsAffected: number; // Número de linhas afetadas
}

// Abrir ou criar o banco de dados
const db = SQLite.openDatabase('app.db');

// Criar tabelas
 export const criarTabelas = (): void => {
   db.transaction((tx) => {
    // Tabela de produtos com os novos campos
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS produtos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        data_criacao TEXT NOT NULL,
        descricao TEXT,
        cidade TEXT
      );`
    );

    // Tabela de detalhes
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS detalhes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        produto_id INTEGER NOT NULL,
        quantidade REAL NOT NULL,
        preco REAL NOT NULL,
        FOREIGN KEY (produto_id) REFERENCES produtos(id)
      );`
    );
  });
};

export default db;
