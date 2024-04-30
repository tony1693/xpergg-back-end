const {Router} = require ('express')
const router = Router();
const landingController = require ('../controller/landingApi.controller');
router.get("/games", landingController.getGamesLanding);
module.exports = router;