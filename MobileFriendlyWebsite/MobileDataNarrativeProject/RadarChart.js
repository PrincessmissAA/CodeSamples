/////////////////////////////////////////////////////////
/////////////// The Radar Chart Function ////////////////
/////////////// Written by Nadieh Bremer ////////////////
////////////////// VisualCinnamon.com ///////////////////
/////////// Inspired by the code of alangrafu ///////////
/////////////////////////////////////////////////////////

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
	
function RadarChart(id, data, options) {
	var cfg = {
	 w: 600,				//Width of the circle
	 h: 600,				//Height of the circle
	 margin: {top: 20, right: 20, bottom: 20, left: 20}, //The margins of the SVG
	 levels: 3,				//How many levels or inner circles should there be drawn
	 maxValue: 0, 			//What is the value that the biggest circle will represent
	 labelFactor: 1.25, 	//How much farther than the radius of the outer circle should the labels be placed
	 wrapWidth: 60, 		//The number of pixels after which a label needs to be given a new line
	 opacityArea: 0.35, 	//The opacity of the area of the blob
	 dotRadius: 4, 			//The size of the colored circles of each blog
	 opacityCircles: 0.1, 	//The opacity of the circles of each blob
	 strokeWidth: 2, 		//The width of the stroke around each blob
	 roundStrokes: false,	//If true the area and stroke will follow a round path (cardinal-closed)
	 color: d3.scaleOrdinal(d3.schemeCategory10)
	//Color function
	};
	
    d3.select(id).select("svg").remove();

	//Put all of the options into a variable called cfg
	if('undefined' !== typeof options){
	  for(var i in options){
		if('undefined' !== typeof options[i]){ cfg[i] = options[i]; }
	  }//for i
	}//if
	
	//If the supplied maxValue is smaller than the actual one, replace by the max in the data
	var maxValue = Math.max(cfg.maxValue, d3.max(data, function(i){return d3.max(i.map(function(o){return o.value;}))}));
		
	var allAxis = (data[0].map(function(i, j){return i.axis})),	//Names of each axis
		total = allAxis.length,					//The number of different axes
		radius = Math.min(cfg.w/2, cfg.h/2), 	//Radius of the outermost circle
		Format = d3.format('%'),			 	//Percentage formatting
		angleSlice = Math.PI * 2 / total;		//The width in radians of each "slice"
	
	//Scale for the radius
	var rScale = d3.scaleLinear()
		.range([0, radius])
		.domain([0, maxValue]);
		
	/////////////////////////////////////////////////////////
	//////////// Create the container SVG and g /////////////
	/////////////////////////////////////////////////////////

	//Remove whatever chart with the same id/class was present before
	d3.select(id).select("svg").remove();
	
	//Initiate the radar chart SVG
	var svg = d3.select(id).append("svg")
    .attr("width", cfg.w + cfg.margin.left + cfg.margin.right)
    .attr("height", cfg.h + cfg.margin.top + cfg.margin.bottom)
    .attr("class", "radar" + id);

console.log("SVG appended:", svg.node());

var g = svg.append("g")
    .attr("transform", "translate(" + (cfg.w / 2 + cfg.margin.left) + "," + (cfg.h / 2 + cfg.margin.top) + ")");
console.log("Group appended:", g.node());

	
	/////////////////////////////////////////////////////////
	////////// Glow filter for some extra pizzazz ///////////
	/////////////////////////////////////////////////////////
	
	//Filter for the outside glow
	var filter = g.append('defs').append('filter').attr('id','glow'),
		feGaussianBlur = filter.append('feGaussianBlur').attr('stdDeviation','2.5').attr('result','coloredBlur'),
		feMerge = filter.append('feMerge'),
		feMergeNode_1 = feMerge.append('feMergeNode').attr('in','coloredBlur'),
		feMergeNode_2 = feMerge.append('feMergeNode').attr('in','SourceGraphic');

	/////////////////////////////////////////////////////////
	/////////////// Draw the Circular grid //////////////////
	/////////////////////////////////////////////////////////
	
	//Wrapper for the grid & axes
	var axisGrid = g.append("g").attr("class", "axisWrapper");
	
	//Draw the background circles
	axisGrid.selectAll(".levels")
	   .data(d3.range(1,(cfg.levels+1)).reverse())
	   .enter()
		.append("circle")
		.attr("class", "gridCircle")
		.attr("r", function(d, i){return radius/cfg.levels*d;})
		.style("fill", "#CDCDCD")
		.style("stroke", "#CDCDCD")
		.style("fill-opacity", cfg.opacityCircles)
		.style("filter" , "url(#glow)");

	//Text indicating at what % each level is
	axisGrid.selectAll(".axisLabel")
	   .data(d3.range(1,(cfg.levels+1)).reverse())
	   .enter().append("text")
	   .attr("class", "axisLabel")
	   .attr("x", 4)
	   .attr("y", function(d){return -d*radius/cfg.levels;})
	   .attr("dy", "0.4em")
	   .style("font-size", "10px")
	   .attr("fill", "#737373")
	   .text(function(d,i) { return Format(maxValue * d/cfg.levels); });

	/////////////////////////////////////////////////////////
	//////////////////// Draw the axes //////////////////////
	/////////////////////////////////////////////////////////
	
	//Create the straight lines radiating outward from the center
	var axis = axisGrid.selectAll(".axis")
		.data(allAxis)
		.enter()
		.append("g")
		.attr("class", "axis");
	//Append the lines
	axis.append("line")
		.attr("x1", 0)
		.attr("y1", 0)
		.attr("x2", function(d, i){ return rScale(maxValue*1.1) * Math.cos(angleSlice*i - Math.PI/2); })
		.attr("y2", function(d, i){ return rScale(maxValue*1.1) * Math.sin(angleSlice*i - Math.PI/2); })
		.attr("class", "line")
		.style("stroke", "white")
		.style("stroke-width", "2px");

	//Append the labels at each axis
	axis.append("text")
		.attr("class", "legend")
		.style("font-size", "11px")
		.attr("text-anchor", "middle")
		.attr("dy", "0.35em")
		.attr("x", function(d, i){ return rScale(maxValue * cfg.labelFactor) * Math.cos(angleSlice*i - Math.PI/2); })
		.attr("y", function(d, i){ return rScale(maxValue * cfg.labelFactor) * Math.sin(angleSlice*i - Math.PI/2); })
		.text(function(d){return d})
		.call(wrap, cfg.wrapWidth);

	/////////////////////////////////////////////////////////
	///////////// Draw the radar chart blobs ////////////////
	/////////////////////////////////////////////////////////
	
	//The radial line function
	// The radial line function
// The radial line function
var radarLine = d3.lineRadial()
    .curve(d3.curveLinearClosed)
    .radius(function(d) {
        //console.log("Radius value (rScale):", rScale(d.value), "for data point:", d);
        return rScale(d.value);
    })
    .angle(function(d, i) {
        //console.log("Angle value (angleSlice):", i * angleSlice, "for axis:", d.axis);
        return i * angleSlice;
    });

// Create a wrapper for the blobs
var blobWrapper = g.selectAll(".radarWrapper")
    .data(data)
    .enter().append("g")
    .attr("class", "radarWrapper");

// Append the radar chart paths
blobWrapper.append("path")
    .attr("class", "radarArea")
    .attr("d", function(d) { return radarLine(d); })
    .style("fill-opacity", cfg.opacityArea)
    .style("fill", function(d, i) { return cfg.color(i); })
    .on('mouseover', function() {
        d3.selectAll(".radarArea").transition().duration(200).style("fill-opacity", 0.1);
        d3.select(this).transition().duration(200).style("fill-opacity", 0.7);
    })
    .on('mouseout', function() {
        d3.selectAll(".radarArea").transition().duration(200).style("fill-opacity", cfg.opacityArea);
    });

// Create the outlines
blobWrapper.append("path")
    .attr("class", "radarStroke")
    .attr("d", function(d) { return radarLine(d); })
    .style("stroke-width", cfg.strokeWidth + "px")
    .style("stroke", function(d, i) { return cfg.color(i); })
    .style("fill", "none");


	/////////////////////////////////////////////////////////
	//////// Append invisible circles for tooltip ///////////
	/////////////////////////////////////////////////////////
	
	//Wrapper for the invisible circles on top
	var blobCircleWrapper = g.selectAll(".radarCircleWrapper")
		.data(data)
		.enter().append("g")
		.attr("class", "radarCircleWrapper");
		
	//Append a set of invisible circles on top for the mouseover pop-up
	blobCircleWrapper.selectAll(".radarInvisibleCircle")
		.data(function(d,i) { return d; })
		.enter().append("circle")
		.attr("class", "radarInvisibleCircle")
		.attr("r", cfg.dotRadius*1.5)
		.attr("cx", function(d,i){ return rScale(d.value) * Math.cos(angleSlice*i - Math.PI/2); })
		.attr("cy", function(d,i){ return rScale(d.value) * Math.sin(angleSlice*i - Math.PI/2); })
		.style("fill", "none")
		.style("pointer-events", "all")
		.on("mouseover", function(d,i) {
			newX =  parseFloat(d3.select(this).attr('cx')) - 10;
			newY =  parseFloat(d3.select(this).attr('cy')) - 10;
					
			tooltip
				.attr('x', newX)
				.attr('y', newY)
				.text(Format(d.value))
				.transition().duration(200)
				.style('opacity', 1);
		})
		.on("mouseout", function(){
			tooltip.transition().duration(200)
				.style("opacity", 0);
		});
		
	//Set up the small tooltip for when you hover over a circle
	var tooltip = g.append("text")
		.attr("class", "tooltip")
		.style("opacity", 0);
	
	/////////////////////////////////////////////////////////
	/////////////////// Helper Function /////////////////////
	/////////////////////////////////////////////////////////

	//Taken from http://bl.ocks.org/mbostock/7555321
	//Wraps SVG text	
	function wrap(text, width) {
	  text.each(function() {
		var text = d3.select(this),
			words = text.text().split(/\s+/).reverse(),
			word,
			line = [],
			lineNumber = 0,
			lineHeight = 1.4, // ems
			y = text.attr("y"),
			x = text.attr("x"),
			dy = parseFloat(text.attr("dy")),
			tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");
			
		while (word = words.pop()) {
		  line.push(word);
		  tspan.text(line.join(" "));
		  if (tspan.node().getComputedTextLength() > width) {
			line.pop();
			tspan.text(line.join(" "));
			line = [word];
			tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
		  }
		}
	  });
	}//wrap	
	
}//RadarChart