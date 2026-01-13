var mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  name: String,
  sets: Number,
  reps: Number,
  kgs: Number,
  exercise: String,
  image: String,
  date: Date,
  user: String
});

module.exports = mongoose.model('Form', formSchema)