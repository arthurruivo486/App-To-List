export const development = {

    client: 'sqlite3',
    connection: {
        filename: './db/db.sqlite',
    },
    migrations: {
        directory: './db/migrations', // ✅ CORRETO
    },
    useNullAsDefault: true,

};