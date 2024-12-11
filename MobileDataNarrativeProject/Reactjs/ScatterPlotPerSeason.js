(function () {
    const margin = { top: 10, right: 30, bottom: 120, left: 80 },
        width = 760 - margin.left - margin.right,
        height = 700 - margin.top - margin.bottom;

    document.addEventListener("DOMContentLoaded", function () {
        d3.select("#my_dataviz_Season").selectAll("*").remove();

        const svg = d3.select("#my_dataviz_Season")
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

        // List of seasons for the dropdown
        const allGroup = PrecureQuarterDataSet.map(d => d.Name);

        // Populate the dropdown
        d3.select("#selectButtonDropdownSeason")
            .selectAll("option")
            .data(allGroup)
            .enter()
            .append("option")
            .text(d => d)
            .attr("value", d => d);

        // X axis: quarters
        const x = d3.scalePoint()
            .domain(["Q1", "Q2", "Q3", "Q4"])
            .range([0, width])
            .padding(0.5);

        svg.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(d3.axisBottom(x));

        // Y axis: values
        const y = d3.scaleLinear()
            .domain([0, d3.max(PrecureQuarterDataSet, d => Math.max(d.QuarterOneData, d.QuarterTwoData, d.QuarterThreeData, d.QuarterFourData))])
            .range([height, 0]);

        svg.append("g").call(d3.axisLeft(y));

        // Add line
        const line = svg.append("path")
            .attr("fill", "none")
            .attr("stroke", "black")
            .attr("stroke-width", 1.5);

        // Update function to filter and display data
        function update(selectedSeason) {
            const seasonData = PrecureQuarterDataSet.find(d => d.Name === selectedSeason);
            const data = [
                { quarter: "Q1", value: seasonData.QuarterOneData },
                { quarter: "Q2", value: seasonData.QuarterTwoData },
                { quarter: "Q3", value: seasonData.QuarterThreeData },
                { quarter: "Q4", value: seasonData.QuarterFourData },
            ];

            // Update line
            line.datum(data)
                .transition()
                .duration(1000)
                .attr("d", d3.line()
                    .x(d => x(d.quarter))
                    .y(d => y(d.value))
                );

            // Update dots
            const dotsUpdate = svg.selectAll("circle")
                .data(data);

            // Enter new dots
            dotsUpdate.enter()
                .append("circle")
                .merge(dotsUpdate) // Merge new and existing elements
                .transition()
                .duration(1000)
                .attr("cx", d => x(d.quarter))
                .attr("cy", d => y(d.value))
                .attr("r", 5)
                .style("fill", "#69b3a2");

            // Remove old dots
            dotsUpdate.exit().remove();
        }

        // Dropdown event listener
        d3.select("#selectButtonDropdownSeason").on("change", function () {
            const selectedOption = d3.select(this).property("value");
            update(selectedOption);
        });

        // Initialize with the first season
        update(allGroup[0]);
    });
})();
