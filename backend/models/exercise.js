const mongoose = require('mongoose');

let Schema = mongoose.Schema;
const ExerciseSchema = new Schema({
  name: String,
  weight: Number,
  reps: Number,
  muscles: String,
});

const Exercise = mongoose.model('Exercise', ExerciseSchema);

module.exports = Exercise;