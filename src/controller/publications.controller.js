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
    const [results] = await connection.query(`SELECT post.post_id, post.url, post.description, post.user_id, user.name AS user_name, user.imgavatar AS user_avatar
    FROM post
    JOIN user ON post.user_id = user.user_id ORDER BY post.post_id DESC`
    );
    res.send(results);
  } catch (error) {
    console.error(error);
  }
}

  async function addPostApi(req, res) {
    const connection = await connectionPromise;
    try {
        const { description, url, user_id, date } = req.body;
        await connection.query('INSERT INTO post (description, url, user_id, date) VALUES (?, ?, ?, ?)', [description, url, user_id, date]);
        res.status(201).send({ message: 'Post added successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: true, codigo: 500, message: 'Post could not be added' });
    }
    }

  // GET a la tabla de post y un id-user en concreto y conteo de los post del user.

// Controlador (JavaScript)
async function getUserPostCount(req, res) {
  const connection = await connectionPromise;
  try {
      const userId = req.query.id;
      const [results] = await connection.query(
          `SELECT COUNT(*) AS post_count 
          FROM post 
          WHERE user_id = ?`, 
          [userId]
      );
      res.send(results[0]);
  } catch (error) {
      console.error(error);
      res.status(500).send({ error: true, codigo: 500, message: 'Error getting post count from user' });
  }
}

// GET de todos los posts de 1 user:

async function getPostsByUser(req, res){
  const connection = await connectionPromise;
  try{
    const userId = req.params.userId;
    let sql = `SELECT post.post_id, post.url, post.description, post.user_id, user.name AS user_name, user.imgavatar AS user_avatar
    FROM post
    JOIN user ON post.user_id = user.user_id WHERE post.user_id = ${userId} ORDER BY post.post_id DESC`
    const [result] = await connection.query(sql)
    console.log(result);
    res.send(result)
  }
  catch(error){
    console.log(error);
    res.status(500).send({ error: true, message: 'Internal server error' });
  }
}

  //POST a la tabla comentarios
const addComment = async (req, res) => {
    const connection = await connectionPromise;
    try {
      const { comment_id, date, text, user_id, post_id } = req.body;
      await connection.query('INSERT INTO xpergg.comments (comment_id, date, text, user_id, post_id) VALUES (?, ?, ?, ?, ?)', [comment_id, date, text, user_id, post_id])
      res.status(201).send({ message: 'Comment added successfully' });
    }
    catch (err) {
      console.log(err);
      res.status(500).send('Error al crear el comentario.');
    }
  }

  // GET a tabla de comentarios que traiga el numero por user_id

  const showCommentsUser = async(req, res) => {
    const connection = await connectionPromise;
  try {
      const userId = req.query.id;
      const [results] = await connection.query(
          `SELECT COUNT(*) AS comments_count 
          FROM comments 
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

  // GET a la tabla de comentarios por POST_ID! 

  const showComments = async(req, res) => {
    const connection = await connectionPromise;
    try{
      let post_id = req.query.id
      let sql =`SELECT comments.comment_id, comments.date, comments.text, comments.user_id, comments.post_id, user.name AS user_name, user.imgavatar AS user_avatar
      FROM xpergg.comments
      JOIN user ON comments.user_id = user.user_id
      WHERE comments.post_id=?
      ORDER BY comments.date ASC`;
      const [results] = await connection.query(sql,[post_id]);
      console.log(results)
      res.send(results)
    }
    catch(error){
      console.log(error);
      res.status(500).send({ error: true, message: 'Internal server error' });
    }
    }
  
    module.exports = { getXpergg, getPostsApi, addPostApi, showComments, getUserPostCount, addComment, addComment,getPostsByUser, showCommentsUser}