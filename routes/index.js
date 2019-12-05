var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index");
});
router.get("/signup.html", function(req, res, next) {
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
module.exports = router;
