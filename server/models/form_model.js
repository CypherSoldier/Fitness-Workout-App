var mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  user_id: { type: String, required: true, index: true },
  name: String,
  sets: Number,
  reps: Number,
  kgs: Number,
  exercise: String,
  image: String,
  date: Date,
  user: String,
  day: String,
});

module.exports = mongoose.model("Form", formSchema);
