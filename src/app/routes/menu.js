const router = require('express').Router();
const MenuCtrl = require('../controller/menuController');

router.post('/create',MenuCtrl.create);
router.put('/update/:id',MenuCtrl.update);
router.delete('/delete/:id',MenuCtrl.delete);
router.get('/search',MenuCtrl.search);

module.exports = router;