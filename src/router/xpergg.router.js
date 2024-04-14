const {Router} = require ('express')
const router = Router();
const xperggCtrl = require ('../controller/xpergg.controller');



// reto 1. endPoints Users //
router.get('/user/:id', xperggCtrl.getUserByIdApi);
router.get('/user', xperggCtrl.getUsersApi);
router.post('/user', xperggCtrl.addUserApi);
router.put('/user/:id', xperggCtrl.updateUserApi);
router.delete('/user/:id', xperggCtrl.deleteUserApi);


// reto 2. endPoints Users and .....//  (ejemplos)

// router.get('/students/:id/average-mark', xperggCtrl.get....);
// router.get('/students/:id/enrolled-subjects', xperggCtrl.getId);
// router.get('/students-and-subjects', xperggCtrl.getAllUser...);
// router.get('/teachers/:id/taught-subjects', xperggCtrl.get....);
// router.get('/teachers-and-subjects', xperggCtrl.getAll...Router.apply.);


module.exports = router;