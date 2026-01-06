var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb+srv://calebwagner200:Slyla92N7QeZL49m@exerciseinfo.ki1uz5h.mongodb.net/ExerciseData', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

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

const Form = mongoose.model('Form', formSchema);

app.post('/submit', (req, res) => {
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
});

app.get('/submit', async (req, res) => {
  try {
    // find({ name: 'john', age: { $gte: 18 } }).exec();
    const doc = await Form.find({ user: 'Caleb Wagner' });
    res.status(200).json(doc);
    console.log("Success", doc);
  } catch (error) {
    res.status(500).send("Error fetching document");
  }
})

app.delete('/submit/:id', async (req, res) => {
  try {
    const deletedExe = await Form.findByIdAndDelete(req.params.id);
    if (!deletedExe) return res.status(404).json({ message: "Exercise not found" });
    res.status(200).json();
    console.log("Deleted");
  } catch (err) {
    res.status(500).json({ message: err.message }); 
  }
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});