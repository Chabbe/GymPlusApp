const mongoose = require("mongoose");
const Workout = require("./workout");
const mongoose = require("mongoose");


let Schema = mongoose.Schema;
const UserSchema = new Schema({
  firstname: String,
  lastname: String,
  email: String,
  phoneNr: Number,
  id: Number,
  workouts: [Workout],
});

const User = mongoose.model("Exercise", UserSchema);

module.exports = User;