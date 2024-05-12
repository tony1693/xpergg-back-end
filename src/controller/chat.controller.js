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


// Función asíncrona para manejar la solicitud POST a la tabla chat_messages
const postChatMessage = async (req, res) => {
  try {
    // Extrae los datos del mensaje del cuerpo de la solicitud
    let { chat_message_id, date, user_id, text, chat_id } = req.body;

    // Convierte la fecha a un formato que MySQL pueda interpretar correctamente
    // date = new Date(date).toISOString().slice(0, 19).replace('T', ' ');

    // Define la consulta SQL para insertar el nuevo mensaje
    const query = 'INSERT INTO chat_messages (chat_message_id, date, user_id, text, chat_id) VALUES (?, ?, ?, ?, ?)';
    const values = [chat_message_id, date, user_id, text, chat_id];

    // Ejecuta la consulta en la base de datos
    const connection = await connectionPromise;
    await connection.query(query, values);

    // Envía una respuesta de éxito
    res.status(201).send('Mensaje creado con éxito');
  } catch (error) {
    // Maneja cualquier error que ocurra durante la inserción
    console.error(error);
    res.status(500).send('Error al crear el mensaje');
  }
};


const getChatMessagesByChatId = async (req, res) => {
  try {
    const connection = await connectionPromise;
    const chatId = req.params.chat_id;

    const query = `
      SELECT *
      FROM chat_messages
      WHERE chat_id = ?
      ORDER BY date ASC;
    `;

    const [result] = await connection.query(query, [chatId]);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor al recuperar los mensajes de chat');
  }
};




// GET a la tabla chat y tabla de user

const chatsUser = async (req, res) => {
  const connection = await connectionPromise;
  try {
    let sql;
    if (req.query.id) {
      const userId = req.query.id
      sql = `SELECT chat_id, user_id_sender, user_id_receiver FROM chat JOIN user ON (chat.user_id_sender = user.user_id) OR (chat.user_id_receiver = user.user_id) WHERE user_id=${userId}`
    }
    else {
      console.log("No hay chats para este usuario")
    }
    let [result] = await connection.query(sql);
    res.send(result)
  } catch (error) {
    console.log("Error getting chats from User", error);
    res.status(500).send('Internal server error')
  }
}

const getThreadById = async (req, res) => {
  try {
    const connection = await connectionPromise;
    const query = 'SELECT * FROM threads WHERE thread_id = ?';
    const values = [req.params.id];
    const [result] = await connection.query(query, values);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el servidor al recuperar el hilo');
  }
}

// Obtener datos de chat_messages y user
const getChatData = async (req, res) => {
  setTimeout(async () => {
    try {
      const connection = await connectionPromise;
      const query = `
        SELECT cm.chat_message_id, cm.text, cm.date, u.name, u.imgavatar
        FROM chat_messages cm
        INNER JOIN user u ON cm.user_id = u.user_id
        WHERE cm.chat_id = ?;`;

      const [chatData] = await connection.query(query, [req.params.chatId]);

      console.log('Chat data retrieved:', chatData); // Agrega este registro

      res.json(chatData);
    } catch (error) {
      console.error('Error al obtener datos del chat:', error.message); // Agrega más detalles al mensaje de error
      res.status(500).json({ error: 'Error al obtener datos del chat' });
    }
  }, 1000); // Retraso de 1 segundo
}

// Función asíncrona para obtener el user_id de la tabla chat_messages
const getMessageChatUserId = async (req, res) => {
  try {
    const connection = await connectionPromise;
    const chatId = req.params.chatId;

    const query = 'SELECT user_id FROM chat_messages WHERE chat_id = ?';
    const values = [chatId];

    const [result] = await connection.query(query, values);
    
    // Verifica si el resultado de la consulta es undefined
    if (!result || result.length === 0) {
      res.status(404).send('No se encontró ningún mensaje para el chatId dado');
    } else {
      res.json(result[0].user_id);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener el user_id');
  }
};





module.exports = { getXpergg, getChatMessagesByChatId, postChatMessage, chatsUser, getThreadById, getChatData, getMessageChatUserId}

