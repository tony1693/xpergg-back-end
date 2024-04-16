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


// Insertar un mensaje de un hilo en la tabla THREADS_MESSAGES.
async function insertMessageThread(req, res) {
  const connection = await connectionPromise;
  try {
      const { threads_message_id, date, user_id, text, thread_id} = req.body;
      const sql = 'INSERT INTO threads_messages (threads_message_id, date, user_id, text, thread_id) VALUES (?, ?, ?, ?, ?)';
      await connection.query(sql, [threads_message_id, date, user_id, text,thread_id]);
      res.status(201).send({ message: 'Mensaje guardado correctamente.' });
  } catch (error) {
      console.error('Error al guardar el mensaje:', error);
      res.status(500).send({ error: true, codigo: 500, message: 'Error al guardar el mensaje' });
  }
}


module.exports = { getXpergg, addUserApi, handleFriendRequest, insertMessageThread};
