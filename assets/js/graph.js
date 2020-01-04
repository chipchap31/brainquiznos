var ctx = document.getElementById("points-stats").getContext("2d");
async function fetchAllGames() {
  return await fetch("/game/fetch")
    .then(res => res.json())
    .then(res => {
      return res;
    });
}
const points = fetchAllGames().then(data => data);
(async () => {
  let response = await fetch("/game/fetch");
  let games = await response.json();
  var timeFormat = "MM/DD/YYYY HH:mm";
  var chart = new Chart(ctx, {
    // The type of chart we want to create
    type: "line",

    // The data for our dataset
    data: {
      datasets: [
        {
          fill: false,
          label: "Gained of points",
          data: games.map((doc, i) => {
            return { x: new Date(doc.datePlayed), y: doc.points };
          }),
          labels: ["Red", "Blue", "Purple", "Yellow"],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)"
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)"
          ],
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
              parser: timeFormat
            },
            scaleLabel: {
              display: true,
              labelString: "Date",
              fontColor: "white"
            },
            ticks: {
              max: 8,
              min: 5,
              stepSize: 2,
              fontColor: "white"
            }
          }
        ],
        yAxes: [
          {
            ticks: {
              fontColor: "white"
            }
          }
        ]
      }
    }
  });
})();
