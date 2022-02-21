const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth.js')
const multer = require('../middleware/multer')

const postCtrl = require('../controllers/post.js')

router.get('/', auth, postCtrl.getAll)
router.get('/:id', auth, postCtrl.getOne)
router.get('/cmt/all', auth, postCtrl.getCmt)

router.post('/', auth, multer, postCtrl.postOne)
router.post('/:id/like', auth, postCtrl.postLike)
router.post('/:id/cmt', auth, postCtrl.postCmt)

router.put('/:id', auth, postCtrl.editOne)
router.put('/cmt/:id', auth, postCtrl.editCmt)

router.delete('/:id', auth, postCtrl.deleteOne)
router.delete('/cmt/:id', auth, postCtrl.deleteCmt)

module.exports = router;
