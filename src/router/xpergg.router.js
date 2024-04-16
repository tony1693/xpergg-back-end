const {Router} = require ('express')
const router = Router();
const xperggCtrl = require ('../controller/xpergg.controller');



router.post('/user/:id', xperggCtrl.addUserApi);
router.put('/friends/:id', xperggCtrl.handleFriendRequest);
router.post('/threads_messages/:id', xperggCtrl.insertMessageThread);


module.exports = router;