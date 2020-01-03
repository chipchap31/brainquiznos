document.addEventListener(
  "DOMContentLoaded",
  function() {
    var btnCollection = document.querySelectorAll("[role='button'");

    btnCollection.forEach(element => {
      var openId = element.getAttribute("data-open") || false;
      var closeList = element.getAttribute("data-close") || false;

      var openData = document.getElementById(openId);

      element.addEventListener("click", function() {
        if (
          this.classList.contains("glider-next") ||
          this.classList.contains("glider-prev")
        ) {
          return false;
        }
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
      responsive: [
        {
          // screens greater than >= 775px
          breakpoint: 375,
          settings: {
            // Set to `auto` and provide item width to adjust to viewport
            slidesToShow: 1.5,
            slidesToScroll: 1,
            itemWidth: 90,
            duration: 0.25
          }
        },
        {
          // screens greater than >= 1024px
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
            itemWidth: 150,
            duration: 0.25
          }
        }
      ],
      arrows: {
        prev: ".glider-prev",
        next: ".glider-next"
      }
    });
  },
  false
);
