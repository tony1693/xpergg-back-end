const {Router} = require ('express')
const router = Router();
const xperggCtrl = require ('../controller/chat.controller');


router.get('/chat-messages', xperggCtrl.getChatMessages);
router.post('/chatmessages', xperggCtrl.postChatMessage);
router.get('/chatUser', xperggCtrl.chatsUser)

module.exports = router;