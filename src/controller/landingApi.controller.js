const { connectionPromise } = require('../database');
const axios = require('axios');


async function getGamesLanding(req , res){
    try {
      const respon = await axios.get('https://www.freetogame.com/api/games');
      res.send(respon.data.slice(0,3));
      console.log(respon);
    } catch (error) {
      console.error(error);
    }
  
  }
  // incluir las funciones para este endpoints....
  
  module.exports = { getGamesLanding }