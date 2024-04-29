const mysql = require('mysql2/promise');

async function createConnection() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
<<<<<<< HEAD
        password: 'Miisima79++', // meter aquí vuestra contraseña de acceso a la BDD.
=======
 // meter aquí vuestra contraseña de acceso a la BDD.
        password: 'codenotch1805', // meter aquí vuestra contraseña de acceso a la BDD.
>>>>>>> 6bb605def0434e0503fb0f79382344c5b6a54f8e
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