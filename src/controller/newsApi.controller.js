const { connectionPromise } = require('../database');
const axios = require('axios');

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

async function getGames(req , res){
  try {
    const response = await axios.get('https://www.freetogame.com/api/games');
    res.send(response.data.slice(0,9));
  } catch (error) {
    console.error(error);
  }

}

// incluir las funciones para este endpoints....

module.exports = { getXpergg , getGames }