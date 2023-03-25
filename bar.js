// set the dimensions and margins of the graph
var margin = {top: 10, right: 30, bottom: 20, left: 50},
    width = 460 - margin.left - margin.right + 20,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page


// Parse the Data
var data1 =
    [{
        season: "6",
        women: 66.67,
        poc_women: 100
    }, {
        season: "10",
        women: 45.45,
        poc_women: 50
    }, {
        season: "28",
        women: 85.71,
        poc_women: 100,
    }, {
        season: "33",
        women: 71.42,
        poc_women: 71.42
    },{
        season: "37",
        women: 42.86,
        poc_women: 66.67
    }, {
        season: "41",
        women: 42.85,
        poc_women: 25
    }, {
        season: "42",
        women: 66.67,
        poc_women: 50
    }, {
        season: "43",
        women: 83.33,
        poc_women: 60,
    }]

var data2 =
    [{
        season: "41",
        women: 42.85,
        poc_women: 25
    }, {
        season: "42",
        women: 66.67,
        poc_women: 50
    }, {
        season: "43",
        women: 83.33,
        poc_women: 60,
    }]


// List of subgroups
var subgroups = ["women", "poc_women"]

// List of groups = value of the first column called group -> I show them on the X axis
var groups = d3.map(data1, function(d){return(d.season)}).keys()

var svg2 = d3.select("#bars")
    .append("svg")
    .attr("width", width + margin.left + margin.right + 30)
    .attr("height", height + margin.top + margin.bottom + 40)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

// Add X axis
var x = d3.scaleBand()
    .domain(groups)
    .range([0, width])
    .padding([0.2])
var xAxis = svg2.append("g")
    .attr("transform", "translate(0," + height + ")")
    .call(d3.axisBottom(x).tickSize(0));

// Add Y axis
var y = d3.scaleLinear()
    .domain([0, 100])
    .range([ height, 0 ]);

// Another scale for subgroup position?
var xSubgroup = d3.scaleBand()
    .domain(subgroups)
    .range([0, x.bandwidth()])
    .padding([0.05])

// color palette = one color per subgroup
var color = d3.scaleOrdinal()
    .domain(subgroups)
    .range(['#FF7F50','#1a68e4'])

var yAxis = svg2.append("g")
    .call(d3.axisLeft(y).tickFormat(function(d) {return (d) + "%";}));


svg2.append("text")
    .attr("transform",
        "translate(" + (width/2) + " ," +
        (height + margin.top + 20) + ")")
    .style("text-anchor", "middle")
    .text("Seasons");

// add y axis label
svg2.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left - 4)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Percentage Eliminated");

// Show the bars
svg2.append("g")
    .selectAll("g")
    // Enter in data = loop group per group
    .data(data1)
    .enter()
    .append("g")
    .attr("transform", function(d) { return "translate(" + x(d.season) + ",0)"; })
    .selectAll("rect")
    .data(function(d) { return subgroups.map(function(key) { return {key: key, value: d[key]}; }); })
    .enter().append("rect")
    .attr("x", function(d) { return xSubgroup(d.key); })
    .attr("y", function(d) { return y(d.value); })
    .attr("width", xSubgroup.bandwidth())
    .attr("height", function(d) { return height - y(d.value); })
    .attr("fill", function(d) { return color(d.key); })

function update(data) {

    newGroups = d3.map(data, function(d){return(d.season)}).keys()

    x.domain(newGroups)
    xAxis.call(d3.axisBottom(x))
        .range([0, width])
        .padding([0.2])

    xSubgroup = d3.scaleBand()
        .domain(subgroups)
        .range([0, x.bandwidth()])
        .padding([0.05])

// Update the Y axis
    // y.domain([0, d3.max(data, function(d) { return d.value }) ]);
    // yAxis.transition().duration(1000).call(d3.axisLeft(y));

// Create the u variable
    var u = svg2.selectAll("rect")
        .data(data)

    u
        .enter()
        .append("g")
        .attr("transform", function(d) { return "translate(" + x(d.season) + ",0)"; })
        .data(function(d) { return subgroups.map(function(key) { return {key: key, value: d[key]}; }); })
        .enter().append("rect")
        .attr("x", function(d) { return xSubgroup(d.key); })
        .attr("y", function(d) { return y(d.value); })
        .attr("width", xSubgroup.bandwidth())
        .attr("height", function(d) { return height - y(d.value); })
        .attr("fill", function(d) { return color(d.key); })

// Animate the rectangles
    u.transition()
        .duration(500)
        .attr("x", function(d) { return xSubgroup(d.key); })
        .attr("y", function(d) { return y(d.value); })
        .attr("width", xSubgroup.bandwidth())
        .attr("height", function(d) { return height - y(d.value); })
        .attr("fill", function(d) { return color(d.key); })

    // If less group in the new dataset, I delete the ones not in use anymore
    u
        .exit()
        .remove()
} // End of update function


    // update(data1)


function changeDataBar(data) {
    // newGroups = d3.map(data, function(d){return(d.season)}).keys()
    console.log(newGroups)
    console.log("Did I make it in?")
    svg2.selectAll("g")
        .data(data)
        .selectAll("rect")
        .data(function(d) { return subgroups.map(function(key) { return {key: key, value: d[key]}; }); })
        .transition()
        .duration(500)
        .attr("x", function(d) { return xSubgroup(d.key); })
        .attr("y", function(d) { return y(d.value); })
        .attr("width", xSubgroup.bandwidth())
        .attr("height", function(d) { return height - y(d.value); })
        .attr("fill", function(d) { return color(d.key); })

    console.log("Did I make it in?")
}

d3.select("button#bar1")
    .on("click", function () {
        changeDataBar(data1);
    })

d3.select("button#bar2")
    .on("click", function () {
        changeDataBar(data2);
    })


