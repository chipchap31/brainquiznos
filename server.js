require("dotenv").config();
let express = require("express");
let app = express();
const path = require("path");
const bodyParser = require("body-parser");
// routes
const indexRouter = require("./routes/indexRoute");
const userRouter = require("./routes/userRoute");
const gameRouter = require("./routes/gameRoute");
//-----------
const unsplashRouter = require("./routes/unsplash");
const mongoose = require("mongoose");
const logger = require("morgan");
const cookieSession = require("cookie-session");
const PORT = process.env.PORT || 8000;
const fetch = require("node-fetch");
global.fetch = fetch;
require("./models/userModel");
require("./models/gameModel");
app.use(logger("dev"));
mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function(err) {
    if (!err) {
      console.log("connected to mongodb");
    }
  }
);
app.use(
  cookieSession({
    keys: ["key1", "key2"]
  })
);
app.use(function(req, res, next) {
  req.sessionOptions.maxAge = req.session.maxAge || req.sessionOptions.maxAge;
  next();
});
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "assets")));
app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/game", gameRouter);

app.use("/unsplash", unsplashRouter);
app.listen(PORT, () => console.log(`App is running on port ${PORT}`));
