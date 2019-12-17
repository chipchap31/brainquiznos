const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/fetch", async (req, res) => {
  const GAMES = mongoose.model("games");
  const user = req.session.user || false;
  const fetchGames = user ? await GAMES.find({ _user: user }) : null;
  res.send(fetchGames);
});
router.post("/new", async (req, res) => {
  const GAME = mongoose.model("games");
  console.log(req.body);
  const { points } = req.body;
  try {
    const newGame = await new GAME({
      _user: req.session.user,
      points
    }).save();
    res.send(newGame._id);
  } catch (e) {
    console.log(e);
  }
});
module.exports = router;
