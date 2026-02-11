//var mongoose = require('mongoose');

const Form = require('../models/form_model');

const submitExercise = (req, res) => {
    const newExerciseData = req.body;

    console.log("Received exercise data:", newExerciseData);

    const newExercise = new Form(newExerciseData);

    newExercise.save()
        .then(() => {
        console.log("Exercise saved to DB");
        res.status(200).send('Exercise added successfully!');
        })
        .catch((error) => {
        console.error("Error saving exercise:", error);
        res.status(500).send('Error adding exercise: ' + error.message);
    });
}

const retrieveExercise = async (req, res) => {
    try {
        // find({ name: 'john', age: { $gte: 18 } }).exec();
        const doc = await Form.find({ user: 'Caleb Wagner' });
        res.status(200).json(doc);
        console.log("Success", doc);
    } catch (error) {
        res.status(500).send("Error fetching document");
    }
}

const deleteExercise = async (req, res) => {
    const exercise = await Form.findById(req.params.id);
    
    await Form.findByIdAndDelete(req.params.id);

    res.status(200).json(exercise);
}

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

module.exports = { submitExercise, retrieveExercise, deleteExercise }