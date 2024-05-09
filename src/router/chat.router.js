const {Router} = require ('express')
const router = Router();
const xperggCtrl = require ('../controller/chat.controller');



router.get('/chatUser', xperggCtrl.chatsUser)
router.get('/api/threads/:id', xperggCtrl.getThreadById);

// Ruta para publicar un nuevo mensaje
router.post('/api/chat/:chat_id/messages', xperggCtrl.postChatMessage);
// Ruta para obtener los mensajes de un chat específico
router.get('/api/chat/:chat_id/messages', xperggCtrl.getChatMessagesById);

module.exports = router;