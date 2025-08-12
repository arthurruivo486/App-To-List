import path from "node:path";
import {fileURLToPath} from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log("Caminho: "+__dirname)

export const dbPath = path.resolve(__dirname, "../../db/db.sqlite");