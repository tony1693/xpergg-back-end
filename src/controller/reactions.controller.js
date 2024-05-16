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

//POST a la tabla reacciones y a la tabla post_Reaction_user
const addReaction = async (req, res) => {
  const connection = await connectionPromise;
  try {
    const { user_id, date, reaction_type } = req.body;
    console.log(req.body);
    // Insertar la reacción en la tabla 'reactions'
    const sqlReaction = 'INSERT INTO xpergg.reactions (date, reaction_type, user_id) VALUES (?, ?, ?)';
    await connection.query(sqlReaction, [user_id, date, reaction_type ]);
    res.status(201).send({ message: 'Reacción guardado correctamente.' });
    // Insertar la relación en la tabla 'post_Reaction_user'
    // let sqlPostReactionUser = 'INSERT INTO xpergg.post_reaction_user (post_id, reaction_id, user_id) VALUES (?, ?, ?)';
    // let [resultPostReactionUser] = await connection.query(sqlPostReactionUser, [post_id, reaction_id, user_id]);

    // console.log(resultReaction);
    // console.log(resultPostReactionUser);
    // res.send({resultReaction, resultPostReactionUser});
  }
  catch (err) {
    console.log(err);
    res.status(500).send('Error al crear la reacción.');
  }
}


  //POST a la tabla Post-reaction-user 
// const addPostReactionUser = async (req, res) => {
//     const connection = await connectionPromise;
//     try {
//       console.log(req.body);
//       let sql = `INSERT INTO xpergg.post_reaction_user (post_id, reaction_id, user_id) VALUES (1, 1, 1)`;
//       let [result] = await connection.query(sql);
//       console.log(result);
//       res.send(result);
//     }
//     catch (err) {
//       console.log(err);
//       res.status(500).send('Error al crear.');
//     }
//   }

// GET a la tabla de reactions para hacer un conteo

const showReactionsUser = async(req, res) => {
  const connection = await connectionPromise;
try {
    const userId = req.query.id;
    const [results] = await connection.query(
        `SELECT COUNT(*) AS reactions_count 
        FROM reactions 
        WHERE user_id = ?`, 
        [userId]
    );
    res.send(results[0]);
    console.log(results[0])

} catch (error) {
    console.error(error);
    res.status(500).send({ error: true, codigo: 500, message: 'Error getting comment count from user' });
}
}
  
  // DELETE a la tabla reacciones y la tabla de post-reaction-user.
const deleteReaction = async (req, res) => {
    const connection = await connectionPromise;
    try {
      console.log(req.body);
      let sql = `DELETE FROM xpergg.reactions`;
      let [result] = await connection.query(sql);
      console.log(result);
      res.send(result);
    }
    catch (err) {
      console.log(err);
      res.status(500).send('Error al crear.');
    }
  }
  
  const deletePostReactionUser = async (req, res) => {
    const connection = await connectionPromise;
    try {
      console.log(req.body);
      let sql = `DELETE FROM xpergg.post_reaction_user`;
      let [result] = await connection.query(sql);
      console.log(result);
      res.send(result);
    }
    catch (err) {
      console.log(err);
      res.status(500).send('Error al crear.');
    }
  }
  
  module.exports = { getXpergg, addReaction, deleteReaction, deletePostReactionUser, showReactionsUser}
