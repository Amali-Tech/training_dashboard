require("dotenv").config(); 
const Pool = require('pg').Pool;

console.log(process.env.host)

const pool = new Pool ({
    user: process.env.user || 'potsgres',
    password: process.env.password || 'amalitech',
    host: process.env.host || 'aegis-live.ck0dwzfc16xf.eu-west-1.rds.amazonaws.com',
    port: process.env.port || '5432',
    database: process.env.database || 'training_dashboard'
});

module.exports = pool;