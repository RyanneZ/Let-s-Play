const User = require('../models/user');

module.exports = {
  index,
  
};

function index(req, res) {

  
    res.render('../views/users', { 
      user: req.user,
      username: req.query.username, 
      
    });
  
}