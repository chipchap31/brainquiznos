const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");

router.get("/fetch", requireLogin, async (req, res) => {
  const GAMES = mongoose.model("games");
  const id = req.session.user.id;
  const fetchGames = await GAMES.find({ _user: id });
  req.session.user.games = fetchGames.length;
  res.send(fetchGames);
});

router.post("/new", async (req, res) => {
  const GAME = mongoose.model("games");

  const { mode } = req.body;
  try {
    const newGame = await new GAME({
      _user: req.session.user.id,
      mode
    }).save();
    req.session.user.games = req.session.user.games + 1;
    res.send(newGame._id);
  } catch (e) {
    throw new Error(e);
  }
});
router.post("/update", async (req, res) => {
  const GAME = mongoose.model("games");
  const { points, clicks, won } = req.body;
  // update the game
  // if life is replenishing adjust
  // the replenishdate of the new game
  let replenishDate;

  try {
    const secondsToAdd = 10 * 60 * 1000;
    const lostGames = await GAME.find({
      _user: req.session.user.id
    }).$where(function() {
      return this.replenishDate > Date.now();
    });
    console.log(lostGames.length);
    replenishDate = new Date(Date.now() + secondsToAdd);
    // get the replenishdate of previous game

    if (lostGames.length > 0) {
      const latestGame = await GAME.find({ _user: req.session.user.id }).sort({
        datePlayed: -1
      });
      replenishDate = latestGame[1].replenishDate.getTime() + secondsToAdd;
    }

    const findGame = await GAME.findById(req.body.id);
    await findGame.updateOne({
      points,
      clicks,
      won,
      replenishDate: won ? Date.now() : replenishDate
    });
    if (!won) {
      req.session.user.life = req.session.user.life - 1;
    }

    res.send({});
  } catch (e) {
    throw new Error(e);
  }
});
module.exports = router;
