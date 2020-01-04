var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");

router.get("/", requireLogin, async (req, res, next) => {
  const id = req.session.user.id;
  const USERS = mongoose.model("users");
  const GAMES = mongoose.model("games");
  try {
    const essentials = "username games points gender"; // get only the required info

    // find if there are any lost games that are waiting to replenish

    const lostGames = await GAMES.find(
      {
        _user: id
      },
      "replenishDate"
    ).$where(function() {
      return this.replenishDate > Date.now();
    });
    req.session.user.replenishDate = lostGames;

    // const replenishDate =
    //   lostGames.length > 0 ? lostGames[0].replenishDate : new Date(Date.now());
    //
    // const datePlayed =
    //   lostGames.length > 0 ? lostGames[0].datePlayed : new Date(Date.now());

    let fetchAllUser = await USERS.find({}, essentials).sort({ points: -1 });
    // get just six of the top users

    const userCurrentRank = fetchAllUser.map(e => e.id).indexOf(id) + 1;

    fetchAllUser = fetchAllUser.filter((x, i) => i < 7);

    const fetchUser = await USERS.findById(id);
    req.session.user.life = fetchUser.life;

    // render game interface
    res.render("interface", {
      loggedIn: true,
      userCurrentRank,
      ...req.session.user,
      fetchAllUser
    });
  } catch (e) {
    throw new Error(e);
  }
});
router.get("/signup", function(req, res, next) {
  res.render("signup", {
    loggedIn: false,
    err: false,
    errMessage: {
      username: false,
      email: false,
      password: false
    }
  });
});
router.get("/login", function(req, res, next) {
  res.render("login", {
    loggedIn: false,
    err: false,
    errMessage: {
      username: false,
      email: false,
      password: false
    }
  });
});

router.get("/leaderboard", requireLogin, async function(req, res, next) {
  const USERS = mongoose.model("users");
  const GAMES = mongoose.model("games");
  const loggedIn = req.session.user || false;

  const id = req.session.user.id;

  const $fetchUser = await USERS.find({}, "username games points gender").sort({
    points: -1
  });
  const rank = $fetchUser.map(e => e.id).indexOf(id) + 1;
  const userAll = $fetchUser;

  res.render("leaderboard", {
    loggedIn: true,
    ...req.session.user,
    userAll,
    rank
  });
});
router.get("/stats", requireLogin, async function(req, res, next) {
  const GAMES = mongoose.model("games");
  const USERS = mongoose.model("users");

  const loggedIn = req.session.user || false;

  const id = req.session.user.id;

  try {
    const fetchGame = await GAMES.find({ _user: id });
    const fetchUser = await USERS.findById({ _id: id }, "gender username");
    // get the average user's average clicks

    const avgClicks =
      fetchGame.reduce(
        (prev, curr) => ({
          clicks: prev.clicks + curr.clicks
        }),
        []
      ).clicks / fetchGame.length;

    const avgPoints =
      fetchGame.reduce(
        (prev, curr) => ({
          points: prev.points + curr.points
        }),
        []
      ).points / fetchGame.length;

    return res.render("stats", {
      loggedIn: true,
      avgPoints,
      avgClicks,
      ...req.session.user
    });
  } catch (e) {
    throw new Error(e);
  }
});
module.exports = router;
