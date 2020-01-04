(async function() {
  var $ = document;
  var response = await fetch("/game/fetch");
  var games = await response.json();

  function Graph(target, mode, yAxis, width, height) {
    var _ = this;

    _.target = target;
    _.mode = mode;
    _.yAxis = yAxis;
    _.width = width;
    _.height = height;
    _.init();
  }

  Graph.prototype.init = function() {
    var _ = this;
    var timeFormat = "dddd";

    const data = games
      .filter(doc => {
        if (_.mode === "all") {
          return true;
        }
        return doc.mode === _.mode;
      })
      .map((doc, i) => {
        return { x: doc.datePlayed, y: doc[_.yAxis] };
      });

    // set dimensions

    var ctx = $.getElementById(_.target).getContext("2d");
    console.log(data);
    var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: "line",

      // The data for our dataset
      data: {
        labels: data.map(date => date.x),
        datasets: [
          {
            label: `Gained ${_.yAxis} ${
              _.mode !== "all" ? "(" + _.mode + " " + "mode)" : ""
            }`,
            data,

            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1
          }
        ]
      },

      // Configuration options go here
      options: {
        legend: {
          labels: {
            fontColor: "white"
          }
        },
        responsiveAnimationDuration: 1,
        scales: {
          xAxes: [
            {
              type: "time",
              time: {
                tooltipFormat: "ll HH:mm"
              },
              scaleLabel: {
                display: true,
                labelString: "Date",
                fontColor: "white"
              },
              ticks: {
                fontColor: "white"
              }
            }
          ],
          yAxes: [
            {
              ticks: {
                fontColor: "white",
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
    chart.canvas.parentNode.style.height = `${_.height}px`;
    chart.canvas.parentNode.style.width = `${_.width}px`;
  };

  var getAllGraphs = $.querySelectorAll("[role='graph'");
  var graphArray = Array.from(getAllGraphs).map(graph => {
    return {
      yAxis: graph.getAttribute("data-yAxis"),
      mode: graph.getAttribute("data-mode"),
      width: graph.getAttribute("data-width"),
      height: graph.getAttribute("data-height"),
      target: graph.getAttribute("id")
    };
  });
  graphArray.forEach(graph => {
    new Graph(graph.target, graph.mode, graph.yAxis, graph.width, graph.height);
  });
})();
