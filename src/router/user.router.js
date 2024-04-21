const {Router} = require ('express')
const router = Router();
const xperggCtrl = require ('../controller/user.controller');

<<<<<<< HEAD
router.post('/user/:id', xperggCtrl.register);
=======
router.post('/user/:id', xperggCtrl.addUserApi);
router.post('/login', xperggCtrl.login);
>>>>>>> f7378931535e9e3cd6fb01538229e764bc4e77be
router.get('/user/:id/friends', xperggCtrl.getUserAndFriendsById);
router.get('/user/:id/interests', xperggCtrl.getUserInterests);
router.put('/users/:id/available', xperggCtrl.updateUserAvailableApi);
router.get('/numberFriends', xperggCtrl.numberOfFriends);
router.put('/modifyPassword', xperggCtrl.modifyPassword);


module.exports = router;
