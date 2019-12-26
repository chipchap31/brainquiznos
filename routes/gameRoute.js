const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

router.get("/fetch", async (req, res) => {
  const GAMES = mongoose.model("games");
  const id = req.session.user ? req.session.user.id : false;
  const fetchGames = id ? await GAMES.find({ _user: id }) : null;
  res.send(fetchGames);
});

router.post("/new", async (req, res) => {
  const GAME = mongoose.model("games");

  const { mode } = req.body;
  try {
    const newGame = await new GAME({
      _user: req.session.user,
      mode
    }).save();
    res.send(newGame._id);
  } catch (e) {
    console.log(e);
  }
});
router.post("/update", async (req, res) => {
  const GAME = mongoose.model("games");
  const { id, points, clicks, won } = req.body;
  try {
    const findGame = await GAME.findById(id);
    await findGame.updateOne({
      points,
      clicks,
      won
    });

    res.send({});
  } catch (e) {
    console.log(e);
  }
});
module.exports = router;
