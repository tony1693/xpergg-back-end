const {Router} = require ('express')
const router = Router();
const newsController = require ('../controller/newsApi.controller');
router.get("/games", newsController.getGames);
module.exports = router;