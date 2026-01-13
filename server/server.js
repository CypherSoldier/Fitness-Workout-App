var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var connectDB = require('./config/db')

var app = express();
const port = process.env.PORT || 5000;

connectDB()

app.use(bodyParser.json());
app.use(cors());

app.use('/', require('./routes/form_routes'))

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});