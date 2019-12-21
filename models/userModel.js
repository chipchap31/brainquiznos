const mongoose = require("mongoose"),
  { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  gender: String,
  games: {
    type: Number,
    default: 0
  },
  points: {
    type: Number,
    default: 0
  },
  registered: {
    type: Date,
    // `Date.now()` returns the current unix timestamp as a number
    default: Date.now
  },
  life: {
    type: Number,
    default: 5
  }
});

mongoose.model("users", userSchema);
