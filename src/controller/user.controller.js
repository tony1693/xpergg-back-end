const { connectionPromise } = require('../database');

// Inicializa la variable xpergg como un objeto vacío
let xpergg = {};

// Obtiene información de xpergg
function getXpergg(request, response) {
  if (xpergg) {
    response.send(xpergg);
  } else {
    response.status(404).send({ error: true, codigo: 404, message: 'does not exist information of Data Base' });
  }
}

// incluir las funciones para este endpoints....

// Añade un User
async function register(req, res) {
  const connection = await connectionPromise;
  try {
      const { name, email, nationality, password, available_to_play, platform, interest } = req.body;
      console.log(req.body);

      // Consulta para verificar si el usuario ya existe
      const existingUser = await connection.query('SELECT user_id FROM xpergg.user WHERE email = ?', [email]);
      console.log(existingUser);
      if (existingUser[0].length > 0) {
          return res.status(400).send({ error: true, codigo: 400, message: 'El usuario ya está registrado. Por favor, prueba con otro usuario.' });
      }

      // Insertar el nuevo usuario sin las columnas about_me e imgavatar
      
      const insertUser = await connection.query('INSERT INTO xpergg.user (name, email, nationality, password, available_to_play, platform, interest) VALUES (?, ?, ?, ?, ?, ?, ?)', 
      [name, email, nationality, password, available_to_play, JSON.stringify(platform),  JSON.stringify(interest)]);
      console.log(insertUser);
      const [user] = await connection.query('SELECT * FROM user WHERE user_id = ?' ,[insertUser[0].insertId]) 
      return res.status(200).send({ message: 'Usuario agregado exitosamente', user });
  } catch (error) {
      console.error(error);
      return res.status(500).send({ error: true, codigo: 500, message: 'Error al agregar el usuario' });
  }
}
  
  //verifica User para Login

async function login(req, res) {
    const connection = await connectionPromise;
    try {
        const { name, password } = req.body; 

        // Consulta la base de datos y verifica el name y password.
        const query = 'SELECT * FROM user WHERE name = ? AND password = ?';
        const [user] = await connection.query(query, [name, password]);
        console.log(user)
        if (user.length > 0) {
            res.status(200).send({ message: 'Usuario verificado correctamente', user });
        } else {
            res.status(401).send({ message: 'Credenciales incorrectas' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: true, codigo: 500, message: 'Error al verificar el usuario' });
    }
}

// Actualizar un usuario existente
async function updateUser(req, res) {
  try {
    const { imgavatar, name, email, nationality, about_me, password, available_to_play, platform, interest } = req.body;
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).send({ error: true, codigo: 400, message: 'El ID del usuario no está definido' });
    }

    const connection = await connectionPromise;

    // Obtén el usuario actual de la base de datos
    const [rows] = await connection.query('SELECT * FROM user WHERE user_id = ?', [userId]);
    const currentUser = rows[0];

    if (!currentUser) {
      return res.status(404).send({ error: true, codigo: 404, message: 'Usuario no encontrado' });
    }

    // Si un campo es undefined, usa el valor actual del usuario
    const updatedImgavatar = imgavatar !== undefined ? imgavatar : currentUser.imgavatar;
    const updatedName = name !== undefined ? name : currentUser.name;
    const updatedEmail = email !== undefined ? email : currentUser.email;
    const updatedNationality = nationality !== undefined ? nationality : currentUser.nationality;
    const updatedAboutMe = about_me !== undefined ? about_me : currentUser.about_me;
    const updatedPassword = password !== undefined ? password : currentUser.password;
    const updatedAvailableToPlay = available_to_play !== undefined ? available_to_play : currentUser.available_to_play;
    const updatedPlatform = platform !== undefined ? JSON.stringify(platform) : currentUser.platform;
    const updatedInterest = interest !== undefined ? JSON.stringify(interest) : currentUser.interest;

    const [result] = await connection.query('UPDATE xpergg.user SET imgavatar = ?, name = ?, email = ?, nationality = ?, about_me = ?, password = ?, available_to_play = ?, platform = ?, interest = ? WHERE user_id = ?', 
    [updatedImgavatar, updatedName, updatedEmail, updatedNationality, updatedAboutMe, updatedPassword, updatedAvailableToPlay, updatedPlatform, updatedInterest, userId]);
  
    console.log(result.affectedRows); // Imprime el número de filas afectadas

    await new Promise(resolve => setTimeout(resolve, 1000));   // Agregar un pequeño retraso

    const [updatedRows] = await connection.query('SELECT * FROM user WHERE user_id = ?', [userId]);
    const updatedUser = updatedRows[0];

    return res.status(200).send({ message: 'Usuario actualizado exitosamente', user: updatedUser });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: true, codigo: 500, message: 'Error al actualizar el usuario' });
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
    const userId = req.query.id;
    const { available_to_play } = req.body; 
    try {
        await connection.query('UPDATE user SET available_to_play = ? WHERE user_id = ?', [available_to_play ? 1 : 0, userId]);
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

  // Modificar avatar

  const modifyAvatar = async(req, res) => {
    const connection = await connectionPromise;
    try{
      const { user_id, imgavatar} = req.body;
      let sql;
      sql = `UPDATE xpergg.user SET imgavatar = '${imgavatar}' WHERE user_id = '${user_id}'`;  
      let [result] = await connection.query(sql);
      res.send(result)
    }
    catch(error){
      console.log(error)
    }
  }


    module.exports = { getXpergg, register, getUserAndFriendsById,getUserInterests,
    updateUserAvailableApi, numberOfFriends, modifyPassword, login,modifyAvatar, updateUser}
