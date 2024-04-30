const {Router} = require ('express')
const router = Router();
const xperggCtrl = require ('../controller/user.controller');

router.post('/register', xperggCtrl.register);
router.post('/login', xperggCtrl.login);
router.get('/user/:id/friends', xperggCtrl.getUserAndFriendsById);
router.get('/user/:id/interests', xperggCtrl.getUserInterests);
router.put('/user/available', xperggCtrl.updateUserAvailableApi);
router.get('/numberFriends', xperggCtrl.numberOfFriends);
router.put('/modifyPassword', xperggCtrl.modifyPassword);
<<<<<<< HEAD
router.put('/user/:id', xperggCtrl.updateUser);
=======
router.put('/editAvatar', xperggCtrl.modifyAvatar)

>>>>>>> 9cf550e6cd97072b741d05dfc8df776ab1751da1

module.exports = router;
