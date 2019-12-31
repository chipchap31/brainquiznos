var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
/* GET home page. */
router.get("/", async (req, res, next) => {
  const loggedIn = Boolean(req.session.user) || false;
  const id = loggedIn ? req.session.user.id : false;
  const USERS = mongoose.model("users");
  const GAMES = mongoose.model("games");
  try {
    if (!loggedIn) {
      res.render("index", { loggedIn: false });
    } else {
      const essentials = "username games points gender"; // get only the required info

      const lostGames = await GAMES.find({
        _user: id
      }).$where(function() {
        return this.replenishDate > Date.now();
      });
      console.log(lostGames);
      const replenishDate =
        lostGames.length > 0
          ? lostGames[0].replenishDate
          : new Date(Date.now());

      const datePlayed =
        lostGames.length > 0 ? lostGames[0].datePlayed : new Date(Date.now());

      let fetchAllUser = await USERS.find({}, essentials).sort({ points: -1 });
      // get just six of the top users
      fetchAllUser = fetchAllUser.filter((x, i) => i < 6);
      const fetchUser = await USERS.findById(id);
      const userCurrentRank = fetchAllUser.map(e => e.id).indexOf(id) + 1;

      // render game interface
      res.render("interface", {
        loggedIn,
        userCurrentRank,
        ...req.session.user,
        fetchAllUser,
        life: fetchUser.life,
        replenishDate,
        datePlayed
      });
    }
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

router.get("/leaderboard", async function(req, res, next) {
  const USERS = mongoose.model("users");
  const GAMES = mongoose.model("games");
  const loggedIn = req.session.user || false;

  if (!loggedIn) {
    return res.render("login");
  }
  const id = req.session.user.id;
  const games = await GAMES.find({ _user: id });
  const userFind = await USERS.findById(id);

  if (!loggedIn) {
    res.render("index", { loggedIn });
  } else {
    const $fetchUser = await USERS.find(
      {},
      "username games points gender"
    ).sort({
      points: -1
    });
    const rank = $fetchUser.map(e => e.id).indexOf(id) + 1;
    const userAll = $fetchUser;

    res.render("leaderboard", {
      loggedIn,
      gender: userFind.gender,
      username: userFind.username,
      points: userFind.points,
      games: games.length,
      userAll,
      rank,
      life: userFind.life
    });
  }
});
router.get("/stats", async function(req, res, next) {
  const GAMES = mongoose.model("games");
  const USERS = mongoose.model("users");

  const loggedIn = req.session.user || false;

  if (!loggedIn) {
    return res.redirect("/login");
  }
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
      loggedIn,
      gender: fetchUser.gender,
      username: fetchUser.username,
      games: fetchGame.length,
      avgPoints,
      avgClicks,
      life: fetchUser.life
    });
  } catch (e) {
    console.log(e);
  }
});
module.exports = router;
