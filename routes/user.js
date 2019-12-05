const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// users signs up

router.post("/signup", async function(req, res, next) {
  const USERS = mongoose.model("users");
  const {
    username,
    firstname,
    lastname,
    email,
    password,
    password2,
    gender
  } = req.body;

  const userExist = await USERS.findOne({ email, username });
  // displays an error when user does not
  // have any number in their username

  const validation = await validate(req.body);

  if (validation.err) {
    res.render("signup", {
      user: false,
      err: true,
      errMessage: validation.errMessage
    });
  } else if (userExist) {
    res.render("signup", {
      user: false,
      err: true,
      errMessage: {
        username: "Account already exist.",
        password: false,
        email: false
      }
    });
  } else {
    // success

    bcrypt.hash(password, 10, async function(err, hash) {
      const userNew = await new USERS({
        username,
        firstname,
        lastname,
        email,
        password: hash,
        gender
      });
      userNew.save();
      return res.render(`/signup-success/${userNew._id}`);
    });
  }
});

router.post("/login", async (req, res) => {});

module.exports = router;

function validate(data) {
  var err = [];

  for (var key in data) {
    switch (key) {
      case "username":
        if (data[key].length < 7) {
          err.push({ [key]: "Username must contain at least 8 characters." });
        }
        break;
      case "email":
        if (!/\S+@\S+\.\S+/.test(data[key])) {
          err.push({ [key]: "Email must be valid." });
        }
        break;
      case "password":
        if (data[key].length < 7) {
          err.push({ [key]: "Password must contain at least 8 characters." });
        } else if (data[key] !== data.password2) {
          err.push({ [key]: "Passwords does not match." });
        }
        break;
      default:
    }
  }

  if (err.length > 0) {
    return {
      user: false,
      err: true,
      errMessage: Object.assign({}, ...err)
    };
  } else {
    return {
      user: true,
      err: false,
      errMessage: {
        username: false,
        email: false,
        password: false
      }
    };
  }
}
