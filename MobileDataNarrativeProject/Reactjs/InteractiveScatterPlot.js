const margin = { top: 30, right: 140, bottom: 120, left: 80 },
    width = 760 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

// Append the SVG object to the #my_dataviz container

document.addEventListener("DOMContentLoaded", function () {
  d3.select("#my_dataviz_Interactive").selectAll("*").remove();
  const svg = d3.select("#my_dataviz_Interactive")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
      console.log(svg.node());
  
    // Inline dataset
    const PrecureQuarterDataSet = [
        { Name: "Futari Wa Precure Splash Star", QuarterFourData: 12.3, QuarterOneData: 1.8, QuarterTwoData: 3.3, QuarterThreeData: 4.3 },
        { Name: "Yes! Precure 5", QuarterFourData: 6, QuarterOneData: 1.7, QuarterTwoData: 5.1, QuarterThreeData: 7.9  },
        { Name: "Yes! Precure 5 Gogo!", QuarterFourData: 10.5, QuarterOneData: 2.8, QuarterTwoData: 5.5, QuarterThreeData: 7.5  },
        { Name: "Fresh Precure", QuarterFourData: 10.5, QuarterOneData: 2.3, QuarterTwoData: 5.7, QuarterThreeData: 8.5  },
        { Name: "Heartcatch Precure", QuarterFourData: 11.9, QuarterOneData: 3.2, QuarterTwoData: 6.8, QuarterThreeData: 9.6  },
        { Name: "Suite Precure", QuarterFourData: 12.5, QuarterOneData: 2.6, QuarterTwoData: 5.2, QuarterThreeData: 7.4  },
        { Name: "Smile Precure", QuarterFourData: 10.7, QuarterOneData: 2.8, QuarterTwoData: 5.7, QuarterThreeData: 7.5  },
        { Name: "DokiDoki Precure", QuarterFourData: 10.6, QuarterOneData: 2.4, QuarterTwoData: 4.9, QuarterThreeData: 6.5  },
        { Name: "Happiness Charge Precure", QuarterFourData: 9.8, QuarterOneData: 1.9, QuarterTwoData: 3.6, QuarterThreeData: 4.5  },
        { Name: "Go! Princess Precure", QuarterFourData: 6.5, QuarterOneData: 1.6, QuarterTwoData: 3.4, QuarterThreeData: 4.4  },
        { Name: "Maho Tsukai Precure", QuarterFourData: 6.6, QuarterOneData: 1.6, QuarterTwoData: 3.6, QuarterThreeData: 4.9  },
        { Name: "Kirakira Precure A la Mode", QuarterFourData: 7.5, QuarterOneData: 1.8, QuarterTwoData: 3.8, QuarterThreeData: 5.4  },
        { Name: "Hugtto Precure", QuarterFourData: 8.1, QuarterOneData: 2.5, QuarterTwoData: 5.1, QuarterThreeData: 7.1  },
        { Name: "Star Twinkle Precure", QuarterFourData: 10.1, QuarterOneData: 2.3, QuarterTwoData: 4.5, QuarterThreeData: 5.8  },
        { Name: "Healin' Good Precure", QuarterFourData: 8.3, QuarterOneData: 1.8, QuarterTwoData: 3.3, QuarterThreeData: 4.4  },
        { Name: "Tropical Rouge Precure", QuarterFourData: 6.6, QuarterOneData: 1.6, QuarterTwoData: 3, QuarterThreeData: 3.7  },
        { Name: "Delicious Party Precure", QuarterFourData: 5.7, QuarterOneData: 1.3, QuarterTwoData: 2.9, QuarterThreeData: 3.5  },
        { Name: "Hero Girl Sky Precure", QuarterFourData: 5.6, QuarterOneData: 1.2, QuarterTwoData: 2.8, QuarterThreeData: 4.3  },
      ];
  
    // List of groups
    const allGroup = ["QuarterOneData", "QuarterTwoData", "QuarterThreeData", "QuarterFourData"];

  // Reformat the data
  const dataReady = allGroup.map(grpName => ({
    name: grpName,
    values: PrecureQuarterDataSet.map(d => ({ Name: d.Name, value: d[grpName] }))
  }));

  // Color scale
  const myColor = d3.scaleOrdinal()
      .domain(allGroup)
      .range(d3.schemeSet2);

  // Add X axis
  const x = d3.scalePoint()
      .domain(PrecureQuarterDataSet.map(d => d.Name))
      .range([0, width])
      .padding(0.5);

  svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "rotate(-45)")
      .style("text-anchor", "end");

  // Add Y axis
  const y = d3.scaleLinear()
      .domain([0, d3.max(PrecureQuarterDataSet, d => Math.max(d.QuarterOneData, d.QuarterTwoData, d.QuarterThreeData, d.QuarterFourData))])
      .range([height, 0]);

  svg.append("g").call(d3.axisLeft(y));

  // Add the lines
  const line = d3.line()
      .x(d => x(d.Name))
      .y(d => y(d.value));

  svg.selectAll("myLines")
      .data(dataReady)
      .join("path")
      .attr("class", d => d.name)
      .attr("d", d => line(d.values))
      .attr("stroke", d => myColor(d.name))
      .style("stroke-width", 2)
      .style("fill", "none");

  // Add points
  svg.selectAll("myDots")
      .data(dataReady)
      .join('g')
      .style("fill", d => myColor(d.name))
      .selectAll("circle")
      .data(d => d.values)
      .join("circle")
      .attr("cx", d => x(d.Name))
      .attr("cy", d => y(d.value))
      .attr("r", 5)
      .attr("stroke", "white");

  // Add a legend
const legend = svg.append("g")
.attr("transform", `translate(${width + 20}, ${margin.top})`); // Position to the right of the chart

// Add legend items
legend.selectAll("myLegend")
.data(dataReady)
.join('g')
.attr("transform", (d, i) => `translate(0, ${i * 20})`) // Space out legend items vertically
.call(g => {
    g.append("circle")
        .attr("cx", 0)
        .attr("cy", 0)
        .attr("r", 6)
        .style("fill", d => myColor(d.name));
    g.append("text")
        .attr("x", 10)
        .attr("y", 0)
        .attr("dy", "0.35em")
        .style("font-size", "12px")
        .text(d => d.name)
        .style("fill", d => myColor(d.name));
});

// Add the lines
svg.selectAll("myLines")
    .data(dataReady)
    .join("path")
    .attr("class", d => d.name)
    .attr("d", d => line(d.values))
    .attr("stroke", d => myColor(d.name))
    .style("stroke-width", 2)
    .style("fill", "none")
    .on("mouseover", function (event, d) {
        // Highlight the hovered line
        d3.select(this)
            .style("stroke-width", 4)
            .style("opacity", 1);

        // Add tooltip text
        const tooltip = svg.append("text")
            .attr("id", "hover-text")
            .attr("x", event.layerX - margin.left)
            .attr("y", margin.top)
            .style("font-size", "14px")
            .style("font-weight", "bold")
            .attr("text-anchor", "middle")
            .text(d.name)
            .attr("background-color", "lightgray")
            .attr("padding", "5px")
            .attr("border-radius", "5px");

    })
    .on("mouseout", function (event, d) {
        // Revert line style
        d3.select(this)
            .style("stroke-width", 2)
            .style("opacity", 0.8);

        // Remove tooltip text
        svg.select("#hover-text").remove();
    });

});
  