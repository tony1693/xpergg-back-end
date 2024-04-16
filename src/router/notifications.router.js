const {Router} = require ('express')
const router = Router();
const xperggCtrl = require ('../controller/notifications.controller');


router.post('/notifications', xperggCtrl.addNotification);

router.get('/notificationsNewTrue', xperggCtrl.getNotificationNewTrue);
router.put('/notificationsNewFalse', xperggCtrl.putNotificationNewFalse);