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


//GET a la tabla chat y tabla message, y tabla de user. (order by date)
const getChatMessages = async (req, res) => {
    try {
      // Define la consulta SQL para obtener la información deseada.
      const query = `
        SELECT u.*, c.*, m.*
        FROM user u
        JOIN chat_messages m ON m.user_id = u.id
        JOIN chat c ON c.id = m.chat_id
        ORDER BY m.date DESC;
      `;
      // Ejecuta la consulta en la base de datos y espera el resultado.
      const result = await connectionPromise.query(query);
      // Envía los resultados de la consulta al cliente como una respuesta JSON.
      res.json(result.rows);
    } catch (error) {
      // Si ocurre un error durante la consulta o en otro lugar, captúralo.
      console.error(error);
      // Envía una respuesta de error al cliente.
      res.status(500).send('Error en el servidor al recuperar los mensajes de chat');
    }
  };

  // POST a la tabla chatmessages

// Función asíncrona para manejar la solicitud POST
const postChatMessage = async (req, res) => {
  try {
    // Extrae los datos del mensaje del cuerpo de la solicitud
    const { userId, text, chatId } = req.body;

    // Define la consulta SQL para insertar el nuevo mensaje
    const query = 'INSERT INTO chat_messages (user_id, text, chat_id, date) VALUES (?, ?, ?, NOW())';
    const values = [userId, text, chatId];

    // Ejecuta la consulta en la base de datos
    await connectionPromise.query(query, values);

    // Envía una respuesta de éxito
    res.status(201).send('Mensaje creado con éxito');
  } catch (error) {
    // Maneja cualquier error que ocurra durante la inserción
    console.error(error);
    res.status(500).send('Error al crear el mensaje');
  }
};
  // GET a la tabla chat y tabla de user

  const chatsUser = async(req,res) => {
    const connection = await connectionPromise;
    try{
      let sql;
      if(req.query.id){
        const userId = req.query.id
        sql = `SELECT chat_id, user_id_sender, user_id_receiver FROM chat JOIN user ON (chat.user_id_sender = user.user_id) OR (chat.user_id_receiver = user.user_id) WHERE user_id=${userId}`
      }
      else{
        console.log("No hay chats para este usuario")
      }
      let[result] = await connection.query(sql);
      res.send(result)
    } catch(error){
      console.log("Error getting chats from User", error);
      res.status(500).send('Internal server error')
    }
    }

module.exports = { getXpergg, getChatMessages, postChatMessage, chatsUser}

