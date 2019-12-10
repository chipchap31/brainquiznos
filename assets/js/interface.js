document.addEventListener(
  "DOMContentLoaded",
  function() {
    var btnCollection = document.querySelectorAll("[role='button'");

    btnCollection.forEach(element => {
      var openId = element.getAttribute("data-open");
      var closeList = element.getAttribute("data-close") || false;

      var openData = document.getElementById(openId);

      element.addEventListener("click", () => {
        if (openData.classList.contains("open")) {
          openData.classList.remove("open");
        } else {
          openData.classList.add("open");
        }
        if (!closeList) return null;

        closeList.split(" ").forEach(el => {
          var closeTarget = document.getElementById(el);

          closeTarget.classList.remove("open");
        });
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
