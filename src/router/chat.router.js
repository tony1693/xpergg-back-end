const {Router} = require ('express')
const router = Router();
const xperggCtrl = require ('../controller/chat.controller');



router.get('/chatUser', xperggCtrl.chatsUser)
router.get('/api/threads/:id', xperggCtrl.getThreadById);

// Ruta para publicar un nuevo mensaje
// router.post('/api/chat/:chat_id/messages', xperggCtrl.postChatMessage);
router.post('/chat', xperggCtrl.postChatMessage)
// Ruta para obtener los mensajes de un chat específico
router.get('/api/chat/:chat_id/messages', xperggCtrl.getChatMessagesByChatId);

// Ruta para obtener datos del chat para mostrar en chatMessage
router.get('/api/chat/:chat_id/data', xperggCtrl.getChatData);

// Ruta para obtener el userId para los participantes del chat de cada hilo
router.get('/chat_messages/:chatId/user_id', xperggCtrl.getMessageChatUserId);


module.exports = router;