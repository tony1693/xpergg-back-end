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

//POST a la tabla reacciones 
const addReaction = async (req, res) => {
    const connection = await connectionPromise;
    try {
      console.log(req.body);
      let sql = `INSERT INTO xpergg.reactions (reaction_id, date, reaction_type) VALUES (1, "2024-04-15", "like")`;
      let [result] = await connection.query(sql);
      console.log(result);
      res.send(result);
    }
    catch (err) {
      console.log(err);
      res.status(500).send('Error al crear la reacción.');
    }
  }
  //POST a la tabla Post-reaction-user 
const addPostReactionUser = async (req, res) => {
    const connection = await connectionPromise;
    try {
      console.log(req.body);
      let sql = `INSERT INTO xpergg.post_reaction_user (post_id, reaction_id, user_id) VALUES (1, 1, 1)`;
      let [result] = await connection.query(sql);
      console.log(result);
      res.send(result);
    }
    catch (err) {
      console.log(err);
      res.status(500).send('Error al crear.');
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
  
  module.exports = { getXpergg, addReaction, addPostReactionUser, deleteReaction, deletePostReactionUser}
