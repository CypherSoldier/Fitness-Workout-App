var mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId },
  name: String,
  sets: Number,
  reps: Number,
  kgs: Number,
  exercise: String,
  image: String,
  date: Date,
  user: String,
  day: String
});

module.exports = mongoose.model('Form', formSchema)