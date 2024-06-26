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

//GET a la tabla threads

const getThreads = async (req, res) => {

  const connection = await connectionPromise;
    try {
    let sql;
    if(req.query.platform){
      const platform = req.query.platform;
      sql = `SELECT * FROM xpergg.threads WHERE platform = '${platform}' ORDER BY date DESC`
    }
    else{
      return res.status(400).json({ error: "No se proporcionó una plataforma en la consulta." });
    }
    let [result] = await connection.query(sql);
    res.send(result)}
    catch(error){
      console.log("Error getting threads", error)
    }
  }
  
  
  //POST a la tabla threads
  
  const postThread = async (req, res) => {
    const connection = await connectionPromise;
    try {
      // Extrae los datos del thread del cuerpo de la solicitud
      const { platform, game, subject, user_id, date} = req.body;

      // Define la consulta SQL para insertar el nuevo thread
      const query = 'INSERT INTO threads (platform, game, subject, user_id, date) VALUES (?, ?, ?, ?, ?)';
      const values = [platform, game, subject, user_id, date];

      // Ejecuta la consulta en la base de datos
      await connection.query(query, values);
      // Envía una respuesta de éxito
      res.status(200).send({message: 'Hilo creado correctamente'});
    } catch (error) {
      // Maneja cualquier error que ocurra durante la inserción
      console.error(error);
      res.status(500).send('Error al crear el thread');
    }
  };
  
  //GET a la table threads con tabla messages, y con tabla de user.
  
  const getThreadsMessagesUsers = async (req, res) => {
    const connection = await connectionPromise;
    try {
      let thread_id = req.params.id
      // Define la consulta SQL para obtener los threads con sus mensajes y usuarios
      const sql = `SELECT threads_messages.thread_id, threads_messages.date, threads_messages.text, threads_messages.user_id, user.name AS user_name, user.imgavatar AS user_avatar
      FROM threads_messages 
      JOIN user ON threads_messages.user_id = user.user_id 
      WHERE threads_messages.thread_id =?
      ORDER BY threads_messages.date ASC`
      const [results] = await connection.query(sql,[ thread_id]);
      res.send(results);
    } catch (error) {
      // Si hay un error, se captura y se envía una respuesta de error
      console.error(error);
      res.status(500).send('Error al recuperar los threads con mensajes y usuarios');
    }
  }

  // Get a la tabla de threads by UserId

  const getUsersInThread = async (req, res) => {
    const connection = await connectionPromise;
    try{
      let thread_id = req.params.id;
    let sql;
    sql = `SELECT user.user_id, user.name, user.imgavatar 
    FROM xpergg.user
    JOIN xpergg.threads_messages ON user.user_id = threads_messages.user_id
    WHERE threads_messages.thread_id = ${thread_id}`
    const [result] = await connection.query(sql);
    res.send(result);
    } catch(error){
      console.log(error);
      res.status(500).send('Error al obtener los usuarios de este hilo');
    }
    
  } 

  
// Insertar un mensaje de un hilo en la tabla THREADS_MESSAGES.
async function insertMessageThread(req, res) {
    const connection = await connectionPromise;
    try {
        const { threads_message_id, date, user_id, text, thread_id} = req.body;
        console.log(thread_id)
        const sql = 'INSERT INTO threads_messages (threads_message_id, date, user_id, text, thread_id) VALUES (?, ?, ?, ?, ?)';
        await connection.query(sql, [threads_message_id, date, user_id, text, thread_id]);
        res.status(201).send({ message: 'Mensaje guardado correctamente.' });
    } catch (error) {
        console.error('Error al guardar el mensaje:', error);
        res.status(500).send({ error: true, codigo: 500, message: 'Error al guardar el mensaje' });
    }
  }

  module.exports = { getXpergg, postThread, getThreads, getThreadsMessagesUsers, insertMessageThread,getUsersInThread}

