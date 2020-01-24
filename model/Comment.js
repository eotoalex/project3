const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CommentSchema = new Schema({
  id: mongoose.Schema.Types.ObjectId,
  date:String,
  latitude:String,
  longitude: String,
  content: String
});

const Comment = mongoose.model("CrimeLocations",CommentSchema);

module.exports = Comment;