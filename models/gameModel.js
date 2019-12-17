const mongoose = require("mongoose"),
  { Schema } = mongoose;

const gameSchema = new Schema({
  clicks: Number,
  mode: String,
  points: {
    type: Number,
    default: 0
  },
  datePlayed: {
    type: Date,
    default: Date.now
  },
  _user: { type: Schema.Types.ObjectId, ref: "User" }
});

mongoose.model("games", gameSchema);
