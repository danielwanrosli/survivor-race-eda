data =
    [{
        season: 1,
        percentile: 37.50,
        percentage: 12.5
    }, {
        season: 2,
        percentile: 35.44,
        percentage: 18.75
    }, {
        season: 3,
        percentile: 37.50,
        percentage: 6.25
    }, {
        season: 4,
        percentile: 81.25,
        percentage: 12.5
    }, {
        season: 5,
        percentile: 42.06,
        percentage: 18.75
    }, {
        season: 6,
        percentile: 18.75,
        percentage: 12.5
    }, {
        season: 7,
        percentile: 43.75,
        percentage: 11.76
    }, {
        season: 8,
        percentile: 58.33,
        percentage: 11.11
    }, {
        season: 9,
        percentile: 44.45,
        percentage: 5.55
    }, {
        season: 10,
        percentile: 27.50,
        percentage: 10
    }, {
        season: 11,
        percentile: 77.78,
        percentage: 5.55
    }, {
        season: 12,
        percentile: 50.00,
        percentage: 12.5
    }, {
        season: 13,
        percentile: 41.58,
        percentage: 75
    }, {
        season: 14,
        percentile: 45.63,
        percentage: 78.95
    }, {
        season: 15,
        percentile: 45.63,
        percentage: 18.75
    }, {
        season: 16,
        percentile: 53.75,
        percentage: 20
    }, {
        season: 17,
        percentile: 53.89,
        percentage: 16.67
    }, {
        season: 18,
        percentile: 31.25,
        percentage: 16.67
    }, {
        season: 19,
        percentile: 47.50,
        percentage: 18.75
    }, {
        season: 20,
        percentile: 46.65,
        percentage: 15
    }, {
        season: 21,
        percentile: (1 - 10.4/20) * 100,
        percentage: 20
        }, {
        season: 22,
        percentile: (1 - 11.33/20) * 100,
        percentage: 15
    }, {
        season: 23,
        percentile: (1 - 10.5/20) * 100,
        percentage: 33.33
    }, {
        season: 24,
        percentile: (1 - 8.25/18) * 100,
        percentage: 22.22
    }, {
        season: 25,
        percentile: (1 - 11.8/18) * 100,
        percentage: (5/18) * 100
    }, {
        season: 26,
        percentile: (1 - 13.25/20) * 100,
        percentage: 20
    }, {
        season: 27,
        percentile: 50,
        percentage: 10
    }, {
        season: 28,
        percentile: (1 - 12.6/18) * 100,
        percentage: 25
    }, {
        season: 29,
        percentile: (1 - 11.5/18) * 100,
        percentage: (4/18) * 100
    }, {
        season: 30,
        percentile: (1 - 11.4/18) * 100,
        percentage: (5/18) * 100
    }, {
        season: 31,
        percentile: (1 - 11.2/20) * 100,
        percentage: 20
    }, {
        season: 32,
        percentile: (1 - 9.25/18) * 100,
        percentage: 22.22
    }, {
        season: 33,
        percentile: (1 - 14.4/20) * 100,
        percentage: 20
    }, {
        season: 34,
        percentile: (1 - 8.8/20) * 100,
        percentage: 20
    }, {
        season: 35,
        percentile: (1 - 10.2/20) * 100,
        percentage: 25
    }, {
        season: 36,
        percentile: (1 - 11.2/20) * 100,
        percentage: 20
    }, {
        season: 37,
        percentile: (1 - 15.33/20) * 100,
        percentage: 25
    }, {
        season: 38,
        percentile: (1 - 11.75/18) * 100,
        percentage: 22.22
    }, {
        season: 39,
        percentile: 45,
        percentage: 35
    }, {
        season: 40,
        percentile: (1 - 13.4/20) * 100,
        percentage: 25,
    }, {
        season: 41,
        percentile: 53.33,
        percentage: 55
    }, {
        season: 42,
        percentile: 53.72,
        percentage: 55
    }, {
        season: 43,
        percentile: 43.88,
        percentage: 55
    },]


var margin = {
    top: 20,
    right: 20,
    bottom: 80,
    left: 55
}

var div = d3.select("#scatter").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

//making graph responsive
default_width = 700 - margin.left - margin.right;
default_height = 700 - margin.top - margin.bottom;
default_ratio = default_width / default_height;

// Determine current size, which determines vars
function set_size() {
    current_width = window.innerWidth;
    current_height = window.innerHeight;
    current_ratio = current_width / current_height;
    // desktop
    if (current_ratio > default_ratio) {
        h = default_height;
        w = default_width;
        // mobile
    } else {
        margin.left = 40
        w = current_width - 40;
        h = w / default_ratio;
    }
    // Set new width and height based on graph dimensions
    width = w - 50 - margin.right;
    height = h - margin.top - margin.bottom;
};
set_size();
//end responsive graph code


// format the data
data.forEach(function (d) {
    parseDate = d3.timeParse("%Y");
    d.season = +d.season;
    d.percentile = +d.percentile;
    d.percentage = +d.percentage;
});
//sort the data by season so the trend line makes sense
data.sort(function (a, b) {
    return a.season - b.season;
});

// set the ranges
var x = d3.scaleLinear().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

// Scale the range of the data
x.domain(d3.extent(data, function (d) {
    return d.percentage;
}));
y.domain([0, d3.max(data, function (d) {
    return d.percentile;
})]);



// append the svg object to the body of the page
var svg = d3.select("#scatter").append("svg")
    .attr("width", width + margin.left + margin.right + 50)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");


// Add the data points
// Add the data points

var path = svg.selectAll("dot")
    .data(data)
    .enter().append("circle")
    .attr("r", 10)
    .attr("cx", function (d) {
        return x(d.percentage);
    })
    .attr("cy", function (d) {
        return y(d.percentile);
    })
    .attr("stroke", "#3182ce")
    .attr("stroke-width", 1.5)
    .attr("opacity", 0.75)
    .attr("fill", function(d,i) {
        if(i % 2 == 0) {
            return "#40a9ff";
        }
        else {
            return "#4dabf7";
        }
    })
    .on('mouseover', function (d, i) {
        d3.select(this).transition()
            .duration('100')
            .attr("r", 12);
        div.transition()
            .duration(100)
            .style("opacity", 1);
        div.html("Season " + d.season + "<br>Percentile of Average Minority Success: " + d.percentile.toFixed(2) + "%")
            .style("left", (d3.event.pageX + 10) + "px")
            .style("top", (d3.event.pageY - 15) + "px")
    })
    .on('mouseout', function (d, i) {
        d3.select(this).transition()
            .duration('200')
            .attr("r", 10);
        div.transition()
            .duration('200')
            .style("opacity", 0);
    });


var text = svg.selectAll("text")
    .data(data)
    .enter().append("text")
    .attr("x", function (d) {
        return x(d.percentage);
    })
    .attr("y", function (d) {
        return y(d.percentile);
    })
    .text(function (d) {
        return d.season;
    })
    .attr("font-size", 10)
    .attr("fill", "#ffffff")
    .attr("text-anchor", "middle")
    .attr("alignment-baseline", "middle")
    .on('mouseover', function (d, i) {
        d3.select(this).transition()
            .duration('100')
            .attr("font-size", 12);
        div.transition()
            .duration(100)
            .style("opacity", 1);
            div.html("Season " + d.season + "<br>Percentile of Average Minority Success: " + d.percentile.toFixed(2) + "%")
            .style("left", (d3.event.pageX + 10) + "px")
            .style("top", (d3.event.pageY - 15) + "px")

    }
    )


svg.append("line")
    .attr("x1", 0)
    .attr("y1", y(50))
    .attr("x2", width)
    .attr("y2", y(50))
    .attr("stroke-dasharray", "5,5")
    .attr("stroke", "orange")
    .attr("stroke-width", 1);


// Add the axis
if (width < 500) {
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).ticks(5));
} else {
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickFormat(function(d) {return (d) + "%";}));
}

svg.append("g")
    .call(d3.axisLeft(y).tickFormat(function(d) {return (d) + "%";}));


// add x axis label
svg.append("text")
    .attr("transform",
        "translate(" + (width/2) + " ," +
        (height + margin.top + 20) + ")")
    .style("text-anchor", "middle")
    .text("Percentage of POC Cast");

// add y axis label
svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left - 2)
    .attr("x",0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Percentile of Average Minority Success");


d3.select('#season').on('change', function(d) {
    season = d3.select(this).property('value');

    svg.selectAll('circle')
        .attr('opacity', 0);

    svg.selectAll('circle')
        .filter(function(d) {
            return d.season >= season;
        })
        .attr('opacity', 0.75);

    svg.selectAll('text')
        .filter(function(d) {
            return d.season < season;
        })
        .attr('opacity', 1);

    svg.selectAll('text')
        .filter(function(d) {
            return d.season >= season;
        })
        .attr('opacity', 1);


});

d3.select('#reset').on('click', function() {
    svg.selectAll('circle')
        .attr('opacity', 0.75);

});