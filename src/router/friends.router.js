const {Router} = require ('express')
const router = Router();
const xperggCtrl = require ('../controller/friends.controller');

router.post('/friends', xperggCtrl.addfriendsStatusPending);
router.put('/friends/:id', xperggCtrl.handleFriendRequest);
router.get('/friends', xperggCtrl.getFriendsTable);
router.put('/changeFriendStatus', xperggCtrl.changeFriendStatus)