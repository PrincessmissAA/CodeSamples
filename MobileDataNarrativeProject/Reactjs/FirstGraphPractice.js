// Set the dimensions and margins of the graph
const margin = { top: 10, right: 30, bottom: 120, left: 80 },
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// Append the SVG object to the #my_dataviz container

document.addEventListener("DOMContentLoaded", function () {
  d3.select("#my_dataviz").selectAll("*").remove();
  const svg = d3.select("#my_dataviz")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
      console.log(svg.node());

console.log("SVG and circle created.");

  console.log("Target div:", d3.select("#my_dataviz"));


// Dataset
const PrecureQuarterFourDataSet = [
  { Name: "Futari Wa Precure Splash Star", QuarterFourData: 12.3, QuarterOneData: 0, QuarterTwoData: 0, QuarterThreeData: 0 },
  { Name: "Yes! Precure 5", QuarterFourData: 6, QuarterOneData: 0, QuarterTwoData: 0, QuarterThreeData: 0  },
  { Name: "Yes! Precure 5 Gogo!", QuarterFourData: 10.5, QuarterOneData: 0, QuarterTwoData: 0, QuarterThreeData: 0  },
  { Name: "Fresh Precure", QuarterFourData: 10.5, QuarterOneData: 0, QuarterTwoData: 0, QuarterThreeData: 0  },
  { Name: "Heartcatch Precure", QuarterFourData: 11.9, QuarterOneData: 0, QuarterTwoData: 0, QuarterThreeData: 0  },
  { Name: "Suite Precure", QuarterFourData: 12.5, QuarterOneData: 0, QuarterTwoData: 0, QuarterThreeData: 0  },
  { Name: "Smile Precure", QuarterFourData: 10.7, QuarterOneData: 0, QuarterTwoData: 0, QuarterThreeData: 0  },
  { Name: "DokiDoki Precure", QuarterFourData: 10.6, QuarterOneData: 0, QuarterTwoData: 0, QuarterThreeData: 0  },
  { Name: "Happiness Charge Precure", QuarterFourData: 9.8, QuarterOneData: 0, QuarterTwoData: 0, QuarterThreeData: 0  },
  { Name: "Go! Princess Precure", QuarterFourData: 6.5, QuarterOneData: 0, QuarterTwoData: 0, QuarterThreeData: 0  },
  { Name: "Maho Tsukai Precure", QuarterFourData: 6.6, QuarterOneData: 0, QuarterTwoData: 0, QuarterThreeData: 0  },
  { Name: "Kirakira Precure A la Mode", QuarterFourData: 7.5, QuarterOneData: 0, QuarterTwoData: 0, QuarterThreeData: 0  },
  { Name: "Hugtto Precure", QuarterFourData: 8.1, QuarterOneData: 0, QuarterTwoData: 0, QuarterThreeData: 0  },
  { Name: "Star Twinkle Precure", QuarterFourData: 10.1, QuarterOneData: 0, QuarterTwoData: 0, QuarterThreeData: 0  },
  { Name: "Healin' Good Precure", QuarterFourData: 8.3, QuarterOneData: 0, QuarterTwoData: 0, QuarterThreeData: 0  },
  { Name: "Tropical Rouge Precure", QuarterFourData: 6.6, QuarterOneData: 0, QuarterTwoData: 0, QuarterThreeData: 0  },
  { Name: "Delicious Party Precure", QuarterFourData: 5.7, QuarterOneData: 0, QuarterTwoData: 0, QuarterThreeData: 0  },
  { Name: "Hero Girl Sky Precure", QuarterFourData: 5.6, QuarterOneData: 0, QuarterTwoData: 0, QuarterThreeData: 0  },
];

// X axis
const x = d3.scalePoint()
.domain(PrecureQuarterFourDataSet.map(d => d.Name))
.range([0, width])
.padding(0.5);

svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x))
    .selectAll("text")
    .attr("transform", "rotate(-45)")
    .style("text-anchor", "end")
    .style("font-size", "10px"); 


// Y axis
const y = d3.scaleLinear()
.domain([0, d3.max(PrecureQuarterFourDataSet, d => d.QuarterFourData)])
.range([height, 0]);

svg.append("g").call(d3.axisLeft(y));

// Add line
svg.append("path")
.datum(PrecureQuarterFourDataSet)
.attr("fill", "none")
.attr("stroke", "black")
.attr("stroke-width", 1.5)
.attr(
  "d",
  d3
    .line()
    .curve(d3.curveBasis)
    .x(d => x(d.Name))
    .y(d => y(d.QuarterFourData))
);

// Add points
svg
.append("g")
.selectAll("circle")
.data(PrecureQuarterFourDataSet)
.join("circle")
.attr("cx", d => x(d.Name))
.attr("cy", d => y(d.QuarterFourData))
.attr("r", 5)
.attr("fill", "blue");
});