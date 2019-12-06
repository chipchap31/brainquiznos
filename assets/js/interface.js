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
