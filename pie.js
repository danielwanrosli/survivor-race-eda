var group1 = [{
    title: "White",
    value: 8
},
    {
        title: "African American",
        value: 1
    },
    {
        title: "Hispanic/Latino",
        value: 1
    },
    {
        title: "Asian",
        value: 0
    }
];

var group2 = [{
    title: "White",
    value: 7
},
    {
        title: "African American",
        value: 1
    },
    {
        title: "Hispanic/Latino",
        value: 1
    },
    {
        title: "Asian",
        value: 1
    }
];

//35-44
var group3 = [{
    title: "White",
    value: 9
},
    {
        title: "African American",
        value: 0
    },
    {
        title: "Hispanic/Latino",
        value: 0
    },
    {
        title: "Asian",
        value: 1
    }
];
//45-55
var group4 = [{
    title: "White",
    value: 7
},
    {
        title: "African American",
        value: 2
    },
    {
        title: "Hispanic/Latino",
        value: 1
    },
    {
        title: "Asian",
        value: 0
    }
];
//55+
var group5 = [{
    title: "White",
    value: 1
},
    {
        title: "African American",
        value: 1
    },
    {
        title: "Hispanic/Latino",
        value: 0
    },
    {
        title: "Asian",
        value: 1
    }
];

var width = 300,
    height = 300,
    radius = Math.min(width, height) / 2;

var color = d3.scaleOrdinal()
    .range(["#40E0D0", "#FF7F50", "#E6E6FA", "#98FF98", "#C2D5EB"]);

var pie = d3.pie()
    .value(function (d) {
        return d.value;
    })(group1);

var arc = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

var svg = d3.select("#pie")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var g = svg.selectAll("arc")
    .data(pie)
    .enter().append("g")
    .attr("class", "arc")
    .on('mouseover', function (d, i) {
        d3.select(this).transition()
            .duration('50')
            .attr('opacity', '.95');
    })
    .on('mouseout', function (d, i) {
        d3.select(this).transition()
            .duration('50')
            .attr('opacity', '1');
    })
    .attr('transform', 'translate(0, 0)');

g.append("path")
    .attr("d", arc)
    .style("fill", function (d) {
        return color(d.data.title);
    });


function changeData(data) {
    var pie = d3.pie()
        .value(function (d) {
            return d.value;
        })(data);

    path = d3.select("#pie")
        .selectAll("path")
        .data(pie); // Compute the new angles
    path.transition().duration(500).attr("d", arc); // redrawing the path with a smooth transition
}

d3.select("button#group1")
    .on("click", function () {
        changeData(group1);
    })
d3.select("button#group2")
    .on("click", function () {
        changeData(group2);
    })
d3.select("button#group3")
    .on("click", function () {
        changeData(group3)
    })
d3.select("button#group4")
    .on("click", function () {
        changeData(group4)
    })
d3.select("button#group5")
    .on("click", function () {
        changeData(group5)
    })