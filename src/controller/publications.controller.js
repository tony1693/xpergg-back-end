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
  
  
    module.exports = { getXpergg, getPostsApi, addPostApi, getUserPostCount, addComment, addComment}