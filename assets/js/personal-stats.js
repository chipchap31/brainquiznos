var margin = { top: 10, right: 30, bottom: 30, left: 60 },
  width = 500 - margin.left - margin.right,
  height = 300 - margin.top - margin.bottom;
var xFormat = "%d-%b-%Y";
var canvas = d3
  .select("#personal-stats")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.json("/game/fetch", function(data) {
  var formatDate = d3.timeFormat("%Y-%m-%d");
  let $data = data.map(x => ({
    date: new Date(x.datePlayed),

    points: x.points
  }));
  console.log($data);
  var xAxis = d3
    .scaleTime()
    .domain(
      d3.extent($data, function(d) {
        return d.date;
      })
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
    .attr("stroke", "white")
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

    .attr("r", 3)
    .attr("cx", function(d) {
      return x(d.date);
    })
    .attr("cy", function(d) {
      return y(d.points);
    })
    .attr("fill", "#d62af6");
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
