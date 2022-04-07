const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comment');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');


router.get('/' , /*auth,*/ commentCtrl.getAllComments);
router.get('/:id', /*auth,*/ commentCtrl.getOneComment);
router.post('/', /*auth,*/  commentCtrl.createComment);
//router.put('/:id', /*auth,*/  commentCtrl.modifyComment);
//router.delete('/:id', /*auth,*/ commentCtrl.deleteComment);
//router.post('/:id/like', /*auth,*/ commentCtrl.likeComment);

module.exports = router;