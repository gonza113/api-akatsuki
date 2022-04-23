const { Pool } = require("pg");


const config = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    pasword: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
};

const pool = new Pool(config);

module.export = {
    query: (query, parametros) => pool.query(query, parametros),
};