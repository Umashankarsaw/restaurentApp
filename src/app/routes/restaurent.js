const router = require('express').Router();
const RestaurentCtrl = require('../controller/restaurentController');

router.post('/create',RestaurentCtrl.create);
router.put('/update/:id',RestaurentCtrl.update);
router.delete('/delete/:id',RestaurentCtrl.delete);
router.get('/search',RestaurentCtrl.search);

module.exports = router;