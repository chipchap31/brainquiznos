const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const requireLogin = require("../middlewares/requireLogin");

router.post("/signup", async function(req, res, next) {
  const USERS = mongoose.model("users");
  const { username, email, password, password2, gender } = req.body;
  const uniqueEmail = await USERS.findOne({ email });
  const uniqueUsername = await USERS.findOne({ username });
  const userExist = Boolean(uniqueEmail) || Boolean(uniqueEmail);
  // displays an error when user does not
  // have any number in their username

  const validation = await validate(req.body);

  if (validation.err) {
    res.render("signup", {
      loggedIn: false,
      err: true,
      errMessage: validation.errMessage
    });
  } else if (userExist) {
    res.render("signup", {
      loggedIn: false,
      err: true,
      errMessage: {
        username: "Username or email already exist!",
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
      return res.render("signup-success", { loggedIn: false, username });
    });
  }
});
router.post("/login", async (req, res) => {
  // enable user to login
  // throw error if account already exist
  const { username, password, remember } = req.body;

  // user gave permission to save the session
  const userSave = remember ? JSON.parse(remember) : false;
  const USERS = mongoose.model("users");
  try {
    // find the user on the database
    const fetchUser = await USERS.findOne({ username });

    // compare the password using bcrypt
    const match = fetchUser
      ? await bcrypt.compare(password, fetchUser.password)
      : false;

    // render some error message to the user
    if (!fetchUser) {
      return res.render("login", {
        loggedIn: false,
        err: true,
        errMessage: {
          username: "Account does not exist.",
          password: false
        }
      });
    } else if (!match) {
      return res.render("login", {
        loggedIn: false,
        err: true,
        errMessage: {
          username: false,
          password: "Password does not match."
        }
      });
    } else {
      const thirtyDays = 30 * 24 * 60 * 60 * 1000;
      // increase the maximum age of cookie
      // enable save data to cookie
      userSave ? (req.session.maxAge = thirtyDays) : null;

      const dataToSave = {
        id: fetchUser._id,
        username: fetchUser.username,
        gender: fetchUser.gender,
        games: fetchUser.games,
        life: fetchUser.life,
        points: fetchUser.points
      };
      // start the session
      req.session.user = dataToSave;
      return res.redirect("/");
    }
  } catch (e) {
    throw new Error(e);
  }
});

router.get("/logout", (req, res) => {
  req.session = null;
  res.redirect("/");
});

router.post("/update-points", requireLogin, async (req, res) => {
  const USERS = mongoose.model("users");
  const { points, won } = req.body;
  const id = req.session.user.id;
  try {
    const findUser = await USERS.findById(id);

    if (won) {
      // should add
      await findUser.updateOne({
        points: findUser.points + points
      });
    } else {
      // should subtract
      const shouldSubtract = findUser.life > 0;

      await findUser.updateOne({
        points: findUser.points - points,
        life: findUser.life - 1
      });
    }

    const updatedData = await USERS.findById(id);

    req.session.user.points = updatedData.points;
    req.session.user.life = updatedData.life;
    return res.send({});
  } catch (e) {
    throw new Error(e);
  }
});

router.post("/update-life", requireLogin, async (req, res, next) => {
  const USERS = mongoose.model("users");

  const id = req.session.user.id;
  try {
    const fetchUser = await USERS.findById(id);
    const shouldAdd = fetchUser.life <= 4;

    await fetchUser.updateOne({
      life: shouldAdd ? fetchUser.life + 1 : fetchUser.life
    });

    const updatedUser = await USERS.findById(id);

    req.session.user.life = updatedUser.life;

    res.send({});
  } catch (e) {
    throw new Error(e);
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
