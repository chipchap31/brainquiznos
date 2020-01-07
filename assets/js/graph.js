(async function() {
  var $ = document;
  var response = await fetch("/game/fetch");
  var games = await response.json();
  /**
   * Draws the graph
   * @class Graph
   * @param {String} target - get the id of targeted html element
   * @param {String} mode - get the required game mode
   * example if "easy"; it will only rendered easy games
   * @param {String} yAxis - get the required field i.e. [points] or [clicks]

   * @return invokes a @method init()
   **/
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
    const returnPoints = mode => {
      return games
        .filter(doc => {
          return doc.mode === mode;
        })
        .map((doc, i) => {
          return { x: doc.datePlayed, y: doc.points };
        });
    };

    var ctx = $.getElementById(_.target).getContext("2d");

    var chart = new Chart(ctx, {
      // The type of chart we want to create
      type: "line",

      // The data for our dataset
      data: {
        labels: returnPoints("easy").map(date => date.x),
        datasets: [
          {
            label: "Easy",
            data: returnPoints("easy"),
            fill: false,
            backgroundColor: "rgba(255, 99, 132, 0.2)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1
          },
          {
            label: "Normal",
            data: returnPoints("normal"),
            fill: false,
            backgroundColor: "rgb(153, 255, 51,0.2)",
            borderColor: "rgb(153, 255, 51,1)",
            borderWidth: 1
          },
          {
            label: "Hard",
            data: returnPoints("hard"),
            fill: false,
            backgroundColor: "rgba(0, 0, 153, 0.2)",
            borderColor: "rgba(0, 0, 153, 1)",
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
              scaleLabel: {
                display: true,
                labelString: "Points",
                fontColor: "white"
              },
              ticks: {
                fontColor: "white",
                beginAtZero: true
              }
            }
          ]
        }
      }
    });
  };

  var getAllGraphs = $.querySelectorAll("[role='graph'");
  var graphArray = Array.from(getAllGraphs).map(graph => {
    return {
      yAxis: graph.getAttribute("data-yAxis"),
      mode: graph.getAttribute("data-mode"),
      target: graph.getAttribute("id")
    };
  });
  graphArray.forEach(graph => {
    new Graph(graph.target, graph.mode, graph.yAxis);
  });
})();
