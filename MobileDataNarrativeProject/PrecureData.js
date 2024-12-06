//Read the data
d3.csv"https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/connectedscatter.csv",

  // When reading the csv, I must format variables:
  d => {
      return {date : d3.timeParse("%Y-%m-%d")(d.date), value : d.value}}).then(

  // Now I can use this dataset:

  PrecureDataSet  [
    {2006, "Futari Wa Precure Splash Star", 12.3, 1.8, 3.3, 4.3}
    {2007, "Yes! Precure 5", 6, 1.7, 5.1, 7.9}
    {2008, "Yes! Precure 5 Gogo!", 10.5, 2.8, 5.5, 7.5}
    {2009, "Fresh Precure", 10.5, 2.3, 5.7, 8.5}
    {2010, "Heartcatch Precure", 11.9, 3.2, 6.8, 9.6}
    {2011, "Suite Precure", 12.5, 2.6, 5.2, 7.4}
    {2012, "Smile Precure", 10.7, 2.8, 5.7, 7.5}
    {2013, "DokiDoki Precure", 10.6, 2.4, 4.9, 6.5}
    {2014, "Happiness Charge Precure", 9.8, 1.9, 3.6, 4.5}
    {2015, "Go! Princess Precure", 6.5, 1.6, 3.4, 4.4}
    {2016, "Maho Tsukai Precure", 6.6, 1.6, 3.6, 4.9}
    {2017, "Kirakira Precue A la Mode", 7.5, 1.8, 3.8, 5.4}
    {2018, "Hugtto Precure", 8.1, 2.5, 5.1, 7.1}
    {2019, "Star Twinkle Precure", 10.1, 2.3, 4.5, 5.8}
    {2020, "Healin' Good Precure", 8.3, 1.8, 3.3, 4.4}
    {2021, "Tropical Rouge Precure", 6.6, 1.6, 3, 3.7}
    {2022, "Delicous Party Precure", 5.7, 1.3, 2.9, 3.5}
    {2023, "Hero Girl Sky Precure", 5.6,1.2, 2.8, 4.3}
  ]





  <script>

// Set the dimensions and margins of the graph
const margin = {{top: 10, right: 30, bottom: 30, left: 60}},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// Append the svg object to the body of the page
const svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Data
const PrecureQuarterFourDataSet = [
  {{ Name: "Futari Wa Precure Splash Star", QuarterFourData: 12.3 }},
  {{ Name: "Yes! Precure 5", QuarterFourData: 6 }},
  {{ Name: "Yes! Precure 5 Gogo!", QuarterFourData: 10.5 }},
  {{ Name: "Fresh Precure", QuarterFourData: 10.5 }},
  {{ Name: "Heartcatch Precure", QuarterFourData: 11.9 }},
  {{ Name: "Suite Precure", QuarterFourData: 12.5 }},
  {{ Name: "Smile Precure", QuarterFourData: 10.7 }},
  {{ Name: "DokiDoki Precure", QuarterFourData: 10.6 }},
  {{ Name: "Happiness Charge Precure", QuarterFourData: 9.8 }},
  {{ Name: "Go! Princess Precure", QuarterFourData: 6.5 }},
  {{ Name: "Maho Tsukai Precure", QuarterFourData: 6.6 }},
  {{ Name: "Kirakira Precure A la Mode", QuarterFourData: 7.5 }},
  {{ Name: "Hugtto Precure", QuarterFourData: 8.1 }},
  {{ Name: "Star Twinkle Precure", QuarterFourData: 10.1 }},
  {{ Name: "Healin' Good Precure", QuarterFourData: 8.3 }},
  {{ Name: "Tropical Rouge Precure", QuarterFourData: 6.6 }},
  {{ Name: "Delicious Party Precure", QuarterFourData: 5.7 }},
  {{ Name: "Hero Girl Sky Precure", QuarterFourData: 5.6 }},
];

// Add X axis
const x = d3.scalePoint()
  .domain(PrecureQuarterFourDataSet.map({d => d.Name}))
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
  .domain({[0, d3.max(PrecureQuarterFourDataSet, d => d.QuarterFourData)]})
  .range([height, 0]);
svg.append("g")
  .call(d3.axisLeft(y));

// Add the line
svg.append("path")
  .datum(PrecureQuarterFourDataSet)
  .attr("fill", "none")
  .attr("stroke", "black")
  .attr("stroke-width", 1.5)
  .attr("d", d3.line()
    .curve(d3.curveBasis)
    .x({d => x(d.Name)})
    .y({d => y(d.QuarterFourData)})
  );

// Create a tooltip
const Tooltip = d3.select("#my_dataviz")
  .append("div")
  .style("opacity", 0)
  .attr("class", "tooltip")
  .style("background-color", "white")
  .style("border", "solid")
  .style("border-width", "2px")
  .style("border-radius", "5px")
  .style("padding", "5px");

// Tooltip events
const mouseover = function(event, d) {
  Tooltip.style("opacity", 1)
};
const mousemove = function(event, d) {
  Tooltip
    .html("Exact value: " + d.QuarterFourData)
    .style("left", `${event.pageX + 10}px`)
    .style("top", `${event.pageY}px`)
};
const mouseleave = function(event, d) {
  Tooltip.style("opacity", 0)
};

// Add the points
svg
  .append("g")
  .selectAll("dot")
  .data(PrecureQuarterFourDataSet)
  .join("circle")
  .attr("class", "myCircle")
  .attr{("cx", d => x(d.Name))}
  .attr{("cy", d => y(d.QuarterFourData))}
  .attr("r", 8)
  .attr("stroke", "#69b3a2")
  .attr("stroke-width", 3)
  .attr("fill", "white")
  .on("mouseover", mouseover)
  .on("mousemove", mousemove)
  .on("mouseleave", mouseleave);

</script>
