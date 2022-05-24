const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const commentSchema = new Schema({
    availability : {type: String},
    skill: {type: String},
    content: {type: String}
  }, {
    timestamps: true
  });

const postSchema = new Schema({
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  title: {type: String},
  description: {type: String},
  username: {type: String},
  avatar_url: {type: String},
  photo_url: {type: String},
  time: {type: Date},
  location: {type: String},
  sport: {type: String},

  comments: [commentSchema]
  

}, {
  timestamps: true
})



module.exports = mongoose.model('Post', postSchema)