(function () {
    const margin = { top: 10, right: 30, bottom: 120, left: 80 },
        width = 760 - margin.left - margin.right,
        height = 700 - margin.top - margin.bottom;

    // Append the SVG object to the #my_dataviz container
    document.addEventListener("DOMContentLoaded", function () {
        d3.select("#my_dataviz_DropDown").selectAll("*").remove();
        const svg = d3.select("#my_dataviz_DropDown")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

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

        // Add the options to the dropdown
        d3.select("#selectButtonDropdown")
            .selectAll('option')
            .data(allGroup)
            .enter()
            .append('option')
            .text(d => d)
            .attr("value", d => d);

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

        // Initialize line with the first group
        let line = svg.append("path")
            .datum(PrecureQuarterDataSet)
            .attr("fill", "none")
            .attr("stroke", "black")
            .attr("stroke-width", 1.5)
            .attr("d", d3.line()
                .x(d => x(d.Name))
                .y(d => y(d.QuarterOneData))
            );

        // Initialize dots
        let dot = svg.selectAll("circle")
            .data(PrecureQuarterDataSet)
            .enter()
            .append("circle")
            .attr("cx", d => x(d.Name))
            .attr("cy", d => y(d.QuarterOneData))
            .attr("r", 5)
            .style("fill", "#69b3a2");

        // Update function
        function update(selectedGroup) {
            const dataFilter = PrecureQuarterDataSet.map(d => ({ Name: d.Name, value: d[selectedGroup] }));

            line.datum(dataFilter)
                .transition()
                .duration(1000)
                .attr("d", d3.line()
                    .x(d => x(d.Name))
                    .y(d => y(d.value))
                );

            dot.data(dataFilter)
                .transition()
                .duration(1000)
                .attr("cy", d => y(d.value));
        }

        // Event listener for dropdown
        d3.select("#selectButtonDropdown").on("change", function () {
            const selectedOption = d3.select(this).property("value");
            update(selectedOption);
        });
    });
})();
