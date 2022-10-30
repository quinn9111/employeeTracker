const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'RiceUniversity2022!',
        database: 'employees'
    },
);

module.exports = db;