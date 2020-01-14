var express = require("express");
const fetch = require("node-fetch");
var router = express.Router();
global.fetch = fetch;
const Unsplash = require("unsplash-js").default;
const unsplash = new Unsplash({
  accessKey: process.env.UNSPLASH_KEY
});

router.get("/:theme", async (req, res, next) => {
  unsplash.search
    .photos(req.params.theme, Math.floor(Math.random() * 10) + 1, 15, {
      orientation: "portrait"
    })
    .then(response => response.json())
    .then(response => {
      res.send(response.results);
    });
});

module.exports = router;
