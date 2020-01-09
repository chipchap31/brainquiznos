const mongoose = require("mongoose"),
  { Schema } = mongoose;
const secondsToAdd = 10 * 60 * 1000;
const gameSchema = new Schema({
  clicks: {
    type: Number,
    default: 0
  },
  mode: String,
  points: {
    type: Number,
    default: 0
  },
  datePlayed: {
    type: Date,
    default: Date.now
  },
  replenishDate: Date,
  _user: { type: Schema.Types.ObjectId, ref: "User" }
});

mongoose.model("games", gameSchema);
