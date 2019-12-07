window.addEventListener("load", function() {
  new Glider(document.querySelector(".glider"), {
    slidesToScroll: 1,
    slidesToShow: 2.5,
    draggable: true,
    rewind: true,

    arrows: {
      prev: ".glider-prev",
      next: ".glider-next"
    }
  });
});
var $gameHomeView = $("#game-home");
var $gameDifficulty = $("#game-difficulty");
$(window).on("click", function(e) {
  console.log(e.target.classList[0]);

  switch (e.target.classList[0]) {
    case "open-game-difficulty":
      $gameHomeView.removeClass("open");
      $gameDifficulty.addClass("open");
      break;
    default:
  }
});
