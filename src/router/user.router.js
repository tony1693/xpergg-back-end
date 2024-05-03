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
router.put('/editAvatar', xperggCtrl.modifyAvatar)


module.exports = router;
