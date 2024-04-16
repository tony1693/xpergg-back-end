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
      const { name, email, nationality, about_me, password, available_to_play, platform, interest, img_avatar } = req.body;
      await connection.query('INSERT INTO user (name, email, nationality, about_me, password, available_to_play, platform, interest, img_avatar) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [name, email, nationality, about_me, password, available_to_play, platform, interest, img_avatar]);
      res.status(201).send({ message: 'Usuario agregado exitosamente' });
  } catch (error) {
      console.error(error);
      res.status(500).send({ error: true, codigo: 500, message: 'Error al agregar el usuario' });
  }
  console.log('Usuario añadido correctamente.');
}

// Consulta para actualizar el STATUS de la tabla friends como "TRUE" si aceptas la solicitud de amistad.
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

// Añade un Thread
async function addThreadApi(req, res) {
  const connection = await connectionPromise;
  try {
      const { thread_id, platform, game, subject, user_id } = req.body;
      await connection.query('INSERT INTO threads ( thread_id, platform, game, subject, user_id ) VALUES (?, ?, ?, ?, ?)', [ thread_id, platform, game, subject, user_id ]);
      res.status(201).send({ message: 'Hilo agregado exitosamente' });
  } catch (error) {
      console.error(error);
      res.status(500).send({ error: true, codigo: 500, message: 'Error al agregar el hilo' });
  }
  console.log('Hilo añadido correctamente.');
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

// ************************


// // Datos de los usuarios
// const user1 = {
//   name: 'Juan Pérez',
//   email: 'juan@example.com',
//   nationality: 'Mexicana',
//   about_me: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//   password: 'contraseña1',
//   available_to_play: false,
//   platform: 'PlayStation',
//   interest: 'Arcade',
//   img_avatar: 'lol.png',
// };

// const user2 = {
//   name: 'María García',
//   email: 'maria@example.com',
//   nationality: 'Española',
//   about_me: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//   password: 'contraseña2',
//   available_to_play: false,
//   platform: 'Nintendo',
//   interest: 'Disparos',
//   img_avatar: 'fornite-1.png',
// };

// // Simulación de la inserción de dos usuarios
// addUserApi({ body: user1 }, {
//   status: function() {
//     return this;
//   },
//   send: function() {}
// });
// addUserApi({ body: user2 }, {
//   status: function() {
//     return this;
//   },
//   send: function() {}
// });



// // Simulación de la aceptación de una solicitud de amistad
// handleFriendRequest({
//   body: {
//     acceptFriendRequest: true,
//     user_id_1: 1, // ID del primer usuario
//     user_id_2: 2, // ID del segundo usuario
//   }
// }, {
//   status: function() {
//     return this;
//   },
//   send: function() {}
// });

// // Simulación de la denegación de una solicitud de amistad
// handleFriendRequest({
//   body: {
//     acceptFriendRequest: false,
//     user_id_1: 1, // ID del primer usuario
//     user_id_2: 2, // ID del segundo usuario
//   }
// }, {
//   status: function() {
//     return this;
//   },
//   send: function() {}
// });

// // Datos de los hilos
// const thread1 = {
//   thread_id: 1,
//   platform:'PlayStation',
//   game:'fornite',
//   subject:'Vamos que nos vamos',
//   user_id: 57,
// };

// const thread2 = {
//   thread_id: 2,
//   platform:'Nintendo',
//   game:'fornite',
//   subject:'Vamos que nos venimos',
//   user_id: 56,
// };

// // Simulación de la inserción de dos hilos
// addThreadApi({ body: user1 }, {
//   status: function() {
//     return this;
//   },
//   send: function() {}
// });
// addThreadApi({ body: user2 }, {
//   status: function() {
//     return this;
//   },
//   send: function() {}
// });


// // Datos del mensaje del hilo
// const threadMessage1 = {
//   threads_message_id: 1,
//   date: new Date(),
//   user_id: 56,
//   text: '¡Hola! ¿Alguien para jugar una partida?',
//   thread_id: 1,
// };

// const threadMessage2 = {
//   threads_message_id: 2,
//   date: new Date(),
//   user_id: 57,
//   text: 'Busco equipo para la campaña cooperativa.',
//   thread_id: 2,
// };

// // Simulación de la inserción de dos mensajes de hilos
// insertMessageThread({ body: threadMessage1 }, {
//   status: function() {
//     return this;
//   },
//   send: function() {}
// });
// insertMessageThread({ body: threadMessage2 }, {
//   status: function() {
//     return this;
//   },
//   send: function() {}
// });



module.exports = { getXpergg, addUserApi, handleFriendRequest, insertMessageThread, addThreadApi };
