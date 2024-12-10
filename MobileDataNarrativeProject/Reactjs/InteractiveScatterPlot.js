document.addEventListener("DOMContentLoaded", function () {
    // Set the dimensions and margins of the graph
    const margin = { top: 10, right: 100, bottom: 30, left: 30 },
          width = 460 - margin.left - margin.right,
          height = 400 - margin.top - margin.bottom;
  
    // Append the SVG object to the body of the page
    const svg = d3.select("#my_dataviz")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
  
    // Inline dataset
    const PrecureQuarterDataSet = [
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
  
    // List of groups
    const allGroup = ["QuaterFourData", "QuarterOneData", "QuarterTwoData"];
  
    // Reformat the data
    const dataReady = allGroup.map(grpName => ({
      name: grpName,
      values: data.map(d => ({ Name: d.Name, Quarter: d[grpName] }))
    }));
  
    // Color scale
    const myColor = d3.scaleOrdinal()
      .domain(allGroup)
      .range(d3.schemeSet2);
  
    // Add X axis
    const x = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.Name)])
      .range([0, width]);
    svg.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(d3.axisBottom(x));
  
    // Add Y axis
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => Math.max(d.QuarterFourData, d.QuarterOneData, d.QuarterTwoData))])
      .range([height, 0]);
    svg.append("g")
      .call(d3.axisLeft(y));
  
    // Add the lines
    const line = d3.line()
      .x(d => x(d.Name))
      .y(d => y(d.Quarter));
    svg.selectAll("myLines")
      .data(dataReady)
      .join("path")
      .attr("class", d => d.name)
      .attr("d", d => line(d.values))
      .attr("stroke", d => myColor(d.name))
      .style("stroke-width", 4)
      .style("fill", "none");
  
    // Add the points
    svg.selectAll("myDots")
      .data(dataReady)
      .join('g')
      .style("fill", d => myColor(d.name))
      .attr("class", d => d.name)
      .selectAll("myPoints")
      .data(d => d.values)
      .join("circle")
      .attr("cx", d => x(d.Name))
      .attr("cy", d => y(d.Quater))
      .attr("r", 5)
      .attr("stroke", "white");
  
    // Add a label at the end of each line
    svg.selectAll("myLabels")
      .data(dataReady)
      .join('g')
      .append("text")
      .attr("class", d => d.name)
      .datum(d => ({ name: d.name, Quarter: d.values[d.values.length - 1] }))
      .attr("transform", d => `translate(${x(d.Quarter.Name)},${y(d.Quarter.Quarter)})`)
      .attr("x", 12)
      .text(d => d.name)
      .style("fill", d => myColor(d.name))
      .style("font-size", 15);
  
    // Add a legend (interactive)
    svg.selectAll("myLegend")
      .data(dataReady)
      .join('g')
      .append("text")
      .attr('x', (d, i) => 30 + i * 60)
      .attr('y', 30)
      .text(d => d.name)
      .style("fill", d => myColor(d.name))
      .style("font-size", 15)
      .on("click", function(event, d) {
        const currentOpacity = d3.selectAll("." + d.name).style("opacity");
        d3.selectAll("." + d.name).transition().style("opacity", currentOpacity == 1 ? 0 : 1);
      });
  });
  