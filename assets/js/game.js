var $ = document;
var $tileContainer = $.querySelector(".tile-container");
var $gameInit = $.querySelector(".game-init");
var $tiles = $.getElementsByClassName("tile");
var $gameMainView = $.getElementById("game-main");
var $gameHomeView = $.getElementById("game-home");
var $gameMainTime = $.querySelector(".game-main-time");
var gameInitTime = $.querySelector(".game-init-time");
var $selected = $.getElementsByClassName("show");
var $tileSolved = $.getElementsByClassName("solved");
var $gameResult = $.getElementById("game-result");
var $gameDifficulty = $.getElementById("game-difficulty");
var $gameResetModal = $.getElementById("game-reset");
var $gameResultSolved = $.querySelector(".game-result-solved");
var $pauseButton = $.querySelector(".pause-button");
var $gamePauseModal = $.getElementById("game-pause");
var $gamePreventModal = $.getElementById("game-prevent");

function Game() {
  this.gameMode = null;
  this.readyTime = 5;
  this.theme = null;
  this.tileData = [];
  this.hintTime = 0;
  this.gameTime = 0;
  this.choices = [];
  this.clicks = 0;
  this.id = "";
  this.lives = 0;
  this.lifeTime = 0;
  this.dateReplenish = [];
}

var tileConfig = {
  total: {
    easy: 10,
    normal: 12,
    hard: 15
  },
  hintTime: {
    easy: 15,
    normal: 10,
    hard: 10
  },
  gameTime: {
    easy: 90,
    normal: 90,
    hard: 120
  },
  multiplier: {
    easy: 0.3,
    normal: 0.5,
    hard: 0.7
  }
};
//data-open="game-main" data-close='game-home game-difficulty'
// @param {array} date - contains dates when to replenish each of the missing life
/**
 * @desc Invokes @method "lifeCountDown" when the user's lives fall under 5
 * @method initLife
 * @param {array} array of dates
 * @return nothing
 **/
Game.prototype.initLife = function(date) {
  clearInterval(window.lifeCountDown);
  window.lifeCountDown = null;
  console.log(date);
  var _ = this;

  _.dateReplenish = date;

  var shouldReplenish = _.lives >= 0;

  const diff = (new Date(date[0].replenishDate) - new Date(Date.now())) / 1000;
  _.lifeTime = diff;

  if (shouldReplenish) {
    window.lifeCountDown = setInterval(() => _.lifeCountDown(), 1000);
  }
};
Game.prototype.lifeCountDown = function() {
  var _ = this;
  const target = document.querySelector("#life-timer span");

  var min = Math.floor((_.lifeTime / 60) % 60);
  var sec = Math.floor((_.lifeTime / 1) % 60);

  if (_.lifeTime <= 0) {
    clearInterval(window.lifeCountDown);
    window.lifeCountDown = null;

    if (_.dateReplenish.length > 0) {
      clearInterval(window.lifeCountDown);
      window.lifeCountDown = null;
      _.dateReplenish.shift();

      _.lifeAdd();
      postData("/user/add-life", {});
      if (_.dateReplenish.length > 0) {
        return _.initLife(_.dateReplenish);
      }

      window.lifeCountDown = setInterval(() => _.lifeCountDown(), 1000);
    }

    return (target.innerHTML = "0:00");
  }
  target.innerHTML = `${min}:${sec < 10 ? "0" + sec : sec}`;

  --_.lifeTime;
};

Game.prototype.lifeAdd = function() {
  const lives = $.getElementsByClassName("life");
  const active = $.getElementsByClassName("on");
  const inactive = $.getElementsByClassName("off").length;
  const index = lives.length - inactive;

  lives[index].classList.add("on");
  lives[index].classList.remove("off");
  lives[index].classList.add("color-pink");
  lives[index].classList.remove("color-black");
};

/**
 * gets the preferred theme of the user
 * @method getTheme
 * @param {String} theme
 * @return {null}
 **/
Game.prototype.getTheme = async function(theme) {
  var _ = this;
  _.theme = theme;
  const livesLeft = $.getElementsByClassName("on");

  if (livesLeft.length <= 0) {
    return $gamePreventModal.classList.add("open");
  }

  $gameDifficulty.classList.add("open");

  Game.prototype.init = async function(gameMode) {
    var _ = this;

    $gameMainView.classList.add("open");
    $gameHomeView.classList.remove("open");
    $gameDifficulty.classList.remove("open");
    // set items to global
    _.gameMode = gameMode;
    _.hintTime = tileConfig.hintTime[_.gameMode];
    _.gameTime = tileConfig.gameTime[_.gameMode];

    // save the game

    _.id = await postData("/game/new", {
      mode: _.gameMode
    });
    window.interval = setInterval(() => _.startCountDown(), 1000);
    try {
      await fetch(`/unsplash/${_.theme}`).then(function(response) {
        response.json().then(function(data) {
          data = data
            .map((x, i) => ({ imgSrc: x.urls.thumb, i }))
            .filter((x, i) => i < tileConfig.total[_.gameMode]);

          data = [...data, ...data].sort(() => 0.5 - Math.random());

          data.forEach(x => {
            var $li = document.createElement("li");
            var $img = document.createElement("img");

            $li.classList.add(x.i, "tile");
            $img.src = x.imgSrc;
            $img.setAttribute("draggable", "false");
            $li.appendChild($img);
            $tileContainer.classList.add(_.gameMode);
            $tileContainer.appendChild($li);
          });
        });
      });
    } catch (e) {
      throw new Error(e);
    }
  };
};

Game.prototype.startCountDown = function() {
  var _ = this;
  var min = Math.floor((_.readyTime / 60) % 60);
  var sec = Math.floor((_.readyTime / 1) % 60);
  if (_.readyTime <= 0) {
    clearInterval(window.interval);
    window.interval = null;
    $tileContainer.classList.remove("hidden");
    $gameInit.classList.remove("open");

    _.showTiles();
    window.interval = setInterval(() => _.hintCountDown(), 1000);
  }
  _.readyTime--;
  gameInitTime.innerHTML = `${sec < 10 ? sec : sec}`;
};
Game.prototype.startNow = function() {
  var _ = this;
  clearInterval(window.interval);
  window.interval = null;
  window.interval = setInterval(() => _.hintCountDown(), 1000);
  _.showTiles();
  $gameInit.classList.remove("open");
};

Game.prototype.hintCountDown = function() {
  var _ = this;
  var min = Math.floor((_.hintTime / 60) % 60);
  var sec = Math.floor((_.hintTime / 1) % 60);
  var gameStarted = _.hintTime <= 0;

  if (gameStarted) {
    clearInterval(window.interval);
    window.interval = null;
    _.hideTiles();
    $tileContainer.classList.add("listening");

    Array.from($tiles).forEach(el => {
      el.addEventListener("click", function() {
        if (_.choices.length <= 1) {
          this.classList.add("show");
          _.choices.push(this.classList[0]);
          _.choices.length >= 2
            ? setTimeout(() => _.proccessChoices(), 1000)
            : null;
        }

        _.clicks++;
      });
    });

    window.interval = setInterval(() => _.gameCountDown(), 1000);
  }
  _.hintTime--;
  $gameMainTime.innerHTML = `0${min}:${sec < 10 ? "0" + sec : sec}`;
};

Game.prototype.gameCountDown = function() {
  var _ = this;
  var min = Math.floor((_.gameTime / 60) % 60);
  var sec = Math.floor((_.gameTime / 1) % 60);
  var tileToSolve = tileConfig.total[_.gameMode] * 2;
  var userWon = $tileSolved.length >= tileToSolve && _.gameTime >= 0;
  var userLost = _.gameTime <= 0 && $tileSolved.length <= tileToSolve;

  var pointsToChange = Math.ceil(
    tileConfig.multiplier[_.gameMode] * _.gameTime
  );

  if (userWon) {
    // tiles are solved completely
    var $gameResultTitle = $.querySelector(".game-result-title");
    clearInterval(window.interval);
    window.interval = null;
    postData("/user/update-points", {
      points: pointsToChange,
      won: true
    });
    postData("/game/update", {
      id: _.id,
      points: pointsToChange,
      clicks: _.clicks,
      won: true
    });
    $gameResult.classList.add("open");
    $.querySelector(
      ".game-result-solved"
    ).innerHTML = `You solved ${$tileSolved.length} out of ${tileToSolve}`;
    $.querySelector(
      ".game-result-points"
    ).innerHTML = `You gained ${pointsToChange} points`;
    $.querySelector(".game-result-title").innerHTML = "Victory";
  }

  if (userLost) {
    // user fails to solve the puzzles

    $gameResult.classList.add("open");
    clearInterval(window.interval);
    window.interval = null;
    postData("/user/update-points", {
      points: pointsToChange,
      won: false
    });
    postData("/game/update", {
      id: _.id,
      points: pointsToChange,
      clicks: _.clicks,
      won: false
    });
    $.querySelector(
      ".game-result-solved"
    ).innerHTML = `You solved ${$tileSolved.length} out of ${tileToSolve}`;
    $.querySelector(".game-result-points").innerHTML = "You lost a life!";
    $.querySelector(".game-result-title").innerHTML = "Defeat";
  }

  $gameMainTime.innerHTML = `0${min}:${sec < 10 ? "0" + sec : sec}`;
  _.gameTime--;
};
Game.prototype.proccessChoices = function() {
  var _ = this;
  // whenever a user clicks on a tile
  // it adds it to the choices array
  // whenever it is greater than two
  if (_.choices[0] !== _.choices[1]) {
    Array.from($selected).forEach(e => {
      !e.classList.contains("solved") ? e.classList.remove("show") : null;
    });
    _.choices.length = 0;
  } else {
    Array.from($selected).forEach(e => {
      e.classList.add("solved");
      _.choices.length = 0;
    });
  }
};

Game.prototype.showTiles = function() {
  var _ = this;

  Array.from($tiles).forEach(x => x.classList.add("show"));
};
Game.prototype.hideTiles = function() {
  var _ = this;
  if (_.hintTime >= 0) {
    Array.from($tiles).forEach(x => x.classList.remove("show"));
  }
};

Game.prototype.stopCountDown = function() {
  var _ = this;
  _.hideTiles();
  clearInterval(window.interval);

  window.interval = null;
};

Game.prototype.resumeGame = function() {
  var _ = this;

  $gamePauseModal.classList.remove("open");
  $gameResetModal.classList.remove("open");
  clearInterval(window.interval);
  window.interval = null;

  if (_.hintTime <= 0) {
    // game started so continue to game time countdown

    window.interval = setInterval(() => _.gameCountDown(), 1000);
  } else {
    _.showTiles();
    window.interval = setInterval(() => _.hintCountDown(), 1000);
  }
};
Game.prototype.resetGame = function() {
  clearInterval(window.interval);
  window.interval = null;
  $gameResult.classList.remove("open");
  var _ = this;

  Array.from($tiles).forEach(el => el.remove());

  _.gameTime = 0;
  _.hintTime = 0;

  _.init(_.gameMode);
};
var game = new Game();

/**
 * Reusable post function
 * @method postData
 * @param {String} path - server route
 * @param {Object} body - request body
 * @return {JSON} returns array or object
 **/
function postData(path, body) {
  return fetch(path, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Origin": "*"
    },
    body: JSON.stringify(body)
  })
    .then(res => res.json())
    .then(res => res);
}
