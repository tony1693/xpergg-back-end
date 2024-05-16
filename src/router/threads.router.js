const {Router} = require('express')
const router = Router();
const xperggCtrl = require ('../controller/threads.controller');


router.post('/threads_messages/:id', xperggCtrl.insertMessageThread);
router.get('/threads', xperggCtrl.getThreads);
router.post('/threads', xperggCtrl.postThread);
router.get('/threads-messages-users/:id', xperggCtrl.getThreadsMessagesUsers);
router.get('/chat/:id', xperggCtrl.getUsersInThread)


module.exports = router;