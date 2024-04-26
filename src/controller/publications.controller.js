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

async function getPostsApi(req, res) {
    const connection = await connectionPromise;
    try {
      const [results] = await connection.query('SELECT * FROM post');
      res.send(results);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: true, codigo: 500, message: '' });
    }
  }
  
  async function addPostApi(req, res) {
  const connection = await connectionPromise;
  try {
      const { description, url, user_id } = req.body;
      await connection.query('INSERT INTO post (description, url, user_id) VALUES (?, ?, ?)', [description, url, user_id]);
      res.status(201).send({ message: 'Post added successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).send({ error: true, codigo: 500, message: 'Post could not be added' });
  }
  }

  // GET a la tabla de post y un id-user en concreto y conteo de los post del user.

const getPostsFromUser = async(req, res) => {
    const connection = await connectionPromise;
    try{  
      let sql;
      if(req.query.id){
        const userId = req.query.id;
        sql = `SELECT p.*, 
        (SELECT COUNT(*) 
        FROM xpergg.post 
        WHERE user_id = ${userId}) AS posts_count 
        FROM xpergg.post p 
        WHERE user_id = ${userId}`
      } else{
        console.log("User not found")
      } 
      let [result] = await connection.query(sql);
      res.send(result)
    } catch(error){
      console.log('Error getting post from user', error);
      res.status(500).send('Internal server error')
    }
    }

    //POST a la tabla Post-comment-user 
const addPostCommentUser = async (req, res) => {
    const connection = await connectionPromise;
    try {
      console.log(req.body);
      let sql = `INSERT INTO xpergg.post_comment_user (post_id, comment_id, user_id) VALUES (1, 3, 1)`;
      let [result] = await connection.query(sql);
      console.log(result);
      res.send(result);
    }
    catch (err) {
      console.log(err);
      res.status(500).send('Error al crear.');
    }
  }

  //POST a la tabla comentarios
const addComment = async (req, res) => {
    const connection = await connectionPromise;
    try {
      console.log(req.body);
      let sql = `INSERT INTO xpergg.comments (comment_id, date, text) VALUES (3, "2024-04-15", "hola3pruebapostman")`;
      let [result] = await connection.query(sql);
      console.log(result);
      res.send(result);
    }
    catch (err) {
      console.log(err);
      res.status(500).send('Error al crear el comentario.');
    }
  }
  
  
    module.exports = { getXpergg, getPostsApi, addPostApi, getPostsFromUser, addPostCommentUser, addComment}