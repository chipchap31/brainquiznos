var express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
/* GET home page. */
router.get("/", async (req, res, next) => {
  const USERS = mongoose.model("users");

  const user = req.session.user || false;
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
    const userAll = $fetchUser.filter((x, i) => i < 6);
    res.render("interface", {
      user,
      gender: userFind.gender,
      username: userFind.username,
      userAll,
      rank
    });
  }
});
router.get("/signup", function(req, res, next) {
  res.render("signup", {
    user: false,
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
    user: false,
    err: false,
    errMessage: {
      username: false,
      email: false,
      password: false
    }
  });
});
module.exports = router;
