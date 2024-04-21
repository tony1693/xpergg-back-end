const {Router} = require ('express')
const router = Router();
const xperggCtrl = require ('../controller/user.controller');

router.post('/user/:id', xperggCtrl.register);
router.get('/user/:id/friends', xperggCtrl.getUserAndFriendsById);
router.get('/user/:id/interests', xperggCtrl.getUserInterests);
router.put('/users/:id/available', xperggCtrl.updateUserAvailableApi);
router.get('/numberFriends', xperggCtrl.numberOfFriends);
router.put('/modifyPassword', xperggCtrl.modifyPassword)
