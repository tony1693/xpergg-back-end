const { connectionPromise } = require('../database');

// Inicializa la variable xpergg como un objeto vacío
let xpergg = {};

// // Obtiene información de xpergg
// function getXpergg(request, response) {
//   if (xpergg) {
//     response.send(xpergg);
//   } else {
//     response.status(404).send({ error: true, codigo: 404, message: 'don´t exist information of Data Base' });
//   }
// }

// MIGUEL ENDPOINTS-QUERYS..................

// // Añade un User
// async function addUserApi(req, res) {
//   const connection = await connectionPromise;
//   try {
//       const { name, email, nationality, about_me, password, available_to_play, platform, interest, imgavatar } = req.body;
//       await connection.query('INSERT INTO user (name, email, nationality, about_me, password, available_to_play, platform, interest, imgavatar) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [name, email, nationality, about_me, password, available_to_play, platform, interest, imgavatar]);
//       res.status(201).send({ message: 'Usuario agregado exitosamente' });
//   } catch (error) {
//       console.error(error);
//       res.status(500).send({ error: true, codigo: 500, message: 'Error al agregar el usuario' });
//   }
//   console.log('Usuario añadido correctamente.');
// }


// // Consulta para actualizar el STATUS de la tabla friends como "TRUE" si aceptas la solicitud de amistad y como "FALSE" sino la aceptas.
// async function handleFriendRequest(req, res) {
//   const connection = await connectionPromise;
//   try {
//       const { acceptFriendRequest, user_id_1, user_id_2 } = req.body;
//       await connection.execute(
//           'UPDATE friends SET status = ? WHERE (user_id_1 = ? AND user_id_2 = ?) OR (user_id_1 = ? AND user_id_2 = ?)',
//           [acceptFriendRequest, user_id_1, user_id_2, user_id_2, user_id_1]
//       );
//       if (acceptFriendRequest) {
//           console.log('Solicitud de amistad aceptada correctamente.');
//       } else {
//           console.log('Solicitud de amistad denegada correctamente.');
//       }
//       res.status(201).send({ message: 'Actualización de solicitud de amistad exitosa' });
//   } catch (error) {
//       console.error(error);
//       res.status(500).send({ error: true, codigo: 500, message: 'Error al actualizar la solicitud de amistad' });
//   }
// }


// // Insertar un mensaje de un hilo en la tabla THREADS_MESSAGES.
// async function insertMessageThread(req, res) {
//   const connection = await connectionPromise;
//   try {
//       const { threads_message_id, date, user_id, text, thread_id} = req.body;
//       const sql = 'INSERT INTO threads_messages (threads_message_id, date, user_id, text, thread_id) VALUES (?, ?, ?, ?, ?)';
//       await connection.query(sql, [threads_message_id, date, user_id, text,thread_id]);
//       res.status(201).send({ message: 'Mensaje guardado correctamente.' });
//   } catch (error) {
//       console.error('Error al guardar el mensaje:', error);
//       res.status(500).send({ error: true, codigo: 500, message: 'Error al guardar el mensaje' });
//   }
// }


// RAFA ENDPOINTS-QUERYS..................

// //POST a la tabla comentarios
// const addComment = async (req, res) => {
//   const connection = await connectionPromise;
//   try {
//     console.log(req.body);
//     let sql = `INSERT INTO xpergg.comments (comment_id, date, text) VALUES (3, "2024-04-15", "hola3pruebapostman")`;
//     let [result] = await connection.query(sql);
//     console.log(result);
//     res.send(result);
//   }
//   catch (err) {
//     console.log(err);
//     res.status(500).send('Error al crear el comentario.');
//   }
// }

// //POST a la tabla Post-comment-user 
// const addPostCommentUser = async (req, res) => {
//   const connection = await connectionPromise;
//   try {
//     console.log(req.body);
//     let sql = `INSERT INTO xpergg.post_comment_user (post_id, comment_id, user_id) VALUES (1, 3, 1)`;
//     let [result] = await connection.query(sql);
//     console.log(result);
//     res.send(result);
//   }
//   catch (err) {
//     console.log(err);
//     res.status(500).send('Error al crear.');
//   }
// }


// //POST a la tabla notificaciones
// const addNotification = async (req, res) => {
//   const connection = await connectionPromise;
//   try {
//     console.log(req.body);
//     let sql = `INSERT INTO xpergg.notifications (notification_id, user_id, date, notification_type, new) VALUES (3, 2, "2024-04-16", "like", 1)`;
//     let [result] = await connection.query(sql);
//     console.log(result);
//     res.send(result);
//   }
//   catch (err) {
//     console.log(err);
//     res.status(500).send('Error al crear la notificación.');
//   }
// }


// //POST a la tabla reacciones 
// const addReaction = async (req, res) => {
//   const connection = await connectionPromise;
//   try {
//     console.log(req.body);
//     let sql = `INSERT INTO xpergg.reactions (reaction_id, date, reaction_type) VALUES (1, "2024-04-15", "like")`;
//     let [result] = await connection.query(sql);
//     console.log(result);
//     res.send(result);
//   }
//   catch (err) {
//     console.log(err);
//     res.status(500).send('Error al crear la reacción.');
//   }
// }


// //POST a la tabla Post-reaction-user 
// const addPostReactionUser = async (req, res) => {
//   const connection = await connectionPromise;
//   try {
//     console.log(req.body);
//     let sql = `INSERT INTO xpergg.post_reaction_user (post_id, reaction_id, user_id) VALUES (1, 1, 1)`;
//     let [result] = await connection.query(sql);
//     console.log(result);
//     res.send(result);
//   }
//   catch (err) {
//     console.log(err);
//     res.status(500).send('Error al crear.');
//   }
// }


// //GET a la tabla de notificaciones y que traiga el Count de las que tengan "new" en "true".
// const getNotificationNewTrue = async (req, res) => {
//   const connection = await connectionPromise;
//   try {
//     console.log(req.body);
//     let sql = `SELECT COUNT(*) AS Total_Notifications FROM xpergg.notifications WHERE new=1`;
//     let [result] = await connection.query(sql);
//     console.log(result);
//     res.send(result);
//   }
//   catch (err) {
//     console.log(err);
//     res.status(500).send('Error al crear.');
//   }
// }


// // PUT a la tabla de notificaciones y poner el "new" en false.
// const putNotificationNewFalse = async (req, res) => {
//   const connection = await connectionPromise;
//   try {
//     console.log(req.body);
//     let sql = `UPDATE xpergg.notifications SET new=0`;
//     let [result] = await connection.query(sql);
//     console.log(result);
//     res.send(result);
//   }
//   catch (err) {
//     console.log(err);
//     res.status(500).send('Error al crear.');
//   }
// }


// // DELETE a la tabla reacciones y la tabla de post-reaction-user.
// const deleteReaction = async (req, res) => {
//   const connection = await connectionPromise;
//   try {
//     console.log(req.body);
//     let sql = `DELETE FROM xpergg.reactions`;
//     let [result] = await connection.query(sql);
//     console.log(result);
//     res.send(result);
//   }
//   catch (err) {
//     console.log(err);
//     res.status(500).send('Error al crear.');
//   }
// }

// const deletePostReactionUser = async (req, res) => {
//   const connection = await connectionPromise;
//   try {
//     console.log(req.body);
//     let sql = `DELETE FROM xpergg.post_reaction_user`;
//     let [result] = await connection.query(sql);
//     console.log(result);
//     res.send(result);
//   }
//   catch (err) {
//     console.log(err);
//     res.status(500).send('Error al crear.');
//   }
// }


// // POST a la tabla de friends y con statuspendiente.
// const addfriendsStatusPending = async (req, res) => {
//   const connection = await connectionPromise;
//   try {
//     console.log(req.body);
//     let sql = `INSERT INTO xpergg.friends (user_id_1, user_id_2, status) VALUES (2, 2, 1);`;
//     let [result] = await connection.query(sql);
//     console.log(result);
//     res.send(result);
//   }
//   catch (err) {
//     console.log(err);
//     res.status(500).send('Error al crear.');
//   }
// }


// RUBEN ENDPOINTS-QUERYS..................

// //GET a la tabla chat y tabla message, y tabla de user. (order by date)
//   const getChatMessages = async (req, res) => {
//     try {
//       // Define la consulta SQL para obtener la información deseada.
//       const query = `
//         SELECT u.*, c.*, m.*
//         FROM user u
//         JOIN chat_messages m ON m.user_id = u.id
//         JOIN chat c ON c.id = m.chat_id
//         ORDER BY m.date DESC;
//       `;
//       // Ejecuta la consulta en la base de datos y espera el resultado.
//       const result = await connectionPromise.query(query);
//       // Envía los resultados de la consulta al cliente como una respuesta JSON.
//       res.json(result.rows);
//     } catch (error) {
//       // Si ocurre un error durante la consulta o en otro lugar, captúralo.
//       console.error(error);
//       // Envía una respuesta de error al cliente.
//       res.status(500).send('Error en el servidor al recuperar los mensajes de chat');
//     }
//   };

//   // POST a la tabla chatmessages

// // Función asíncrona para manejar la solicitud POST
// const postChatMessage = async (req, res) => {
//   try {
//     // Extrae los datos del mensaje del cuerpo de la solicitud
//     const { userId, text, chatId } = req.body;

//     // Define la consulta SQL para insertar el nuevo mensaje
//     const query = 'INSERT INTO chat_messages (user_id, text, chat_id, date) VALUES (?, ?, ?, NOW())';
//     const values = [userId, text, chatId];

//     // Ejecuta la consulta en la base de datos
//     await connectionPromise.query(query, values);

//     // Envía una respuesta de éxito
//     res.status(201).send('Mensaje creado con éxito');
//   } catch (error) {
//     // Maneja cualquier error que ocurra durante la inserción
//     console.error(error);
//     res.status(500).send('Error al crear el mensaje');
//   }
// };

// //GET a la tabla threads

// const getThreads = async (req, res) => {
//   try {
//     // Define la consulta SQL para obtener los threads
//     const query = 'SELECT * FROM threads ORDER BY creation_date DESC';
    
//     // Ejecuta la consulta en la base de datos y espera el resultado
//     const result = await connectionPromise.query(query);
    
//     // Envía los resultados de la consulta al cliente como una respuesta JSON
//     res.json(result.rows);
//   } catch (error) {
//     // Si hay un error, se captura y se envía una respuesta de error
//     console.error(error);
//     res.status(500).send('Error al recuperar los threads');
//   }
// };

// //POST a la tabla threads

// const postThread = async (req, res) => {
//   try {
//     // Extrae los datos del thread del cuerpo de la solicitud
//     const { platform, game_version, subject, user_id } = req.body;

//     // Define la consulta SQL para insertar el nuevo thread
//     const query = 'INSERT INTO threads (platform, game, subject, user_id) VALUES (?, ?, ?, ?)';
//     const values = [platform, game_version, subject, user_id];

//     // Ejecuta la consulta en la base de datos
//     await connectionPromise.query(query, values);

//     // Envía una respuesta de éxito
//     res.status(201).send('Thread creado con éxito');
//   } catch (error) {
//     // Maneja cualquier error que ocurra durante la inserción
//     console.error(error);
//     res.status(500).send('Error al crear el thread');
//   }
// };

// //GET a la table threads con tabla messages, y con tabla de user.

// const getThreadsMessagesUsers = async (req, res) => {
//   try {
//     // Define la consulta SQL para obtener los threads con sus mensajes y usuarios
//     const query = `
//       SELECT th.*, tm.*, u.*
//       FROM threads th
//       JOIN threads_messages tm ON tm.thread_id = th.id
//       JOIN user u ON u.id = th.user_id
//       ORDER BY th.creation_date DESC;
//     `;
    
//     // Ejecuta la consulta en la base de datos y espera el resultado
//     const result = await connectionPromise.query(query);
    
//     // Envía los resultados de la consulta al cliente como una respuesta JSON
//     res.json(result.rows);
//   } catch (error) {
//     // Si hay un error, se captura y se envía una respuesta de error
//     console.error(error);
//     res.status(500).send('Error al recuperar los threads con mensajes y usuarios');
//   }
// };

// TONY endpoints...



// async function getUserAndFriendsById(req, res) {
//   const connection = await connectionPromise;
//   try {
//       const userId = req.params.id;
//       const [userResult] = await connection.query('SELECT * FROM user WHERE user_id = ?', [userId]);
//       const [friendsResult] = await connection.query('SELECT * FROM amigos WHERE user_id = ?', [userId]);

//       const userData = userResult[0];
//       const friendsData = friendsResult;

//       const responseData = {
//           user: userData,
//           friends: friendsData
//       };

//       res.send(responseData);
//   } catch (error) {
//       console.error(error);
//       res.status(500).send({ error: true, codigo: 500, message: '' });
//   }
// }

// async function getUserInterests(req, res) {
//   const connection = await connectionPromise;
//   try {
//       const userId = req.params.id;

//       const [userInterestsResult] = await connection.query('SELECT interests FROM user WHERE user_id = ?', [userId]);
//       const userInterests = userInterestsResult[0].interests;

//       const [results] = await connection.query('SELECT * FROM user WHERE interests = ?', [userInterests]);

//       res.send(results);
//   } catch (error) {
//       console.error(error);
//       res.status(500).send({ error: true, codigo: 500, message: '' });
//   }
// }

// async function updateUserAvailableApi(req, res) {
//   const connection = await connectionPromise;
//   const userId = req.params.id;
//   const { available_to_play } = req.body; 
//   try {
//       await connection.query('UPDATE user SET Available_to_play = ? WHERE user_id = ?', [available_to_play, userId]);
//       res.send('User availability updated successfully.');
//   } catch (error) {
//       console.error(error);
//       res.status(500).send({ error: true, codigo: 500, message: '' });
//   }
// }

// async function getPostsApi(req, res) {
//   const connection = await connectionPromise;
//   try {
//     const [results] = await connection.query('SELECT * FROM post');
//     res.send(results);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ error: true, codigo: 500, message: '' });
//   }
// }

// async function addPostApi(req, res) {
// const connection = await connectionPromise;
// try {
//     const { title, content, author_id } = req.body;
//     await connection.query('INSERT INTO post (title, content, author_id) VALUES (?, ?, ?)', [title, content, author_id]);
//     res.status(201).send({ message: 'Post added successfully' });
// } catch (error) {
//     console.error(error);
//     res.status(500).send({ error: true, codigo: 500, message: '' });
// }
// }

// JUDITH endpoints...

//  // GET de la tabla de friends:

//  const getFriendsTable = async(req, res) => {
//   const connection = await connectionPromise;
//   try{
//     const {user_id } = req.body
//     let sql;
//     sql = `SELECT * FROM xpergg.friends WHERE user_id = ${user_id }`;
//     let [result] = await connection.query(sql);
//       res.send(result)
//   } catch(error){
//     console.log('Error getting friends from user',error)
//     res.status(500).send('Internal server error')
//   }
// }

// // GET a la tabla de post y un id-user en concreto y conteo de los post del user.

// const getPostsFromUser = async(req, res) => {
// const connection = await connectionPromise;
// try{  
//   let sql;
//   if(req.query.id){
//     const userId = req.query.id;
//     sql = `SELECT p.*, 
//     (SELECT COUNT(*) 
//     FROM xpergg.post 
//     WHERE user_id = ${userId}) AS posts_count 
//     FROM xpergg.post p 
//     WHERE user_id = ${userId}`
//   } else{
//     console.log("User not found")
//   } 
//   let [result] = await connection.query(sql);
//   res.send(result)
// } catch(error){
//   console.log('Error getting post from user', error);
//   res.status(500).send('Internal server error')
// }
// }

// // GET a la tabla user y tabla de friends, y trae un conteo.


// const numberOfFriends = async(req, res) => {
// const connection = await connectionPromise;
// try{
//   let sql;
//   if(req.query.id){
//     const userId = req.query.id;
//     sql =`SELECT COUNT (user_id_1), from xpergg.friends WHERE status = 1`;
//   }else{
//     console.log("User not found")
//   }
//   let[result]= await connection.query(sql);
//   res.send(result)
// } catch(error){
//   console.log('Error getting friends from User', error);
//   res.status(500).send('Internal server error')
// }
// }

// // GET a la tabla chat y tabla de user

// const chatsUser = async(req,res) => {
// const connection = await connectionPromise;
// try{
//   let sql;
//   if(req.query.id){
//     const userId = req.query.id
//     sql = `SELECT chat_id, user_id_sender, user_id_receiver FROM chat JOIN user ON (chat.user_id_sender = user.user_id) OR (chat.user_id_receiver = user.user_id) WHERE user_id=${userId}`
//   }
//   else{
//     console.log("No hay chats para este usuario")
//   }
//   let[result] = await connection.query(sql);
//   res.send(result)
// } catch(error){
//   console.log("Error getting chats from User", error);
//   res.status(500).send('Internal server error')
// }
// }

// // PUT a la tabla de user con password.

// const modifyPassword = async(req, res) => {
// const connection = await connectionPromise;
// try{
//   const {user_id, password} = req.body;
//   let sql;
//   sql = `UPDATE xpergg.user SET password = '${password}' WHERE user_id = '${user_id}'`
//   let [result] = await connection.query(sql);
//   res.send(result)
// }catch(error){
//   console.log(error)
// }
// }


// // PUT a la tabla de friends. (Cambiar status de pendiente a aceptado)

// const changeFriendStatus = async(req, res) => {
// const connection = await connectionPromise;
// try{
//   const {user_id_1, user_id_2} = req.body;
//   let friends = 1;
// sql = `UPDATE xpergg.friends SET status = ${friends} WHERE user_id_1=${user_id_1} AND  user_id_2=${user_id_2};`;
// let[result] = await connection.query(sql);
//   res.send(result)
// }catch(error){
//   console.log(error)
// }
// }



  // module.exports = { getXpergg, addUserApi, addComment, addPostCommentUser, addNotification, addReaction, 
  //   addPostReactionUser, getNotificationNewTrue, putNotificationNewFalse, deleteReaction, 
  //   deletePostReactionUser, addfriendsStatusPending, addUserApi, handleFriendRequest, insertMessageThread,
  //    getChatMessages, postChatMessage, postThread, getThreads, getThreadsMessagesUsers, getUserAndFriendsById,getUserInterests,
  //    updateUserAvailableApi, getPostsApi, addPostApi, getFriendsTable, getPostsFromUser, numberOfFriends, chatsUser, modifyPassword, changeFriendStatus}

