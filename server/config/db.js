var mongoose = require('mongoose');

const connectDB = async () => {
    mongoose.connect('mongodb+srv://calebwagner200:Slyla92N7QeZL49m@exerciseinfo.ki1uz5h.mongodb.net/ExerciseData', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', () => {
      console.log('Connected to MongoDB');
    });
}

module.exports = connectDB