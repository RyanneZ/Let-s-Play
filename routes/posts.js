var express = require('express');
const { route } = require('express/lib/application');
var router = express.Router();
var postsCtrl = require('../controllers/posts');


/* GET users listing. */
router.get('/', postsCtrl.index);
router.get('/new', postsCtrl.newPost)
router.get('/:id', postsCtrl.show)
router.post('/', postsCtrl.createPost)
router.post('/:id/comments', postsCtrl.createComment)
router.get('/:id/edit', postsCtrl.edit)
router.put('/:id', postsCtrl.update)
router.delete('/:id', postsCtrl.delete)



module.exports = router;