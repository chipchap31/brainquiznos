var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
/* GET home page. */
router.get("/", async (req, res, next) => {
  const loggedIn = Boolean(req.session.user) || false;
  const id = loggedIn ? req.session.user.id : false;
  const USERS = mongoose.model("users");
  try {
    if (!loggedIn) {
      res.render("index", { loggedIn: false });
    } else {
      const essentials = "username games points gender"; // get only the required info

      let fetchAllUser = await USERS.find({}, essentials).sort({ points: -1 });
      // get just six of the top users
      fetchAllUser = fetchAllUser.filter((x, i) => i < 6);

      const userCurrentRank = fetchAllUser.map(e => e.id).indexOf(id) + 1;
      // render game interface
      res.render("interface", {
        loggedIn,
        userCurrentRank,
        ...req.session.user,
        fetchAllUser
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

  const user = req.session.user || false;
  const games = user ? await GAMES.find({ _user: user }) : null;
  const userFind = user ? await USERS.findById(user) : null;

  if (!user) {
    res.render("index", { user });
  } else {
    const $fetchUser = await USERS.find(
      {},
      "username games points gender"
    ).sort({
      points: -1
    });
    const rank = $fetchUser.map(e => e.id).indexOf(user) + 1;
    const userAll = $fetchUser;

    res.render("leaderboard", {
      user,
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
  const user = req.session.user || false;
  console.log(user);
  if (!user) {
    return res.redirect("/");
  }
  const GAMES = mongoose.model("games");
  const USERS = mongoose.model("users");

  try {
    const fetchGame = await GAMES.find({ _user: user });
    const fetchUser = await USERS.findById({ _id: user }, "gender username");
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
      user,
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
