const express = require("express");
const router = express.Router();

// users signs up
router.post("/signup", async function(req, res, next) {
  const { username, email, password, password2, gender } = req.body;

  // displays an error when user does not
  // have any number in their username

  const validation = await validate(req.body);

  if (validation.err) {
    res.render("signup", {
      user: false,
      err: true,
      errMessage: validation.errMessage
    });
  } else {
  }
  res.send({ message: err });
});

module.exports = router;

function validate(data) {
  var err = [];
  let output = {};
  for (var key in data) {
    switch (key) {
      case "username":
        if (data[key].length < 7) {
          err.push({ [key]: "Username must contain at least 8 characters." });
        }
        break;
      case "email":
        if (/\S+@\S+\.\S+/.test(data[key])) {
          err.push({ [key]: "Email must be valid." });
        }
        break;
      case "password":
        if (data[key].length < 7) {
          err.push({ [key]: "Password must contain at least 8 characters." });
        }
        break;
      default:
    }
  }
  // const array = [{ username: "emem" }, { password: "password" }];
  // let object = Object.assign({}, ...array);
  // console.log(object);

  // user fails the form requirements
  if (err.length > 0) {
    return {
      user: false,
      err: true,
      errMessage: Object.assign({}, ...err)
    };
  }
}
