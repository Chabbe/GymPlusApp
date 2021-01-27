const mongoose = require('mongoose');

let Schema = mongoose.Schema;
const WorkoutSchema = new Schema({
  nameOfWorkout: String,
  exercise: [{name: String, weight: Number, reps: Number, muscles: String}],
});

const Workout = mongoose.model('Workout', WorkoutSchema);

module.exports = Workout;