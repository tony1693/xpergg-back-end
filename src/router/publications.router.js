const {Router} = require ('express')
const router = Router();
const xperggCtrl = require ('../controller/publications.controller');

router.post('/comments', xperggCtrl.addComment);
router.post('/postcommentuser', xperggCtrl.addPostCommentUser);
router.get('/posts', xperggCtrl.getPostsApi);
router.post('/posts', xperggCtrl.addPostApi);
router.get('/postsUser',xperggCtrl.getPostsFromUser) 