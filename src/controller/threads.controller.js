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
  // const connection = await connectionPromise;
  // try{
    // let sql;
    // sql = `SELECT * FROM xpergg.threads`;
    // let [result] = await connection.query(sql)
    // res.send(result)
  // } catch(error){
    // console.log(error)
  // }
  const connection = await connectionPromise;
    try {
    let sql;
    if(req.query.platform){
      const platform = req.query.platform;
      sql = `SELECT * FROM xpergg.threads WHERE platform = '${platform}'`
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

  // GET de un thread específico filtrado por nombre del juego

  const getOneThread = async (req, res) => {
    const connection = await connectionPromise;
    try{
      let sql;
      const searchedGame = req.body.game
      sql = `SELECT * FROM xpergg.threads WHERE game = '${searchedGame}' ORDER BY date DESC` 
      let result = await connection.query(sql)
      res.send(result)
    } catch(error){
      console.log(error)
    }
  }
  
  //POST a la tabla threads
  
  const postThread = async (req, res) => {
    const connection = await connectionPromise;
    try {
      // Extrae los datos del thread del cuerpo de la solicitud
      const { platform, game, subject, user_id, date } = req.body;

      // Define la consulta SQL para insertar el nuevo thread
      const query = 'INSERT INTO threads (platform, game, subject, user_id) VALUES (?, ?, ?, ?)';
      const values = [platform, game, subject, user_id];

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
    try {
      // Define la consulta SQL para obtener los threads con sus mensajes y usuarios
      const query = `
        SELECT th.*, tm.*, u.*
        FROM threads th
        JOIN threads_messages tm ON tm.thread_id = th.id
        JOIN user u ON u.id = th.user_id
        ORDER BY th.creation_date DESC;
      `;
      
      // Ejecuta la consulta en la base de datos y espera el resultado
      const result = await connectionPromise.query(query);
      
      // Envía los resultados de la consulta al cliente como una respuesta JSON
      res.json(result.rows);
    } catch (error) {
      // Si hay un error, se captura y se envía una respuesta de error
      console.error(error);
      res.status(500).send('Error al recuperar los threads con mensajes y usuarios');
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

  module.exports = { getXpergg, postThread, getThreads, getThreadsMessagesUsers, insertMessageThread, getOneThread}

