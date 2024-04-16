const {Router} = require ('express')
const router = Router();
const xperggCtrl = require ('../controller/xpergg.controller');



//endpoints RAFA
// router.post('/comments', xperggCtrl.addComment);
// router.post('/postcommentuser', xperggCtrl.addPostCommentUser);
// router.post('/notifications', xperggCtrl.addNotification);
// router.post('/reactions', xperggCtrl.addReaction);
// router.post('/postreactionuser', xperggCtrl.addPostReactionUser);
// router.get('/notificationsNewTrue', xperggCtrl.getNotificationNewTrue);
// router.put('/notificationsNewFalse', xperggCtrl.putNotificationNewFalse);
// router.delete('/reactions', xperggCtrl.deleteReaction);
// router.delete('/postreactionuser', xperggCtrl.deletePostReactionUser);
// router.post('/friends', xperggCtrl.addfriendsStatusPending);
//endpoints MIGUEL
// router.post('/user/:id', xperggCtrl.addUserApi);
// router.put('/friends/:id', xperggCtrl.handleFriendRequest);
// router.post('/threads_messages/:id', xperggCtrl.insertMessageThread);

// Endpoints Ruben
// router.get('/chat-messages', xperggCtrl.getChatMessages);
// router.post('/chatmessages', xperggCtrl.postChatMessage);
// router.get('/threads', xperggCtrl.getThreads);
// router.post('/threads', xperggCtrl.postThread);
// router.get('/threads-messages-users', xperggCtrl.getThreadsMessagesUsers);

// Endpoints Tony
// router.get('/user/:id/friends', xperggCtrl.getUserAndFriendsById);
// router.get('/user/:id/interests', xperggCtrl.getUserInterests);
// router.put('/users/:id/available', xperggCtrl.updateUserAvailableApi);
// router.get('/posts', xperggCtrl.getPostsApi);
// router.post('/posts', xperggCtrl.addPostApi);

// EndPoints Judit
// router.get('/friends', xperggCtrl.getFriendsTable)
// router.get('/postsUser',xperggCtrl.getPostsFromUser) 
// router.get('/numberFriends', xperggCtrl.numberOfFriends)
// router.get('/chatUser', xperggCtrl.chatsUser)
// router.put('/modifyPassword', xperggCtrl.modifyPassword)
// router.put('/changeFriendStatus', xperggCtrl.changeFriendStatus)


module.exports = router;