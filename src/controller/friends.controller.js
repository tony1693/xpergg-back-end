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

// Consulta para actualizar el STATUS de la tabla friends como "TRUE" si aceptas la solicitud de amistad y como "FALSE" sino la aceptas.
async function handleFriendRequest(req, res) {
    const connection = await connectionPromise;
    try {
        const { acceptFriendRequest, user_id_1, user_id_2 } = req.body;
        await connection.execute(
            'UPDATE friends SET status = ? WHERE (user_id_1 = ? AND user_id_2 = ?) OR (user_id_1 = ? AND user_id_2 = ?)',
            [acceptFriendRequest, user_id_1, user_id_2, user_id_2, user_id_1]
        );
        if (acceptFriendRequest) {
            console.log('Solicitud de amistad aceptada correctamente.');
        } else {
            console.log('Solicitud de amistad denegada correctamente.');
        }
        res.status(201).send({ message: 'Actualización de solicitud de amistad exitosa' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: true, codigo: 500, message: 'Error al actualizar la solicitud de amistad' });
    }
  }
  
  // POST a la tabla de friends y con statuspendiente.
const addfriendsStatusPending = async (req, res) => {
    const connection = await connectionPromise;
    try {
      console.log(req.body);
      let sql = `INSERT INTO xpergg.friends (user_id_1, user_id_2, status) VALUES (2, 2, 1);`;
      let [result] = await connection.query(sql);
      console.log(result);
      res.send(result);
    }
    catch (err) {
      console.log(err);
      res.status(500).send('Error al crear.');
    }
  }

   // GET de la tabla de friends:

const getFriendsTable = async(req, res) => {
    const connection = await connectionPromise;
    try{
      const {user_id } = req.body
      let sql;
      sql = `SELECT * FROM xpergg.friends WHERE user_id = ${user_id }`;
      let [result] = await connection.query(sql);
        res.send(result)
    } catch(error){
      console.log('Error getting friends from user',error)
      res.status(500).send('Internal server error')
    }
  }
  
  // PUT a la tabla de friends. (Cambiar status de pendiente a aceptado)

const changeFriendStatus = async(req, res) => {
    const connection = await connectionPromise;
    try{
      const {user_id_1, user_id_2} = req.body;
      let friends = 1;
    sql = `UPDATE xpergg.friends SET status = ${friends} WHERE user_id_1=${user_id_1} AND  user_id_2=${user_id_2};`;
    let[result] = await connection.query(sql);
      res.send(result)
    }catch(error){
      console.log(error)
    }
    }
  
    module.exports = { getXpergg, addfriendsStatusPending, handleFriendRequest, getFriendsTable, changeFriendStatus}