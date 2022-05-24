const { findById } = require('../models/post');
const Post = require('../models/post');
const User = require('../models/user');

module.exports = {
  index,
  newPost,
  createPost,
  show,
  createComment,
  edit,
  update,
  delete: deletePost,
  addUser
  
};

async function deletePost(req,res) {
  let post = await Post.findByIdAndDelete(req.params.id)
  post.save(function(err) {
    res.redirect('/posts/');
  });

}

async function update(req,res) {

  let post = await Post.findById(req.params.id)

  post.title = req.body.title
  post.description = req.body.description
  post.photo_url = req.body.photo_url
  post.time = req.body.time
  post.location = req.body.location
  post.sport = req.body.sport

 
  post.save(function(err) {
    res.redirect(`/posts/${post._id}`);
  });
}
async function edit(req,res) {
  let post = await Post.findById(req.params.id)
  res.render('../views/posts/edit.ejs', {user: req.user, post  })
}
function createComment(req, res) {
  Post.findById(req.params.id, function(err, post) {
    post.comments.push(req.body);
    post.save(function(err) {
      res.redirect(`/posts/${post._id}`);
    });
  });
}

async function show(req, res) {
  let post = await Post.findById(req.params.id)
  let user = await User.find()
   
  await post.populate('user')
  res.render('../views/posts/show', {user:req.user, post})
}

async function addUser(req, res) {
  let post = await Post.findById(req.params.id)
  let userId = req.user._id
  post.user = userId
  await post.save()
  res.redirect(`/posts/${post.id}`)
}


function index(req, res) {
  Post.find({}, function(err, posts) {
    res.render('../views/posts/index', { user: req.user, title: 'posts', posts });
  });
}



function newPost(req, res) {
  console.log(req.user)
  res.render('../views/posts/new',{
    user: req.user,
  })
}

function createPost(req,res) {
  
  const post = new Post(req.body)
  let userId = req.user._id
  post.user = userId

  post.save(function(err) {
    if (err) return res.redirect('/posts/new');
    res.redirect(`/posts/${post._id}`);
  });
}