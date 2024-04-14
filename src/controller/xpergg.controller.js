const { connectionPromise } = require('../database');

// Inicializa la variable xpergg como un objeto vacío
let xpergg = {};

// Obtiene información de xpergg
function getXpergg(request, response) {
  if (xpergg) {
    response.send();xpergg
  } else {
    response.status(404).send({ error: true, codigo: 404, message: 'don´t exist information of Data Base' });
  }
}



// Obtiene todos los usuarios...
async function getUsersApi(req, res) {
    const connection = await connectionPromise;
    try {
      const [results] = await connection.query('SELECT * FROM user');
      res.send(results);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: true, codigo: 500, message: 'error getting users' });
    }
  }

  // Obtiene un User por su Id
async function getUserByIdApi(req, res) {
    const connection = await connectionPromise;
    try {
      const [results] = await connection.query('SELECT * FROM user WHERE user_id = ?', [req.params.id]);
      if (results.length > 0) {
        res.send(results[0]);
      } else {
        res.status(404).send({ error: true, codigo: 404, message: 'User not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: true, codigo: 500, message: 'error getting a user' });
    }
  }

//   Añade un User

  async function addUserApi(req, res) {
    const connection = await connectionPromise;
    try {
        const { username, email, role } = req.body; // Supongo que los datos del usuario vienen en el cuerpo de la solicitud
        await connection.query('INSERT INTO users (username, email, role) VALUES (?, ?, ?)', [username, email, role]);
        res.status(201).send({ message: 'Usuario agregado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: true, codigo: 500, message: 'Error al agregar el usuario' });
    }
}


  // Actualiza un User
async function updateUserApi(req, res) {
    const connection = await connectionPromise;
    const sql = 'UPDATE user SET ? WHERE user_id = ?';
    const studentObj = req.body;
    try {
      await connection.query(sql, [studentObj, req.params.id]);
      res.send('user updated successfully.');
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: true, codigo: 500, message: 'error updating user' });
    }
  }

  // Eliminar User
  async function deleteUserApi(req, res) {
    const connection = await connectionPromise;
    try {
      const studentId = req.params.id;
      await connection.query('DELETE FROM user WHERE user_id = ?', [userId]);
      res.send('user deleted successfully.');
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).send('error when deleting user.');
    }
  }

  // Insertar a partir de aqui, todos los endpoints que falten,.........





  module.exports = { getXpergg, getUsersApi, getUserByIdApi, addUserApi, updateUserApi, deleteUserApi }