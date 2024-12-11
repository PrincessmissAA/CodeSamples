document.addEventListener("DOMContentLoaded", function () {
    const margin = { top: 30, right: 140, bottom: 120, left: 80 },
        width = 760 - margin.left - margin.right,
        height = 700 - margin.top - margin.bottom;

    d3.select("#my_dataviz_Interactive").selectAll("*").remove();

    const svg = d3.select("#my_dataviz_Interactive")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

        const PrecureQuarterDataSet = [
            { Name: "Futari Wa Precure Splash Star", QuarterFourData: 12.3, CompanyProfit: 168079 },
            { Name: "Yes! Precure 5", QuarterFourData: 6, CompanyProfit: 164072  },
            { Name: "Yes! Precure 5 Gogo!", QuarterFourData: 10.5, CompanyProfit: 146023  },
            { Name: "Fresh Precure", QuarterFourData: 10.5, CompanyProfit: 128753  },
            { Name: "Heartcatch Precure", QuarterFourData: 11.9, CompanyProfit: 139414  },
            { Name: "Suite Precure", QuarterFourData: 12.5, CompanyProfit: 167502  },
            { Name: "Smile Precure", QuarterFourData: 10.7, CompanyProfit: 183078  },
            { Name: "DokiDoki Precure", QuarterFourData: 10.6, CompanyProfit: 190829  },
            { Name: "Happiness Charge Precure", QuarterFourData: 9.8, CompanyProfit: 213112  },
            { Name: "Go! Princess Precure", QuarterFourData: 6.5, CompanyProfit: 202600  },
            { Name: "Maho Tsukai Precure", QuarterFourData: 6.6, CompanyProfit: 223759  },
            { Name: "Kirakira Precure A la Mode", QuarterFourData: 7.5, CompanyProfit: 241582  },
            { Name: "Hugtto Precure", QuarterFourData: 8.1, CompanyProfit: 262555  },
            { Name: "Star Twinkle Precure", QuarterFourData: 10.1, CompanyProfit: 260948  },
            { Name: "Healin' Good Precure", QuarterFourData: 8.3, CompanyProfit: 282006  },
            { Name: "Tropical Rouge Precure", QuarterFourData: 6.6, CompanyProfit: 356266  },
            { Name: "Delicious Party Precure", QuarterFourData: 5.7, CompanyProfit: 368656  },
            { Name: "Hero Girl Sky Precure", QuarterFourData: 5.6, CompanyProfit: 370959  },
          ];

    // X axis
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

    // Y axis for CompanyProfit
    const y1 = d3.scaleLinear()
        .domain([0, d3.max(PrecureQuarterDataSet, d => d.CompanyProfit)])
        .range([height, 0]);

    svg.append("g").call(d3.axisLeft(y1));

    const y2 = d3.scaleLinear()
        .domain([0, d3.max(PrecureQuarterDataSet, d => d.QuarterFourData)])
        .range([height, 0]);

    svg.append("g")
        .attr("transform", `translate(${width}, 0)`)
        .call(d3.axisRight(y2));

    // Tooltip setup
    const tooltip = d3.select("body").append("div")
        .attr("id", "tooltip")
        .style("position", "absolute")
        .style("visibility", "hidden")
        .style("background-color", "rgba(0, 0, 0, 0.7)")
        .style("color", "#fff")
        .style("padding", "8px")
        .style("border-radius", "5px")
        .style("font-size", "12px")
        .style("pointer-events", "none");

    // Lollipop Graph for CompanyProfit
    svg.selectAll("line.lollipop")
        .data(PrecureQuarterDataSet)
        .join("line")
        .attr("class", "lollipop")
        .attr("x1", d => x(d.Name))
        .attr("x2", d => x(d.Name))
        .attr("y1", height)
        .attr("y2", d => y1(d.CompanyProfit))
        .attr("stroke", "#69b3a2")
        .attr("stroke-width", 2);

    svg.selectAll("circle.lollipop")
        .data(PrecureQuarterDataSet)
        .join("circle")
        .attr("class", "lollipop")
        .attr("cx", d => x(d.Name))
        .attr("cy", d => y1(d.CompanyProfit))
        .attr("r", 5)
        .attr("fill", "#69b3a2")
        .on("mouseover", function (event, d) {
            d3.select(this)
                .attr("r", 20) 
                .attr("stroke", "gold")
                .attr("stroke-width", 2)
                .classed("shimmer", true);
            tooltip.style("visibility", "visible")
                .text(`Company Profit: ${d.CompanyProfit} Million`);
        })
        .on("mousemove", function (event) {
            tooltip.style("top", `${event.pageY - 10}px`)
                .style("left", `${event.pageX + 10}px`);
        })
        .on("mouseout", function () {
            d3.select(this)
                .attr("r", 5) // Reset radius
                .attr("stroke", "none")
                .classed("shimmer", false);
            tooltip.style("visibility", "hidden");
        });

        const line = d3.line()
        .x(d => x(d.Name))
        .y(d => y2(d.QuarterFourData));

    svg.append("path")
        .datum(PrecureQuarterDataSet)
        .attr("fill", "none")
        .attr("stroke", "#ff4b5c")
        .attr("stroke-width", 2)
        .attr("d", line);

    svg.selectAll("circle.scatter")
        .data(PrecureQuarterDataSet)
        .join("circle")
        .attr("class", "scatter")
        .attr("cx", d => x(d.Name))
        .attr("cy", d => y2(d.QuarterFourData))
        .attr("r", 5)
        .attr("fill", "#ff4b5c")
        .on("mouseover", function (event, d) {
            d3.select(this)
                .attr("r", 20) // Increase radius
                .attr("stroke", "gold") // Add a stroke
                .attr("stroke-width", 2)
                .classed("shimmer", true);
            tooltip.style("visibility", "visible")
                .text(`QuarterFourData: ${d.QuarterFourData} Million`);
        })
        .on("mousemove", function (event) {
            tooltip.style("top", `${event.pageY - 10}px`)
                .style("left", `${event.pageX + 10}px`);
        })
        .on("mouseout", function () {
            d3.select(this)
                .attr("r", 5) // Reset radius
                .attr("stroke", "none")
                .classed("shimmer", false);
            tooltip.style("visibility", "hidden");
        });
});
