// database.ts
import { type SQLiteDatabase} from 'expo-sqlite';

export async function initializeDatabase(database:SQLiteDatabase) {
  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS produtos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    data_criacao TEXT NOT NULL,
    descricao TEXT,
    cidade TEXT
  );
  `)

  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS detalhes_produtos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    produto_id INTEGER NOT NULL,
    quantidade REAL NOT NULL,
    preco REAL NOT NULL,
    FOREIGN KEY (produto_id) REFERENCES produtos(id)
    );
  `)
}