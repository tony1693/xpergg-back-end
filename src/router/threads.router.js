const {Router} = require ('express')
const router = Router();
const xperggCtrl = require ('../controller/threads.controller');


router.post('/threads_messages/:id', xperggCtrl.insertMessageThread);
router.get('/threads', xperggCtrl.getThreads);
router.get('/thread', xperggCtrl.getOneThread)
router.post('/threads', xperggCtrl.postThread);
router.get('/threads-messages-users', xperggCtrl.getThreadsMessagesUsers);


module.exports = router;