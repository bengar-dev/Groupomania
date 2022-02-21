const express = require('express');
const router = express.Router();

const multer = require('../middleware/multer');
const auth = require('../middleware/auth');

const userCtrl = require('../controllers/user');

router.get('/', auth, userCtrl.getAllUsers);
router.get('/:id', auth, userCtrl.getUser);

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

router.put('/:id', auth, multer, userCtrl.editUser);

router.delete('/:id', userCtrl.delUser)

module.exports = router;
