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
  image: String
});

const Form = mongoose.model('Form', formSchema);

app.post('/submit', (req, res) => {
  const newExerciseData = req.body;

  console.log("Received exercise data:", newExerciseData);  // 🧪 Log request

  const newExercise = new Form(newExerciseData);

  newExercise.save()
    .then(() => {
      console.log("Exercise saved to DB");  // 🧪 Log save
      res.status(200).send('Exercise added successfully!');
    })
    .catch((error) => {
      console.error("Error saving exercise:", error);  // 🧪 Log errors
      res.status(500).send('Error adding exercise: ' + error.message);
    });
});

app.get("/", (req, resp) => {
 
  resp.send("App is Working");
  // You can check backend is working or not by 
  // entering http://loacalhost:5000
   
  // If you see App is working means
  // backend working properly
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});