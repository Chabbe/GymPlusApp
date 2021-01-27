const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('./config/config');
const ExerciseModel = require('./models/exercise');
const WorkoutModel = require('./models/workout');
const cors = require("cors");
const router = express.Router();
var bodyParser = require('body-parser');
const Exercise = require('./models/exercise');

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cors());
app.use(bodyParser.json());
app.set('view engine', 'ejs');

// app.use(main);

const PORT = 8000;

const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true
};

mongoose.connect(config.databaseURL, options).then(() => {
  console.log('Server is hosted on port ' + PORT);
  app.listen(PORT);
});

app.get('/exercise',  async (req, res) => {
  const exercise = await ExerciseModel.find();
  res.send(exercise);
})

app.post('/exercise', async (req, res) => {
  new ExerciseModel({
    name: req.body.exercise.name,
    weight: req.body.exercise.weights,
    reps: req.body.exercise.reps,
    muscles: req.body.exercise.muscles,
  }).save();
  res.send('Hell from /exercise');
});

app.put('/workout', async (req, res) => {
  console.log(req.body);
  await WorkoutModel.findOneAndUpdate({_id: req.body._id}, req.body);
  
});

app.get('/workout',  async (req, res) => {
  const workout = await WorkoutModel.find();
  res.send(workout);
})

app.post('/workout', async (req, res) => {
  new WorkoutModel({
    nameOfWorkout: req.body.nameOfWorkout,
    exercise: req.body.exercise,
  }).save();
  res.send('Response gotten from post/workout');
});

module.exports = app;