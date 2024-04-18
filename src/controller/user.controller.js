const { connectionPromise } = require('../database');

// Inicializa la variable xpergg como un objeto vacío
let xpergg = {};

// Obtiene información de xpergg
function getXpergg(request, response) {
  if (xpergg) {
    response.send(xpergg);
  } else {
    response.status(404).send({ error: true, codigo: 404, message: 'don´t exist information of Data Base' });
  }
}

// incluir las funciones para este endpoints....

// Añade un User
async function addUserApi(req, res) {
    const connection = await connectionPromise;
    try {
        const { name, email, nationality, about_me, password, available_to_play, platform, interest, imgavatar } = req.body;
        await connection.query('INSERT INTO user (name, email, nationality, about_me, password, available_to_play, platform, interest, imgavatar) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [name, email, nationality, about_me, password, available_to_play, platform, interest, imgavatar]);
        res.status(201).send({ message: 'Usuario agregado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: true, codigo: 500, message: 'Error al agregar el usuario' });
    }
    console.log('Usuario añadido correctamente.');
  }
  
  //verifica User para Login

async function verifyUser(req, res) {
    const connection = await connectionPromise;
    try {
        const { name, password } = req.body; 

        // Consulta la base de datos y verifica el name y password.
        const query = 'SELECT * FROM user WHERE name = ? AND password = ?';
        const [user] = await connection.query(query, [name, password]);

        if (user) {
            res.status(200).send({ message: 'Usuario verificado correctamente', user });
        } else {
            res.status(401).send({ message: 'Credenciales incorrectas' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: true, codigo: 500, message: 'Error al verificar el usuario' });
    }
}

  async function getUserAndFriendsById(req, res) {
    const connection = await connectionPromise;
    try {
        const userId = req.params.id;
        const [userResult] = await connection.query('SELECT * FROM user WHERE user_id = ?', [userId]);
        const [friendsResult] = await connection.query('SELECT * FROM amigos WHERE user_id = ?', [userId]);
  
        const userData = userResult[0];
        const friendsData = friendsResult;
  
        const responseData = {
            user: userData,
            friends: friendsData
        };
  
        res.send(responseData);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: true, codigo: 500, message: '' });
    }
  }
  
  async function getUserInterests(req, res) {
    const connection = await connectionPromise;
    try {
        const userId = req.params.id;
  
        const [userInterestsResult] = await connection.query('SELECT interests FROM user WHERE user_id = ?', [userId]);
        const userInterests = userInterestsResult[0].interests;
  
        const [results] = await connection.query('SELECT * FROM user WHERE interests = ?', [userInterests]);
  
        res.send(results);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: true, codigo: 500, message: '' });
    }
  }
  
  async function updateUserAvailableApi(req, res) {
    const connection = await connectionPromise;
    const userId = req.params.id;
    const { available_to_play } = req.body; 
    try {
        await connection.query('UPDATE user SET Available_to_play = ? WHERE user_id = ?', [available_to_play, userId]);
        res.send('User availability updated successfully.');
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: true, codigo: 500, message: '' });
    }
  }

  // GET a la tabla user y tabla de friends, y trae un conteo.

const numberOfFriends = async(req, res) => {
    const connection = await connectionPromise;
    try{
      let sql;
      if(req.query.id){
        const userId = req.query.id;
        sql =`SELECT COUNT (user_id_1), from xpergg.friends WHERE status = 1`;
      }else{
        console.log("User not found")
      }
      let[result]= await connection.query(sql);
      res.send(result)
    } catch(error){
      console.log('Error getting friends from User', error);
      res.status(500).send('Internal server error')
    }
    }


    // PUT a la tabla de user con password.

const modifyPassword = async(req, res) => {
    const connection = await connectionPromise;
    try{
      const {user_id, password} = req.body;
      let sql;
      sql = `UPDATE xpergg.user SET password = '${password}' WHERE user_id = '${user_id}'`
      let [result] = await connection.query(sql);
      res.send(result)
    }catch(error){
      console.log(error)
    }
    }

    module.exports = { getXpergg, addUserApi, addUserApi, getUserAndFriendsById,getUserInterests,
         updateUserAvailableApi, numberOfFriends, modifyPassword, verifyUser}