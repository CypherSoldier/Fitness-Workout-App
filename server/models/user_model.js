var mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId },
  display_name: String,
  email: String,
  password: String
});

module.exports = mongoose.model('User', userSchema)