

function funcDrawPercentageOver60VSHDI() {

	var vsCircleText = ["Taiwan", 
						"Japan", 
					    "China",
						"India", 
						"United States", 
						//"Brazil", 
						"Germany", 
						//"Russia", 
						"Australia", 
						//"Egypt",
						"Nigeria"
						];
						//"Republic of Korea"];

	var tjWorld_HDI = g_tjWorld
						.filter(function(d) { 
							if (d.data != null && 
								d.data.hdi > 0 && 
								d.data.percentage_over_60.Y2015 > 0 && 
								d.data.percentage_over_60.Y2050 > 0) 
								return d; }
							)
						.sort(function(a, b) { return d3.ascending(a.data.percentage_over_60.Y2050, b.data.percentage_over_60.Y2050); });

	var tjWorld_HDI_Text = tjWorld_HDI.filter(function(d) { if (vsCircleText.includes(d.data.name)) return d; });

	var vnYear = [2015, 2050];

	var n2015 = 0;
	var n2050 = 1;

	var fPercentageOver60_2015_Min = d3.min(tjWorld_HDI, function (d) { return d.data.percentage_over_60.Y2015; });
	var fPercentageOver60_2015_Max = d3.max(tjWorld_HDI, function (d) { return d.data.percentage_over_60.Y2015; });
	var fPercentageOver60_2050_Min = d3.min(tjWorld_HDI, function (d) { return d.data.percentage_over_60.Y2050; });
	var fPercentageOver60_2050_Max = d3.max(tjWorld_HDI, function (d) { return d.data.percentage_over_60.Y2050; });

	var fDrawXValueMin = fPercentageOver60_2015_Min;
	var fDrawXValueMax = fPercentageOver60_2050_Max;
	var fDrawYValueMin = d3.min(tjWorld_HDI, function (d) { return d.data.hdi; });
	var fDrawYValueMax = d3.max(tjWorld_HDI, function (d) { return d.data.hdi; });

	var nPadding = 20;

	var nWidth = g_nSVG_Wmm - (g_nSVG_Padding_mm * 2);

	var nHDI_Width = (nWidth) / 2.25;
	var nHDI_Height = 180;

	var nHeight = nHDI_Height + 75;

    var funcScaleX = d3.scaleLinear()
						.domain([fDrawXValueMin, fDrawXValueMax])
						.range([0, nHDI_Width]);		
	
	var funcScaleY = d3.scaleLinear()
						.domain([fDrawYValueMin, fDrawYValueMax])
						.range([30 + nHDI_Height, 30]); 

    // title
    /*
    g_domSVGMain.append("text")
	        .attr("id", "title_hdi")
			.attr("x", "10mm")
			.attr("y", "-10mm")
			.attr("fill", "#FFFFFF")
			.attr("fill-opacity", 0.80)
	        .attr("font-size", "10mm")
			.attr("text-anchor","right")
			.attr("transform", "translate(" + funcGetHpt(g_nSVG_Padding_mm) + ", 3400)")
	        .text("PERCENTAGE AGED OVER 60 V.S HDI");
	        */

	g_domSVGMain.append("rect")
					.attr("rx","5mm")
					.attr("ry","5mm")
					.attr("width", nWidth + "mm")
					.attr("height", nHeight + "mm")
					.attr("fill","#FFFFFF")
					.attr("fill-opacity", 0.80)
					.attr("transform", "translate(" + funcGetHpt(g_nSVG_Padding_mm) + ", 3400)");

	// --------------------------------------------------------------------------

	for (fDrawYValue = 0.3; fDrawYValue <= 1.0; fDrawYValue += 0.1)
	{

		g_domSVGMain.append("line")
						.attr("x1", 0 + "mm")
						.attr("y1", funcScaleY(fDrawYValue) + "mm")
						.attr("x2", (nHDI_Width - 20) + "mm")
						.attr("y2", funcScaleY(fDrawYValue) + "mm")
						.attr("stroke", "#00314F")
						.attr("stroke-width", "0.5mm")
						.attr("stroke-dasharray", "2mm,2mm")
						.attr("stroke-opacity", 0.5)
					    .attr("transform", "translate(" + funcGetHpt(g_nSVG_Padding_mm) + ", 3400)");

		g_domSVGMain.append("text")
						.attr("x", nHDI_Width + "mm")
						.attr("y", funcScaleY(fDrawYValue) + 3 + "mm")
						.attr("fill", "#00314F")
				        .attr("font-size", "8mm")
						.attr("text-anchor","middle")
					    .attr("transform", "translate(" + funcGetHpt(g_nSVG_Padding_mm) + ", 3400)")
					    .text(fDrawYValue.toFixed(1));

		g_domSVGMain.append("line")
						.attr("x1", (nHDI_Width + 20) + "mm")
						.attr("y1", funcScaleY(fDrawYValue) + "mm")
						.attr("x2", g_nSVG_Wmm - (g_nSVG_Padding_mm * 2) + "mm")
						.attr("y2", funcScaleY(fDrawYValue) + "mm")
						.attr("stroke", "#00314F")
						.attr("stroke-width", "0.5mm")
						.attr("stroke-dasharray", "2mm,2mm")
						.attr("stroke-opacity", 0.5)
					    .attr("transform", "translate(" + funcGetHpt(g_nSVG_Padding_mm) + ", 3400)");
/*
		g_domSVGMain.append("line")
						.attr("x1", 50 + nHDI_Width + "mm")
						.attr("y1", funcScaleY(fDrawYValue) + "mm")
						.attr("x2", g_nSVG_Wmm - (g_nSVG_Padding_mm * 2) + "mm")
						.attr("y2", funcScaleY(fDrawYValue) + "mm")
						.attr("stroke", "#00314F")
						.attr("stroke-width", "0.5mm")
						.attr("stroke-dasharray", "2mm,2mm")
						.attr("stroke-opacity", 0.5)
					    .attr("transform", "translate(" + funcGetHpt(g_nSVG_Padding_mm) + ", 3400)");*/
	}

	// --------------------------------------------------------------------------


	var dsWorld_PerOver60_HDI_Text = tjWorld_HDI.filter(function(d) { if (vsCircleText.includes(d.data.name)) return d; }); // thousand

	//for (nYearIdx = 0; nYearIdx < vnYear.length; nYearIdx++)
	{
		var fDrawXValueIndex_S = 0;
		var fDrawXValueIndex_E = 0;

	//	switch (vnYear[nYearIdx])
		{
	//		case 2015: 
				var fDrawXValueIndex_S_2015 = Math.round(d3.min(tjWorld_HDI, function (d) { return d.data.percentage_over_60.Y2015; })); 
				var fDrawXValueIndex_E_2015 = Math.round(d3.max(tjWorld_HDI, function (d) { return d.data.percentage_over_60.Y2015; })) + 5; 
	//			break;
	//		case 2050: 
				var fDrawXValueIndex_S_2050 = Math.round(d3.min(tjWorld_HDI, function (d) { return d.data.percentage_over_60.Y2050; })); 
				var fDrawXValueIndex_E_2050 = Math.round(d3.max(tjWorld_HDI, function (d) { return d.data.percentage_over_60.Y2050; })) + 5; 
	//			break;
		}

/*
	    // title
	    g_domSVGMain.append("text")
		        .attr("id", "title_" + vnYear[nYearIdx])
				.attr("x", ((funcScaleX(fDrawXValueIndex_S) + funcScaleX(fDrawXValueIndex_E))/ 2) + ((240 - 50) * nYearIdx) + 20 + "mm")
				.attr("y", ((funcScaleY(fDrawYValueMin) + funcScaleY(fDrawYValueMax))/ 2) + 15 + "mm")
				.attr("fill", "#00314F")
		        .attr("font-size", "30mm")
				.attr("text-anchor","middle")
				.attr("fill-opacity", 0.25)
				.attr("transform", "translate(1" + funcGetHpt(g_nSVG_Padding_mm) + ", 2300)")
		        .text(vnYear[nYearIdx]);
		        */

		// content
		g_domSVGMain.selectAll("circle.perover60_vs_hdi_" + vnYear[n2015])
						.data(tjWorld_HDI)
						.enter()
						.append("circle")
			                .attr("class", "perover60_vs_hdi_" + vnYear[n2015])
							.attr("cx", function(d) { return nPadding + funcScaleX(getPercentageOver60(d.data, vnYear[n2015])) + "mm"; })
							.attr("cy", function(d) { return funcScaleY(d.data.hdi) + "mm"; })
							.attr("r", function(d) { return getCircleRadius_PopulationOver60(d.data, vnYear[n2015]) + "mm"; })
							.attr("fill", function(d) { return getCountryColor(d.data); })
							.attr("fill-opacity", 0.20)
							.attr("transform", "translate(" + funcGetHpt(g_nSVG_Padding_mm) + ", 3400)");

		g_domSVGMain.selectAll("circle.perover60_vs_hdi_" + vnYear[n2050])
						.data(tjWorld_HDI)
						.enter()
						.append("circle")
			                .attr("class", "perover60_vs_hdi_" + vnYear[n2050])
							.attr("cx", function(d) { return (nHDI_Width + 20) + nPadding + funcScaleX(getPercentageOver60(d.data, vnYear[n2050])) + "mm"; })
							.attr("cy", function(d) { return funcScaleY(d.data.hdi) + "mm"; })
							.attr("r", function(d) { return getCircleRadius_PopulationOver60(d.data, vnYear[n2050]) + "mm"; })
							.attr("fill", function(d) { return getCountryColor(d.data); })
							.attr("fill-opacity", 0.20)
							.attr("transform", "translate(" + funcGetHpt(g_nSVG_Padding_mm) + ", 3400)");

		g_domSVGMain.selectAll("circle.perover60_vs_hdi_text_" + vnYear[n2015])
						.data(tjWorld_HDI_Text)
						.enter()
						.append("circle")
			                .attr("class", "perover60_vs_hdi_text_" + vnYear[n2015])
							.attr("cx", function(d) { return nPadding + funcScaleX(getPercentageOver60(d.data, vnYear[n2015])) + "mm"; })
							.attr("cy", function(d) { return funcScaleY(d.data.hdi) + "mm"; })
							.attr("r", function(d) { return getCircleRadius_PopulationOver60(d.data, vnYear[n2015]) + "mm"; })
							.attr("fill-opacity", 0)
							.attr("stroke", function(d) { return getCountryColor(d.data); })
							.attr("stroke-width", "0.5mm")
							.attr("transform", "translate(" + funcGetHpt(g_nSVG_Padding_mm) + ", 3400)");

		g_domSVGMain.selectAll("circle.perover60_vs_hdi_text_" + vnYear[n2050])
						.data(tjWorld_HDI_Text)
						.enter()
						.append("circle")
			                .attr("class", "perover60_vs_hdi_text_" + vnYear[n2050])
							.attr("cx", function(d) { return (nHDI_Width + 20) + nPadding + funcScaleX(getPercentageOver60(d.data, vnYear[n2050])) + "mm"; })
							.attr("cy", function(d) { return funcScaleY(d.data.hdi) + "mm"; })
							.attr("r", function(d) { return getCircleRadius_PopulationOver60(d.data, vnYear[n2050]) + "mm"; })
							.attr("fill-opacity", 0)
							.attr("stroke", function(d) { return getCountryColor(d.data); })
							.attr("stroke-width", "0.5mm")
							.attr("transform", "translate(" + funcGetHpt(g_nSVG_Padding_mm) + ", 3400)");

		g_domSVGMain.selectAll("text.perover60_vs_hdi_text_" + vnYear[n2015])
						.data(tjWorld_HDI_Text)
						.enter()
						.append("text")
			                .attr("class", "perover60_vs_hdi_text_" + vnYear[n2015])
							.attr("x", function(d) { return nPadding + funcScaleX(getPercentageOver60(d.data, vnYear[n2015])) + "mm"; })
							.attr("y", function(d) { return funcScaleY(d.data.hdi) + 3 + "mm"; })
							.attr("fill", function(d) { return getCountryColor(d.data); })
							.attr("font-size","8mm")
							.attr("text-anchor","middle")
							.attr("fill-opacity", 0.90)
							.attr("transform", "translate(" + funcGetHpt(g_nSVG_Padding_mm) + ", 3400)")
							.text(function(d) { return d.data.name; });

		g_domSVGMain.selectAll("text.perover60_vs_hdi_text_" + vnYear[n2050])
						.data(tjWorld_HDI_Text)
						.enter()
						.append("text")
			                .attr("class", "perover60_vs_hdi_text_" + vnYear[n2050])
							.attr("x", function(d) { return (nHDI_Width + 20) + nPadding + funcScaleX(getPercentageOver60(d.data, vnYear[n2050])) + "mm"; })
							.attr("y", function(d) { return funcScaleY(d.data.hdi) + 3 + "mm"; })
							.attr("fill", function(d) { return getCountryColor(d.data); })
							.attr("font-size","8mm")
							.attr("text-anchor","middle")
							.attr("fill-opacity", 0.90)
							.attr("transform", "translate(" + funcGetHpt(g_nSVG_Padding_mm) + ", 3400)")
							.text(function(d) { return d.data.name; });
/*
		g_domSVGMain.selectAll("text.perover60_vs_hdi_text_" + vnYear[nYearIdx])
						.data(tjWorld_HDI)
						.enter()
						.append("text")
							.attr("class", "perover60_vs_hdi_text_" + vnYear[nYearIdx])
							.attr("x", function(d) { return 50 + funcScaleX(getPercentageOver60(d.data, vnYear[nYearIdx])) + ((240 - 50) * nYearIdx) + "mm"; })
							.attr("y", function(d) { return funcScaleY(d.data.hdi) + 2 + "mm"; })
							.attr("fill", "#00314F")
							.attr("font-size","8mm")
							.attr("text-anchor","middle")
							.attr("fill-opacity", 0.80)
							.attr("transform", "translate(" + funcGetHpt(g_nSVG_Padding_mm) + ", 3400)")
							.text(function(d) { return d.name; });*/
		for (fDrawXValue = fDrawXValueIndex_S_2015; fDrawXValue <= fDrawXValueIndex_E_2015; fDrawXValue++)
		{
			if (fDrawXValue % 5 == 0)
			{
				g_domSVGMain.append("text")
								.attr("x", function(d) { return nPadding + funcScaleX(fDrawXValue) + "mm"; })
								.attr("y", funcScaleY(0.25) + "mm")
								.attr("fill", "#00314F")
						        .attr("font-size", "8mm")
								.attr("text-anchor","middle")
							    .attr("transform", "translate(" + funcGetHpt(g_nSVG_Padding_mm) + ", 3400)")
							    .text(fDrawXValue);
			}
		}

		for (fDrawXValue = fDrawXValueIndex_S_2050; fDrawXValue <= fDrawXValueIndex_E_2050; fDrawXValue++)
		{
			if (fDrawXValue % 5 == 0)
			{
				g_domSVGMain.append("text")
								.attr("x", function(d) { return (nHDI_Width + 20) + nPadding + funcScaleX(fDrawXValue) + "mm"; })
								.attr("y", funcScaleY(0.25) + "mm")
								.attr("fill", "#00314F")
						        .attr("font-size", "8mm")
								.attr("text-anchor","middle")
							    .attr("transform", "translate(" + funcGetHpt(g_nSVG_Padding_mm) + ", 3400)")
							    .text(fDrawXValue);
			}
		}
	
	}

/*
	//Create labels
	svg.selectAll("text.name")
			.data(dsWorld_LE_HDI)
			.enter()
			.append("text")
                .attr("class","nation_name")
				.attr("x", function(d,i) { return xScale(d.life_expectancy); })
				.attr("y", function(d,i) { return yScale(d.data.hdi) + 3; })
				.attr("fill", "black")
				.attr("text-anchor","middle")
			//.text(function(d, index) { return d.name; });
			//.text(function(d, index) { if (d.population > 50000000 || d.name == "Taiwan") return d.name; });
			.text(function(d, index) { if (rAreaScale(d.population) > 500 || d.name == "Taiwan") return d.name; });
			*/
}

