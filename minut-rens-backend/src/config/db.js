const mysql = require('mysql2/promise');
require('dotenv').config();

module.exports = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.ENVIROMENT === 'test' ? 'test_minut_rens' : process.env.DB_NAME
});