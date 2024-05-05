const {Router} = require ('express')
const router = Router();
const xperggCtrl = require ('../controller/publications.controller');

router.post('/comments', xperggCtrl.addComment);
router.get('/posts', xperggCtrl.getPostsApi);
router.post('/posts', xperggCtrl.addPostApi);
router.get('/getUserPostCount', xperggCtrl.getUserPostCount);
router.get('/postsUser/:userId', xperggCtrl.getPostsByUser)








module.exports = router;