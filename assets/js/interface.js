document.addEventListener(
  "DOMContentLoaded",
  function() {
    var btnCollection = document.querySelectorAll("[role='button'");

    btnCollection.forEach(element => {
      var openId = element.getAttribute("data-open");
      var closeId = element.getAttribute("data-close") || false;

      var openData = document.getElementById(openId);
      var closeData = closeId ? document.getElementById(closeId) : false;

      element.addEventListener("click", () => {
        if (openData.classList.contains("open")) {
          openData.classList.remove("open");
        } else {
          openData.classList.add("open");
        }
      });
    });

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
  },
  false
);
