const {Router} = require ('express')
const router = Router();
const xperggCtrl = require ('../controller/chat.controller');


router.post('/chatMessages', xperggCtrl.postChatMessage);
router.get('/chatMessages', xperggCtrl.getChatMessages);
router.get('/chatUser', xperggCtrl.chatsUser)
router.get('/api/threads/:id', xperggCtrl.getThreadById);


module.exports = router;