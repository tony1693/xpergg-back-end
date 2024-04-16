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

//POST a la tabla notificaciones
const addNotification = async (req, res) => {
    const connection = await connectionPromise;
    try {
      console.log(req.body);
      let sql = `INSERT INTO xpergg.notifications (notification_id, user_id, date, notification_type, new) VALUES (3, 2, "2024-04-16", "like", 1)`;
      let [result] = await connection.query(sql);
      console.log(result);
      res.send(result);
    }
    catch (err) {
      console.log(err);
      res.status(500).send('Error al crear la notificación.');
    }
  }

  //GET a la tabla de notificaciones y que traiga el Count de las que tengan "new" en "true".
const getNotificationNewTrue = async (req, res) => {
    const connection = await connectionPromise;
    try {
      console.log(req.body);
      let sql = `SELECT COUNT(*) AS Total_Notifications FROM xpergg.notifications WHERE new=1`;
      let [result] = await connection.query(sql);
      console.log(result);
      res.send(result);
    }
    catch (err) {
      console.log(err);
      res.status(500).send('Error al crear.');
    }
  }

  // PUT a la tabla de notificaciones y poner el "new" en false.
const putNotificationNewFalse = async (req, res) => {
    const connection = await connectionPromise;
    try {
      console.log(req.body);
      let sql = `UPDATE xpergg.notifications SET new=0`;
      let [result] = await connection.query(sql);
      console.log(result);
      res.send(result);
    }
    catch (err) {
      console.log(err);
      res.status(500).send('Error al crear.');
    }
  }
  
  
  module.exports = { getXpergg, addNotification, getNotificationNewTrue, putNotificationNewFalse}