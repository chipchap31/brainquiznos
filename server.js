require("dotenv").config();
let express = require("express");
let app = express();
const path = require("path");
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");
const userRouter = require("./routes/user");
const mongoose = require("mongoose");
require("./models/userModel");
mongoose.connect(
  process.env.MONGO_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function(err) {
    if (!err) {
      console.log("connected to mongodb");
    }
  }
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "assets")));
app.use("/", indexRouter);
app.use("/user", userRouter);

app.listen(4000, () => console.log("Example app listening on port 4000!"));