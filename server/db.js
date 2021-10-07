require('dotenv').config({ path: '../.env' });
const Pool = require('pg').Pool;

console.log(process.env.host)

const pool = new Pool ({
    user: process.env.user,
    password: process.env.password,
    host: process.env.host,
    database: process.env.database
});

module.exports = pool;