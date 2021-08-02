const router = require('express').Router();
const CustomerCtrl = require('../controller/customerController');

router.post('/create',CustomerCtrl.create);
router.post('/login',CustomerCtrl.login);
router.put('/update/:id',CustomerCtrl.update);
router.delete('/delete/:id',CustomerCtrl.delete);
router.get('/search',CustomerCtrl.search);

module.exports = router;