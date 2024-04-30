const mysql = require('mysql2/promise');

async function createConnection() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
<<<<<<< HEAD
        password: 'Meneses23', // meter aquí vuestra contraseña de acceso a la BDD.
=======
        password: 'codenotch1805', // meter aquí vuestra contraseña de acceso a la BDD.
>>>>>>> 9cf550e6cd97072b741d05dfc8df776ab1751da1
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