import Database from "better-sqlite3";
import { dbPath } from "../src/utils/dbpath.js";

console.log("Caminho importado: " + dbPath);

let db = null;

try {
    db = new Database(dbPath, {
        verbose: console.log, // Isso está ok
    });
    console.log("Banco de dados conectado com sucesso!");
} catch (error) {
    console.log("Erro ao conectar ao banco:", error);
}

export default db;