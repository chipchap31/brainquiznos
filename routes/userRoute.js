const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// users signs up

router.post("/signup", async function(req, res, next) {
  const USERS = mongoose.model("users");
  const { username, email, password, password2, gender } = req.body;

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

        email,
        password: hash,
        gender
      });
      userNew.save();
      return res.render("signup-success", { user: false, username });
    });
  }
});

router.post("/login", async (req, res) => {
  const { username, password, remember } = req.body;
  const userSave = remember ? JSON.parse(remember) : false;
  const USERS = mongoose.model("users");
  const user = await USERS.findOne({ username });
  const match = user ? await bcrypt.compare(password, user.password) : false;

  // no user find with the given
  // username is found
  if (!user) {
    return res.render("login", {
      user: false,
      err: true,
      errMessage: {
        username: "Account does not exist.",
        password: false
      }
    });
  } else if (!match) {
    return res.render("login", {
      user: false,
      err: true,
      errMessage: {
        username: false,
        password: "Password does not match."
      }
    });
  } else {
    if (userSave) {
      req.session.maxAge = 30 * 24 * 60 * 60 * 1000;
    }

    req.session.user = user._id;
    return res.redirect("/");
  }
});

router.get("/logout", (req, res) => {
  req.session = null;
  res.redirect("/");
});

router.post("/update-points", async (req, res) => {
  const USERS = mongoose.model("users");
  const { points, won } = req.body;
  try {
    const findUser = await USERS.findById(req.session.user);

    if (won) {
      // should add
      await findUser.updateOne({ points: findUser.points + points });
    } else {
      // should subtract

      findUser.points > 0
        ? await findUser.updateOne({ points: findUser.points - points })
        : null;
    }
    const updatedData = await USERS.findById(req.session.user);
    return res.send({ points: updatedData.points });
  } catch (e) {
    console.log(e);
  }
});
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
