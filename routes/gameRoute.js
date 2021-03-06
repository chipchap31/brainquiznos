const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const secondsToAdd = 3 * 60 * 1000;
router.get("/fetch", requireLogin, async (req, res) => {
  const GAMES = mongoose.model("games");
  const id = req.session.user.id;
  const fetchGames = await GAMES.find({ _user: id });
  res.send(fetchGames);
});

router.post("/new", requireLogin, async (req, res) => {
  const GAME = mongoose.model("games");
  const USER = mongoose.model("users");

  const id = req.session.user.id;
  let replenishDate;
  // find lost games that life is replenishing
  const lostGames = await GAME.find({
    _user: id
  }).$where(function() {
    return this.replenishDate > Date.now();
  });
  // check if the latest game finished replenishing its life

  replenishDate = new Date(Date.now() + secondsToAdd);

  if (lostGames.length > 0) {
    // if there are lost games
    const latestGame = await GAME.findOne({ _user: req.session.user.id }).sort({
      datePlayed: -1
    });

    replenishDate = latestGame.replenishDate.getTime() + secondsToAdd;
  }

  const { mode } = req.body;
  try {
    const newGame = await new GAME({
      _user: id,
      mode,
      replenishDate
    }).save();

    const gameAmount = await GAME.find({ _user: id });
    const fetchUser = await USER.findById(id);
    await fetchUser.updateOne({
      games: gameAmount.length,
      life: fetchUser.life - 1
    });

    res.send(newGame._id);
  } catch (e) {
    throw new Error(e);
  }
});
router.post("/update", async (req, res) => {
  const GAME = mongoose.model("games");
  const USER = mongoose.model("users");

  const id = req.session.user.id;
  const { points, clicks, won } = req.body;

  // update the game
  // if life is replenishing adjust
  // the replenishdate of the new game
  let replenishDate;

  try {
    const lostGames = await GAME.find({
      _user: id
    }).$where(function() {
      return this.replenishDate > Date.now();
    });

    replenishDate = new Date(Date.now() + secondsToAdd);
    // get the replenishdate of previous game

    if (lostGames.length > 0) {
      // if there are lost games
      const latestGame = await GAME.findOne({ _user: id }).sort({
        datePlayed: -1
      });

      replenishDate = latestGame.replenishDate.getTime();
    }

    const findGame = await GAME.findById(req.body.id);
    const fetchUser = await USER.findById(id);
    await findGame.updateOne({
      points: won ? points : 0,
      clicks,
      won,

      replenishDate: won ? Date.now() : replenishDate
    });

    const updatedGame = await GAME.findById(req.body.id);
    const updatedUser = await USER.findById(id);
    req.session.user.life = updatedUser.life;
    res.send({ date: updatedGame.replenishDate });
  } catch (e) {
    throw new Error(e);
  }
});
module.exports = router;
