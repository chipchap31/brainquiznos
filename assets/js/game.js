var $ = document;
var $tileContainer = $.querySelector(".tile-container");
var $gameInit = $.querySelector(".game-init");
var $tiles = $.getElementsByClassName("tile");
var $gameMainView = $.getElementById("game-main");
var $gameHomeView = $.getElementById("game-home");
var $gameMainTime = $.querySelector(".game-main-time");
var $gameInitModal = $.querySelector(".game-init");
var $selected = $.getElementsByClassName("show");
var $tileSolved = $.getElementsByClassName("solved");
var $gameResult = $.getElementById("game-result");
var $gameDifficulty = $.getElementById("game-difficulty");
var $gameResetModal = $.getElementById("game-reset");
var $gameResultSolved = $.querySelector(".game-result-solved");
var $pauseButton = $.querySelector(".pause-button");
var $gamePauseModal = $.getElementById("game-pause");
var $gamePreventModal = $.getElementById("game-prevent");
var $gameResetPointsLost = $.getElementById("game-reset-pointsLost");
var $gameHelper = $.querySelector("#game-main .helper");
var $loader = $.getElementById("loader-wrapper");
const $livesLeft = $.getElementsByClassName("on");

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
  this.match = 0;
  this.pointsToChange = 0;
}

var tileConfig = {
  total: {
    easy: 10,
    normal: 12,
    hard: 15
  },
  hintTime: {
    easy: 15,
    normal: 15,
    hard: 15
  },
  gameTime: {
    easy: 60,
    normal: 90,
    hard: 120
  },
  multiplier: {
    easy: 0.3,
    normal: 0.5,
    hard: 0.7
  },
  pointsLost: {
    easy: 15,
    normal: 10,
    hard: 5
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
  const target = $.querySelector("#life-timer span");
  const target2 = $.getElementById("life-modal-timer");
  var min = Math.floor((_.lifeTime / 60) % 60);
  var sec = Math.floor((_.lifeTime / 1) % 60);

  if (_.lifeTime <= 0) {
    clearInterval(window.lifeCountDown);
    window.lifeCountDown = null;
    $gamePreventModal.classList.remove("open");
    if (_.dateReplenish.length > 0) {
      clearInterval(window.lifeCountDown);
      window.lifeCountDown = null;
      _.dateReplenish.shift();

      _.lifeAdd();
      postData("/user/update-life", {});
      if (_.dateReplenish.length > 0) {
        return _.initLife(_.dateReplenish);
      }

      window.lifeCountDown = setInterval(() => _.lifeCountDown(), 1000);
    }

    return (target.innerHTML = "0:00");
  }
  target.innerHTML = `${min}:${sec < 10 ? "0" + sec : sec}`;
  if (window.location.href) {
  }
  if (window.location.pathname === "/") {
    target2.innerHTML = `${min}:${sec < 10 ? "0" + sec : sec}`;
  }

  --_.lifeTime;
};

Game.prototype.lifeAdd = function() {
  const lives = $.getElementsByClassName("life");
  const inactive = $.getElementsByClassName("off").length;
  const index = lives.length - inactive;

  lives[index].classList.add("on");
  lives[index].classList.remove("off");
  lives[index].classList.add("color-pink");
  lives[index].classList.remove("color-black");
};
Game.prototype.lifeRemove = function() {
  const lives = $.getElementsByClassName("life");
  const inactive = $.getElementsByClassName("on");
  const index = inactive.length - 1;

  lives[index].classList.add("off");
  lives[index].classList.remove("on");
  lives[index].classList.add("color-black");
  lives[index].classList.remove("color-pink");
};

/**
 * gets the preferred theme of the user
 * @method getTheme
 * @param {String} theme
 * @return {null}
 **/
Game.prototype.getTheme = function(theme) {
  var _ = this;
  _.theme = theme;

  if ($livesLeft.length <= 0) {
    return $gamePreventModal.classList.add("open");
  }

  $gameDifficulty.classList.add("open");
};
Game.prototype.init = async function(gameMode) {
  var _ = this;
  _.gameMode = gameMode;
  _.hintTime = tileConfig.hintTime[_.gameMode];
  _.gameTime = tileConfig.gameTime[_.gameMode];

  $gameResetPointsLost.innerHTML = tileConfig.pointsLost[_.gameMode];
  $tileContainer.classList.add(_.gameMode);

  // add a placeholder before images are loaded
  for (var i = 0; i < tileConfig.total[_.gameMode] * 2; i++) {
    var $li = document.createElement("li");

    $li.classList.add("tile");
    $tileContainer.appendChild($li);
  }

  /* * * end of code block * * */

  $gameMainView.classList.add("open");
  $gameHomeView.classList.remove("open");
  $gameDifficulty.classList.remove("open");

  try {
    $gameHelper.innerHTML = "Creating new game...";
    $loader.classList.add("open");
    var $tiles = $.getElementsByClassName("tile");
    const fetchImgs = await fetch(`/unsplash/${_.theme}`);
    let imgsArray = await fetchImgs.json();

    imgsArray = imgsArray
      .map((x, i) => ({ imgSrc: x.urls.thumb, index: i }))
      .filter((x, i) => i < tileConfig.total[_.gameMode]);

    imgsArray = [...imgsArray, ...imgsArray].sort(() => 0.5 - Math.random());

    Array.from($tiles).forEach((li, i) => {
      var $img = document.createElement("img");
      li.className = `${imgsArray[i].index} tile`;
      $img.src = imgsArray[i].imgSrc;
      $img.setAttribute("draggable", "false");
      li.appendChild($img);
    });
  } catch (e) {
    throw new Error(e);
  } finally {
    $gameHelper.innerHTML = "Game is ready.";
    $loader.classList.remove("open");
    $gameInitModal.classList.add("open");
  }
};

Game.prototype.startNow = async function() {
  $gameInitModal.classList.remove("open");
  if ($livesLeft.length <= 0) {
    return $gamePreventModal.classList.add("open");
  }
  clearInterval(window.interval);
  window.interval = null;
  var _ = this;

  window.interval = setInterval(() => _.hintCountDown(), 1000);
  try {
    _.id = await postData("/game/new", {
      mode: _.gameMode
    });
  } catch (e) {
    throw new Error();
  }
  _.showTiles();
  $gameHelper.innerHTML = "Memorize the images shown.";
};

Game.prototype.hintCountDown = function() {
  var _ = this;
  var min = Math.floor((_.hintTime / 60) % 60);
  var sec = Math.floor((_.hintTime / 1) % 60);
  var gameStarted = _.hintTime <= 0;

  if (gameStarted) {
    $gameHelper.innerHTML = `${_.gameMode.charAt(0).toUpperCase() +
      _.gameMode.slice(1)} Mode`;
    clearInterval(window.interval);
    window.interval = null;
    _.hideTiles();
    $tileContainer.classList.add("listening");

    Array.from($tiles).forEach(el => {
      el.addEventListener("click", function() {
        // fix the bug -> when user double clicks an image it adds to _.choices

        if (_.choices.length <= 1) {
          // open the image clicked

          if (!this.classList.contains("show")) {
            // the image is open already
            this.classList.add("show");
            _.choices.push(this.classList[0]);
          }

          _.choices.length >= 2
            ? setTimeout(() => _.proccessChoices(), 1000)
            : null;
        }
      });
    });

    window.interval = setInterval(() => _.gameCountDown(), 1000);
  }
  _.hintTime--;
  $gameMainTime.innerHTML = `0${min}:${sec < 10 ? "0" + sec : sec}`;
};

Game.prototype.gameCountDown = async function() {
  var _ = this;
  var min = Math.floor((_.gameTime / 60) % 60);
  var sec = Math.floor((_.gameTime / 1) % 60);
  var tileToSolve = tileConfig.total[_.gameMode] * 2;
  var userWon = $tileSolved.length >= tileToSolve && _.gameTime >= 0;
  var userLost = _.gameTime <= 0 && $tileSolved.length <= tileToSolve;

  _.pointsToChange = Math.ceil(tileConfig.multiplier[_.gameMode] * _.gameTime);

  if (userWon) {
    // tiles are solved completely

    var $gameResultTitle = $.querySelector(".game-result-title");
    clearInterval(window.interval);
    window.interval = null;
    postData("/user/update-points", {
      points: _.pointsToChange,
      won: true
    });
    postData("/game/update", {
      id: _.id,
      points: _.pointsToChange,
      clicks: _.clicks,
      won: true
    });
    $gameResult.classList.add("open");
    $.querySelector(
      ".game-result-solved"
    ).innerHTML = `You solved ${$tileSolved.length} out of ${tileToSolve}`;
    $.querySelector(
      ".game-result-points"
    ).innerHTML = `You gained ${_.pointsToChange} points`;
    $.querySelector(".game-result-title").innerHTML = "Victory";
  }

  if (userLost) {
    // user fails to solve the puzzles

    clearInterval(window.interval);
    window.interval = null;
    postData("/user/update-points", {
      points: tileConfig.pointsLost[_.gameMode],
      won: false
    });
    const replenishDate = await postData("/game/update", {
      id: _.id,
      points: tileConfig.pointsLost[_.gameMode],
      clicks: _.clicks,
      won: false
    });
    _.lifeRemove();
    _.initLife([..._.dateReplenish, { replenishDate: replenishDate.date }]);
    $.querySelector(
      ".game-result-solved"
    ).innerHTML = `You solved ${$tileSolved.length} out of ${tileToSolve}`;
    $.querySelector(".game-result-points").innerHTML = "You lost a life!";
    $.querySelector(".game-result-title").innerHTML = "Defeat";
    $gameResult.classList.add("open");
  }

  $gameMainTime.innerHTML = `0${min}:${sec < 10 ? "0" + sec : sec}`;
  _.gameTime--;
};
Game.prototype.proccessChoices = function() {
  var _ = this;
  // whenever a user clicks on a tile
  // it adds it to the choices array
  // whenever it is greater than two
  _.clicks++;
  if (_.choices[0] !== _.choices[1]) {
    Array.from($selected).forEach(e => {
      !e.classList.contains("solved") ? e.classList.remove("show") : null;
    });
    _.choices.length = 0;
  } else {
    _.match++;
    // when user successfully match the images
    Array.from($selected).forEach(e => {
      e.classList.add("solved");
      _.choices.length = 0;
    });
  }
};

Game.prototype.showTiles = function() {
  var _ = this;

  Array.from($tiles).forEach(x => {
    x.classList.add("show");
  });
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
Game.prototype.resetGame = async function() {
  clearInterval(window.interval);
  window.interval = null;
  var _ = this;
  var $tileSolved = $.getElementsByClassName("solved");
  var tileToSolve = tileConfig.total[_.gameMode] * 2;
  $gameResult.classList.remove("open");

  var _ = this;

  $gameMainTime.innerHTML = "00:00";
  $gameInitModal.classList.add("open");
  console.log($tileSolved.length);
  var activeAndDone = $tileSolved.length < tileToSolve && _.gameTime > 0;
  var activeAndUndone = $tileSolved.length < tileToSolve && _.gameTime > 0;

  try {
    if (activeAndUndone) {
      // if user wants reset early
      _.lifeRemove();
      const replenishDate = await postData("/game/update", {
        id: _.id,
        points: tileConfig.pointsLost[_.gameMode],
        clicks: _.clicks,
        won: false
      });
      postData("/user/update-points", {
        points: tileConfig.pointsLost[_.gameMode],
        won: false
      });
      _.initLife([..._.dateReplenish, { replenishDate: replenishDate.date }]);
    }
  } catch (e) {
    throw new Error(e);
  } finally {
    Array.from($tiles).forEach(x => x.remove());
    _.gameTime = 0;
    _.hintTime = 0;
    postData("/user/update-points", {
      points: _.pointsToChange,
      won: true
    });
    _.init(_.gameMode);
    id = null;
  }
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
