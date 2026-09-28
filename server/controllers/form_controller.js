//var mongoose = require('mongoose');

const Form = require("../models/form_model");

const submitExercise = async (req, res) => {
  try {
    const newExercise = await Form.create({
      ...req.body,
      user_id: String(req.user.id),
      user: req.user.display_name || req.user.email || req.body.user,
    });
    return res.status(201).json(newExercise);
  } catch (error) {
    console.error("Error saving exercise:", error);
    return res
      .status(500)
      .json({ message: "Error adding exercise: " + error.message });
  }
};

const retrieveExercise = async (req, res) => {
  try {
    const doc = await Form.find({ user_id: String(req.user.id) });
    res.status(200).json(doc);
  } catch (error) {
    res.status(500).json({ message: "Error fetching exercises" });
  }
};

const updateExercise = async (req, res) => {
  try {
    const exercise = await Form.findOneAndUpdate(
      { _id: req.params.id, user_id: String(req.user.id) },
      req.body,
      { new: true, runValidators: true },
    );
    if (!exercise)
      return res.status(404).json({ message: "Exercise not found" });
    return res.status(200).json(exercise);
  } catch (error) {
    return res.status(500).json({ message: "Error updating exercise" });
  }
};

const deleteExercise = async (req, res) => {
  try {
    const exercise = await Form.findOneAndDelete({
      _id: req.params.id,
      user_id: String(req.user.id),
    });
    if (!exercise)
      return res.status(404).json({ message: "Exercise not found" });
    return res.status(200).json(exercise);
  } catch (error) {
    return res.status(500).json({ message: "Error deleting exercise" });
  }
};

/*
app.delete('/submit/:id', async (req, res) => {
  try {
    const deletedExe = await Form.findByIdAndDelete(req.params.id);
    if (!deletedExe) return res.status(404).json({ message: "Exercise not found" });
    res.status(200).json();
    console.log("Deleted");
  } catch (err) {
    res.status(500).json({ message: err.message }); 
  }
}
*/

module.exports = {
  submitExercise,
  retrieveExercise,
  updateExercise,
  deleteExercise,
};
