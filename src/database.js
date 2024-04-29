const mysql = require('mysql2/promise');

async function createConnection() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'Nuriatkm5', // meter aquí vuestra contraseña de acceso a la BDD.
        database: 'xpergg',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });

    console.log('connection with the created BBDD');
    return connection;
}

const connectionPromise = createConnection();

module.exports = { connectionPromise };