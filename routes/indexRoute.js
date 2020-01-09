var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");

router.get("/", requireLogin, async (req, res, next) => {
  const id = req.session.user.id;
  const USERS = mongoose.model("users");
  const GAMES = mongoose.model("games");
  try {
    // find if there are any lost games that are waiting to replenish
    const lostGames = await GAMES.find(
      {
        _user: id
      },
      "replenishDate"
    ).$where(function() {
      return this.replenishDate > Date.now();
    });

    req.session.user.replenishDate = lostGames; // set to cookie
    // ---------------- end

    // fetch all users for the leaderboards
    const essentials = "username games points gender"; // get only required fields
    const fetchAllUser = await USERS.find({}, essentials).sort({ points: -1 });

    const userCurrentRank = fetchAllUser.map(e => e.id).indexOf(id) + 1; // get user's current rank

    const reduceAllUser = fetchAllUser.filter((x, i) => i < 7); // return only 7
    // ----------------- end

    // update life back to five if all finished replenishing
    const fetchUser = await USERS.findById(id);
    if (lostGames.length <= 0) {
      await fetchUser.updateOne({ life: 5 });
    }
    // -------------- end

    const updatedUser = await USERS.findById(id);
    req.session.user.life = updatedUser.life;

    // render game interface
    res.render("interface", {
      loggedIn: true,
      userCurrentRank,
      ...req.session.user,
      fetchAllUser: reduceAllUser
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
