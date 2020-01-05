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
    const returnPoints = mode => {
      return games
        .filter(doc => {
          return doc.mode === mode;
        })
        .map((doc, i) => {
          return { x: doc.datePlayed, y: doc.points };
        });
    };

    // set dimensions

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
            backgroundColor: "rgba(0, 102, 0,0.2)",
            borderColor: "rgba(0, 102, 0, 1)",
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
