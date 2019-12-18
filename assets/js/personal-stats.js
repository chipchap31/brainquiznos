var margin = { top: 10, right: 30, bottom: 30, left: 60 },
  width = 500 - margin.left - margin.right,
  height = 300 - margin.top - margin.bottom;

var canvas = d3
  .select("#personal-stats")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("/game/fetch", function(data) {
  var initXaxis = [];
  let $data = data.map(x => ({
    date: new Date(x.datePlayed),

    points: x.points
  }));
  var today = new Date();
  let tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  console.log($data.length > 0);
  var xAxis = d3
    .scaleTime()
    .domain(
      $data.length > 1
        ? d3.extent($data, function(d) {
            return d.date;
          })
        : [new Date(), tomorrow]
    )
    .range([0, width]);

  var x = d3
    .scaleTime()
    .domain(
      d3.extent($data, function(d) {
        return d.date;
      })
    )
    .range([0, width]);
  canvas
    .append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(xAxis).ticks(5));
  var y = d3
    .scaleLinear()
    .domain([100, 0])
    .range([0, height]);

  canvas.append("g").call(d3.axisLeft(y));
  // axis
  canvas
    .append("path")
    .datum($data)
    .attr("fill", "none")
    .attr("stroke", "#d62af6")
    .attr("stroke-width", 1.5)
    .attr(
      "d",
      d3
        .line()
        .x(function(d) {
          return x(d.date);
        })
        .y(function(d) {
          return y(d.points);
        })
    );
  canvas
    .selectAll("dot")
    .data($data)
    .enter()
    .append("circle")

    .attr("r", 2)
    .attr("cx", function(d) {
      return x(d.date);
    })
    .attr("cy", function(d) {
      return y(d.points);
    })
    .attr("fill", "white");
});
canvas
  .append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left)
  .attr("x", 0 - height / 2)
  .attr("dy", "1em")
  .style("text-anchor", "middle")
  .text("Points");
canvas
  .append("text")
  .attr(
    "transform",
    "translate(" + width / 2 + " ," + (height + margin.top + 20) + ")"
  )
  .style("text-anchor", "middle")
  .text("Time");
