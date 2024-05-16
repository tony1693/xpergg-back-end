const {Router} = require ('express')
const router = Router();
const xperggCtrl = require ('../controller/reactions.controller');

router.post('/reactions', xperggCtrl.addReaction);
// router.post('/postreactionuser', xperggCtrl.addPostReactionUser);
router.delete('/reactions', xperggCtrl.deleteReaction);
router.delete('/postreactionuser', xperggCtrl.deletePostReactionUser);
router.get('/getReactionsUser', xperggCtrl.showReactionsUser)


module.exports = router;