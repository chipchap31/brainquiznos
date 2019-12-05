const mongoose = require("mongoose"),
  { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  gender: String,
  points: {
    type: Number,
    default: 0
  },
  registered: {
    type: Date,
    // `Date.now()` returns the current unix timestamp as a number
    default: Date.now
  }
});

mongoose.model("users", userSchema);
