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
    JOIN user ON post.user_id = user.user_id`
    );
    res.send(results);
  } catch (error) {
    console.error(error);
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
      const { comment_id, date, text } = req.body;
      await connection.query('INSERT INTO xpergg.comments (comment_id, date, text) VALUES (?, ?, ?)', [comment_id, date, text])
      res.status(201).send({ message: 'Comment added successfully' });
    }
    catch (err) {
      console.log(err);
      res.status(500).send('Error al crear el comentario.');
    }
  }

  // GET a la tabla de comentarios

  // const showComments = async(req, res) => {
  //   const connection = await connectionPromise;
  //   try{
  //     let sql;
  //     if(req.query.post_id){
  //       const post_id = req.query.post_id;
  //       sql =`SELECT comments.comment_id, comments.date, comments.text, comments.user FROM xpergg.comments
  //       JOIN xpergg.user ON comments.user = user.user_id`;
  //     }else{
  //       return res.status(400).json({error: "No se encuentra este post"})
  //     }
  //     let [result] = await connection.query(sql)
  //     res.send(result)
  //   }
  //   catch(error){
  //     console.log(error);
  //     res.status(500).send({ error: true, message: 'Internal server error' });
  //   }
  //   }
  
    module.exports = { getXpergg, getPostsApi, addPostApi, getUserPostCount, addComment, addComment,getPostsByUser}