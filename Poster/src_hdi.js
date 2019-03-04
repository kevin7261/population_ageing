
var g_nSelectedYear_Prev = 2015;
var g_nSelectedYear_This = 2015;

var g_vsCircleText = ["Taiwan", 
					"Japan", 
				    "China",
					"India", 
					"United States", 
					"Germany", 
					"Nigeria"
					];

function funcDrawPercentageOver60VSHDI() {

	d3.select(".hdi").remove(); 

	var g_domSVGMain_HDI = g_domSVGMain.append("g").
										attr("class", "hdi");

	var tjWorld_HDI = g_tjWorld
						.filter(function(d) { 
							if (d.data != null && 
								d.data.hdi > 0 && 
								d.data.percentage_over_60.Y2015 > 0 && 
								d.data.percentage_over_60.Y2030 > 0 && 
								d.data.percentage_over_60.Y2050 > 0) 
								return d; }
							)
						.sort(function(a, b) { return d3.ascending(a.data.population_over_60.Y2050, b.data.population_over_60.Y2050); });

	var g_domSVGMain_HDI_Circle = g_domSVGMain_HDI.selectAll("circle.perover60_vs_hdi")
											.data(tjWorld_HDI);

	var g_domSVGMain_HDI_Circle_Title = g_domSVGMain_HDI.selectAll("text.perover60_vs_hdi_name")
											.data(tjWorld_HDI.filter(function(d) { if (isDrawStroke(d)) return d; }));
											
	var vnYear = [2015, 2030, 2050];

	var n2015 = 0;
	var n2030 = 1;
	var n2050 = 2;

	var nGap = 2;// %

	var nWidth = g_nSVG_Wmm - (g_nSVG_Padding_mm * 2);

	var nHDI_Height = 225;

	var nHeight = nHDI_Height + 75;

	var nWpt = 0;
	var nHpt = 700;
	
	var nButtonWidth = 60;
	var nButtonHeight= 50;

	// --------------------------------------------------------------------------
	
	funcDrawPoster_HDI();
	//funcDrawInteraction_HDI();
		
	function funcDrawPoster_HDI()
	{
		d3.selectAll(".poster").remove();

		var fPercentage_2015_Max = 30;
		var fPercentage_2050_Max = 45;

		var fPercentageOver60_2015_Min = 0;
		var fPercentageOver60_2015_Max = fPercentage_2015_Max;
		var fPercentageOver60_2050_Min = fPercentage_2015_Max;
		var fPercentageOver60_2050_Max = fPercentage_2015_Max + fPercentage_2050_Max;

		var fDrawXValueMin = fPercentageOver60_2015_Min;
		var fDrawXValueMax = fPercentageOver60_2050_Max;
		var fDrawYValueMin = d3.min(tjWorld_HDI, function (d) { return d.data.hdi; });
		var fDrawYValueMax = d3.max(tjWorld_HDI, function (d) { return d.data.hdi; });
		
	    var funcScaleX = d3.scaleLinear()
								.domain([fDrawXValueMin, fDrawXValueMax])
								.range([g_nSVG_Padding_mm, g_nSVG_Wmm - (g_nSVG_Padding_mm * 2)]);		
	
		var funcScaleY = d3.scaleLinear()
								.domain([fDrawYValueMin, fDrawYValueMax])
								.range([50 + nHDI_Height, 50]); 

		var nHDI_Width_2015 = funcScaleX(fPercentageOver60_2015_Max) - funcScaleX(fPercentageOver60_2015_Min);
		var nHDI_Width_2050 = funcScaleX(fPercentageOver60_2050_Max) - funcScaleX(fPercentageOver60_2050_Min);

		// --------------------------------------------------------------------------

		g_domSVGMain.append("rect")
						.attr("class", "poster")
						.attr("x", 0 + g_nSVG_Padding_mm + "mm")
						.attr("y", funcScaleY(0.65) + "mm")
						.attr("width", (funcScaleX(fPercentage_2015_Max + 5) - g_nSVG_Padding_mm) + "mm")
						.attr("height", (funcScaleY(0.55) - funcScaleY(0.65)) + "mm")
						.attr("fill", g_colorBackground)
						.attr("fill-opacity", g_Opacity_World_2015)
						.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")");

		g_domSVGMain.append("rect")
						.attr("class", "poster")
						.attr("x", funcScaleX(fPercentage_2015_Max + 5) + "mm")
						.attr("y", funcScaleY(0.75) + "mm")
						.attr("width", ((g_nSVG_Wmm - g_nSVG_Padding_mm) - funcScaleX(fPercentage_2015_Max + 5)) + "mm")
						.attr("height", (funcScaleY(0.65) - funcScaleY(0.75)) + "mm")
						.attr("fill", g_colorBackground)
						.attr("fill-opacity", g_Opacity_World_2050)
						.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")");

		// --------------------------------------------------------------------------
			
		for (fDrawYValue = 0.45; fDrawYValue < 0.95; fDrawYValue += 0.1)
		{
			var DrawYValueText = fDrawYValue.toFixed(1);

			g_domSVGMain.append("line")
							.attr("class", "poster")
							.attr("x1", g_nSVG_Padding_mm + "mm")
							.attr("y1", funcScaleY(fDrawYValue) + "mm")
							.attr("x2", (g_nSVG_Wmm - g_nSVG_Padding_mm) + "mm")//.attr("x2", (g_nSVG_Wmm - g_nSVG_Padding_mm) + "mm")
							.attr("y2", funcScaleY(fDrawYValue) + "mm")
							.attr("stroke", g_colorBackground)
							.attr("stroke-width", "0.5mm")
							.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")");
		}

		for (fDrawYValue = 0.5; fDrawYValue <= 0.9; fDrawYValue += 0.1)
		{
			var sDrawYValueText = fDrawYValue.toFixed(1);
			var color = g_colorBackground;

			if (fDrawYValue.toFixed(1) == 0.9)
				sDrawYValueText = "HDI";

			if (fDrawYValue.toFixed(1) == 0.6)
				color = g_colorBackground_Draw;
			
			g_domSVGMain.append("text")
							.attr("class", "poster")
							.attr("x", funcScaleX(nGap) + "mm")//.attr("x", (g_nSVG_Padding_mm + nHDI_Width_2015) + g_nSVG_Padding_mm + "mm")
							.attr("y", funcScaleY(fDrawYValue) + 4 + "mm")
							.attr("fill", color)
							.attr("font-size", g_nSVG_FontSize_Number_Hmm + "mm")
							.attr("text-anchor","middle")
							.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")")
							.text(sDrawYValueText);
		}
	
		var fDrawXValueIndex_S = 0;
		var fDrawXValueIndex_E = 0;

		var fDrawXValueIndex_S_2015 = Math.round(d3.min(tjWorld_HDI, function (d) { return d.data.percentage_over_60.Y2015; })); 
		var fDrawXValueIndex_E_2015 = Math.round(d3.max(tjWorld_HDI, function (d) { return d.data.percentage_over_60.Y2015; })); 

		var fDrawXValueIndex_S_2050 = Math.round(d3.min(tjWorld_HDI, function (d) { return d.data.percentage_over_60.Y2050; })); 
		var fDrawXValueIndex_E_2050 = Math.round(d3.max(tjWorld_HDI, function (d) { return d.data.percentage_over_60.Y2050; })) + 5; 

		// content
		g_domSVGMain.selectAll("circle.perover60_vs_hdi_2015")
						.data(tjWorld_HDI)
						.enter()
						.append("circle")
							.attr("class", "poster perover60_vs_hdi_2015")
							.attr("cx", function(d) { return funcScaleX(getPercentageOver60(d.data, vnYear[n2015])) + "mm"; })
							.attr("cy", function(d) { return funcScaleY(d.data.hdi) + "mm"; })
							.attr("r", function(d) { return getCircleRadius_PopulationOver60(d.data, vnYear[n2015]) + "mm"; })
							.attr("fill", function(d) { return getCountryColor(d); })
							.attr("fill-opacity", g_Opacity_2015)
							.attr("stroke", g_colorBackground)
							.attr("stroke-opacity", function(d) { return (isDrawStroke(d)) ? g_Opacity_World_2015 : 0.0; })
							.attr("stroke-width", 0.5 + "mm")
							.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")");

		g_domSVGMain.selectAll("circle.perover60_vs_hdi_2050")
						.data(tjWorld_HDI)
						.enter()
						.append("circle")
							.attr("class", "poster perover60_vs_hdi_2050")
							.attr("cx", function(d) { return funcScaleX(fPercentageOver60_2015_Max + getPercentageOver60(d.data, vnYear[n2050])) + "mm"; })
							.attr("cy", function(d) { return funcScaleY(d.data.hdi) + "mm"; })
							.attr("r", function(d) { return getCircleRadius_PopulationOver60(d.data, vnYear[n2050]) + "mm"; })
							.attr("fill", function(d) { return getCountryColor(d); })
							.attr("fill-opacity", g_Opacity_2050)
							.attr("stroke", g_colorBackground)
							.attr("stroke-opacity", function(d) { return (isDrawStroke(d)) ? g_Opacity_World_2015 : 0.0; })
							.attr("stroke-width", 0.5 + "mm")
							.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")");

		for (fDrawXValue = fDrawXValueIndex_S_2015; fDrawXValue <= fDrawXValueIndex_E_2015; fDrawXValue++)
		{
			if (fDrawXValue % 5 == 0)
			{
				g_domSVGMain.append("text")
								.attr("class", "poster subfont")
								.attr("x", funcScaleX(fDrawXValue) + "mm")
								.attr("y", funcScaleY(0.4) + 4 + "mm")//.attr("y", funcScaleY(0.25) + "mm")
								.attr("fill", g_colorBackground)
								.attr("font-size", g_nSVG_FontSize_Number_Hmm + "mm")
								.attr("text-anchor","middle")
								.attr("transform", "translate(0, 2800)")
								.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")")
								.text(fDrawXValue + "%");
			}
		}

		for (fDrawXValue = fDrawXValueIndex_S_2050; fDrawXValue <= fDrawXValueIndex_E_2050; fDrawXValue++)
		{
			if (fDrawXValue % 5 == 0)
			{
				g_domSVGMain.append("text")
								.attr("class", "poster subfont")
								.attr("x", funcScaleX(fPercentageOver60_2015_Max + fDrawXValue) + "mm")
								.attr("y", funcScaleY(0.4) + 4 + "mm")//.attr("y", funcScaleY(0.25) + "mm")
								.attr("fill", g_colorBackground)
								.attr("font-size", g_nSVG_FontSize_Number_Hmm + "mm")
								.attr("text-anchor","middle")
								.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")")
								.text(fDrawXValue + "%");
			}
		}

		// ---------------------------

		g_domSVGMain.append("text")
							.attr("class", "poster")
							.attr("x", (funcScaleX(fPercentageOver60_2015_Max)) + "mm")
							.attr("y", (funcScaleY(0.6) - 2) + "mm")//.attr("y", funcScaleY(0.25) + "mm")
							.attr("fill", g_colorBackground_Draw)
							.attr("font-size", g_nSVG_FontSize_Title_Hmm_Sub + "mm")
							.attr("text-anchor", "end")
							.attr("font-weight", "bold")
							.attr("fill-opacity", g_Opacity_World_2015)
							.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")")
		        			.text("HDI 2015 v.s");

		g_domSVGMain.append("text")
							.attr("class", "poster")
							.attr("x", (funcScaleX(fPercentageOver60_2015_Max)) + "mm")
							.attr("y", (funcScaleY(0.55) - 2) + "mm")//.attr("y", funcScaleY(0.25) + "mm")
							.attr("fill", g_colorBackground_Draw)
							.attr("font-size", g_nSVG_FontSize_Title_Hmm_Sub + "mm")
							.attr("text-anchor", "end")
							.attr("font-weight", "bold")
							.attr("fill-opacity", g_Opacity_World_2015)
							.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")")
		        			.text("PERCENTAGE of AGE > 60");

		g_domSVGMain.append("text")
							.attr("class", "poster")
							.attr("x", (funcScaleX(fPercentageOver60_2015_Max + 5) - 10) + "mm")
							.attr("y", (funcScaleY(0.6) - 4) + "mm")//.attr("y", funcScaleY(0.25) + "mm")
							.attr("fill", g_colorBackground_Draw)
							.attr("font-size", g_nSVG_FontSize_Number_Hmm + "mm")
							.attr("text-anchor", "end")
							.attr("fill-opacity", g_Opacity_World_2015)
							.attr("text-decoration", "underline")
							.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")")
		        			.text("2015");

		g_domSVGMain.append("text")
							.attr("class", "poster")
							.attr("x", (funcScaleX(fPercentageOver60_2050_Min + 5) + 10) + "mm")
							.attr("y", (funcScaleY(0.65) - 10) + "mm")//.attr("y", funcScaleY(0.25) + "mm")
							.attr("fill", g_colorBackground_Draw)
							.attr("font-size", g_nSVG_FontSize_Number_Hmm + "mm")
							.attr("text-anchor", "front")
							.attr("fill-opacity", g_Opacity_World_2015)
							.attr("text-decoration", "underline")
							.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")")
		        			.text("2050");
	}
	
	function funcDrawInteraction_HDI()
	{
		d3.selectAll(".interaction").remove();

		var fPercentage_2015_Max = 30;
		var fPercentage_2050_Max = 45;

		var fPercentageOver60_2015_Min = 0;
		var fPercentageOver60_2015_Max = fPercentage_2015_Max;
		var fPercentageOver60_2050_Min = fPercentage_2015_Max;
		var fPercentageOver60_2050_Max = fPercentage_2050_Max;

		var fDrawXValueMin = fPercentageOver60_2015_Min;
		var fDrawXValueMax = fPercentageOver60_2050_Max;
		var fDrawYValueMin = d3.min(tjWorld_HDI, function (d) { return d.data.hdi; });
		var fDrawYValueMax = d3.max(tjWorld_HDI, function (d) { return d.data.hdi; });

		var funcScaleX = d3.scaleLinear()
							.domain([fDrawXValueMin, fDrawXValueMax])
							.range([g_nSVG_Padding_mm, g_nSVG_Wmm - (g_nSVG_Padding_mm * 3)]);		
		
		var funcScaleY = d3.scaleLinear()
							.domain([fDrawYValueMin, fDrawYValueMax])
							.range([50 + nHDI_Height, 50]); 

		// --------------------------------------------------------------------------

		g_domSVGMain_HDI.append("rect")
						.attr("class", "poster")
						.attr("x", funcScaleX(15) + "mm")
						.attr("y", funcScaleY(0.55) + "mm")
						.attr("width", (funcScaleX(35) - funcScaleX(15)) + "mm")
						.attr("height", (funcScaleY(0.45) - funcScaleY(0.55)) + "mm")
						.attr("fill", (g_nSelectedYear_This == 2015) ? g_colorBackground : g_colorBackground)
						.attr("fill-opacity", g_Opacity_World_2015)
						.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")");

		g_domSVGMain_HDI.append("rect")
						.attr("class", "poster")
						.attr("x", funcScaleX(35) + "mm")
						.attr("y", funcScaleY(0.55) + "mm")
						.attr("width", (funcScaleX(40) - funcScaleX(35)) + "mm")
						.attr("height", (funcScaleY(0.45) - funcScaleY(0.55)) + "mm")
						.attr("fill", (g_nSelectedYear_This == 2030) ? g_colorBackground : g_colorBackground)
						.attr("fill-opacity", (g_Opacity_World_2015 + g_Opacity_World_2050)/ 2)
						.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")");

		g_domSVGMain_HDI.append("rect")
						.attr("class", "poster")
						.attr("x", funcScaleX(40) + "mm")
						.attr("y", funcScaleY(0.55) + "mm")
						.attr("width", (g_nSVG_Wmm - g_nSVG_Padding_mm) - funcScaleX(40) + "mm")
						.attr("height", (funcScaleY(0.45) - funcScaleY(0.55)) + "mm")
						.attr("fill", (g_nSelectedYear_This == 2050) ? g_colorBackground : g_colorBackground)
						.attr("fill-opacity", g_Opacity_World_2050)
						.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")");

		// --------------------------------------------------------------------------	

		{
			g_domSVGMain_HDI.append("text")
								.attr("class", "interaction button_2015 subfont")
								.attr("x", (funcScaleX(30) + 10) + "mm")
								.attr("y", (funcScaleY(0.45) - 10) + "mm")
								.attr("fill", g_colorTaiwan)
								.attr("font-size", g_nSVG_FontSize_Number_Hmm + "mm")
								.attr("text-anchor", "front")
								.attr("text-decoration", "underline")
								.on("click", function(){
										
										g_nSelectedYear_This = vnYear[n2015];

										funcDrawPercentageOver60VSHDI_Year(g_nSelectedYear_Prev, g_nSelectedYear_This, funcScaleX, funcScaleY);
										
										g_domSVGMain_HDI.select("text.button_2015")
											.attr("fill", g_colorTaiwan);
											
										g_domSVGMain_HDI.select("text.button_2030")
											.attr("fill", g_colorBackground_Draw);
											
										g_domSVGMain_HDI.select("text.button_2050")
											.attr("fill", g_colorBackground_Draw);
									})
								.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")")
								.text(vnYear[n2015]);
								
			g_domSVGMain_HDI.append("text")
								.attr("class", "interaction button_2030 subfont")
								.attr("x", (funcScaleX(35) + 10) + "mm")
								.attr("y", (funcScaleY(0.45) - 10) + "mm")
								.attr("fill", g_colorBackground_Draw)
								.attr("font-size", g_nSVG_FontSize_Number_Hmm + "mm")
								.attr("text-anchor", "front")
								.attr("text-decoration", "underline")
								.on("click", function(){
										
										g_nSelectedYear_This = vnYear[n2030];

										funcDrawPercentageOver60VSHDI_Year(g_nSelectedYear_Prev, g_nSelectedYear_This, funcScaleX, funcScaleY);
										
										g_domSVGMain_HDI.select("text.button_2015")
											.attr("fill", g_colorBackground_Draw);
											
										g_domSVGMain_HDI.select("text.button_2030")
											.attr("fill", g_colorTaiwan);
											
										g_domSVGMain_HDI.select("text.button_2050")
											.attr("fill", g_colorBackground_Draw);
									})
								.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")")
								.text(vnYear[n2030]);
								
			g_domSVGMain_HDI.append("text")
								.attr("class", "interaction button_2050 subfont")
								.attr("x", (funcScaleX(40) + 10) + "mm")
								.attr("y", (funcScaleY(0.45) - 10) + "mm")
								.attr("fill", g_colorBackground_Draw)
								.attr("font-size", g_nSVG_FontSize_Number_Hmm + "mm")
								.attr("text-anchor", "front")
								.attr("text-decoration", "underline")
								.on("click", function(){
										
										g_nSelectedYear_This = vnYear[n2050];

										funcDrawPercentageOver60VSHDI_Year(g_nSelectedYear_Prev, g_nSelectedYear_This, funcScaleX, funcScaleY);
										
										g_domSVGMain_HDI.select("text.button_2015")
											.attr("fill", g_colorBackground_Draw);
											
										g_domSVGMain_HDI.select("text.button_2030")
											.attr("fill", g_colorBackground_Draw);
											
										g_domSVGMain_HDI.select("text.button_2050")
											.attr("fill",g_colorTaiwan);
									})
								.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")")
								.text(vnYear[n2050]);

		g_domSVGMain_HDI.append("text")
							.attr("class", "interaction")
							.attr("x", (funcScaleX(15) + 10) + "mm")
							.attr("y", (funcScaleY(0.5) - 2) + "mm")//.attr("y", funcScaleY(0.25) + "mm")
							.attr("fill", g_colorBackground_Draw)
							.attr("font-size", g_nSVG_FontSize_Title_Hmm_Sub + "mm")
							.attr("text-anchor", "front")
							.attr("font-weight", "bold")
							.attr("fill-opacity", g_Opacity_World_2015)
							.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")")
		        			.text("HDI 2015 v.s");

		g_domSVGMain_HDI.append("text")
							.attr("class", "interaction")
							.attr("x", (funcScaleX(15) + 10) + "mm")
							.attr("y", (funcScaleY(0.45) - 2) + "mm")//.attr("y", funcScaleY(0.25) + "mm")
							.attr("fill", g_colorBackground_Draw)
							.attr("font-size", g_nSVG_FontSize_Title_Hmm_Sub + "mm")
							.attr("text-anchor", "front")
							.attr("font-weight", "bold")
							.attr("fill-opacity", g_Opacity_World_2015)
							.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")")
		        			.text("PERCENTAGE of AGE > 60");
		}

		// --------------------------------------------------------------------------

		for (fDrawYValue = 0.45; fDrawYValue < 0.95; fDrawYValue += 0.1)
		{
			var DrawYValueText = fDrawYValue.toFixed(1);

			g_domSVGMain_HDI.append("line")
							.attr("class", "interaction")
							.attr("x1", g_nSVG_Padding_mm + "mm")
							.attr("y1", funcScaleY(fDrawYValue) + "mm")
							.attr("x2", (g_nSVG_Wmm - g_nSVG_Padding_mm) + "mm")//.attr("x2", (g_nSVG_Wmm - g_nSVG_Padding_mm) + "mm")
							.attr("y2", funcScaleY(fDrawYValue) + "mm")
							.attr("stroke", g_colorBackground)
							.attr("stroke-width", "0.5mm")
							.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")");
		}

		for (fDrawYValue = 0.5; fDrawYValue <= 0.9; fDrawYValue += 0.1)
		{
			var sDrawYValueText = fDrawYValue.toFixed(1);

			if (fDrawYValue.toFixed(1) == 0.9)
				sDrawYValueText = "HDI";
			
			g_domSVGMain_HDI.append("text")
							.attr("class", "interaction")
							.attr("x", funcScaleX(nGap) + "mm")//.attr("x", (g_nSVG_Padding_mm + nHDI_Width_2015) + g_nSVG_Padding_mm + "mm")
							.attr("y", funcScaleY(fDrawYValue) + 4 + "mm")
							.attr("fill", g_colorBackground)
							.attr("font-size", g_nSVG_FontSize_Number_Hmm + "mm")
							.attr("text-anchor","middle")
							.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")")
							.text(sDrawYValueText);
		}

		// --------------------------------------------------------------------------

		{
			var fDrawXValueIndex_S = 0;
			var fDrawXValueIndex_E = 0;

			var fDrawXValueIndex_S_2015 = Math.round(d3.min(tjWorld_HDI, function (d) { return d.data.percentage_over_60.Y2015; })); 
			var fDrawXValueIndex_E_2015 = Math.round(d3.max(tjWorld_HDI, function (d) { return d.data.percentage_over_60.Y2015; })) + 5; 
	 
			var fDrawXValueIndex_S_2050 = Math.round(d3.min(tjWorld_HDI, function (d) { return d.data.percentage_over_60.Y2050; })); 
			var fDrawXValueIndex_E_2050 = Math.round(d3.max(tjWorld_HDI, function (d) { return d.data.percentage_over_60.Y2050; })) + 5; 

			for (fDrawXValue = fDrawXValueIndex_S_2015; fDrawXValue <= fDrawXValueIndex_E_2050; fDrawXValue++)
			{
				if (fDrawXValue % 5 == 0)
				{
					g_domSVGMain_HDI.append("text")
									.attr("class", "interaction subfont")
									.attr("x", funcScaleX(fDrawXValue) + "mm")
									.attr("y", funcScaleY(0.4) + 4 + "mm")//.attr("y", funcScaleY(0.25) + "mm")
									.attr("fill", g_colorBackground)
									.attr("font-size", "10mm")
									.attr("text-anchor","middle")
									.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")")
									.text(fDrawXValue + "%");
				}
			}
			
			funcDrawPercentageOver60VSHDI_Year(g_nSelectedYear_Prev, g_nSelectedYear_This, funcScaleX, funcScaleY);
		}

		function funcDrawPercentageOver60VSHDI_Year(nSelectedYear_Prev, nSelectedYear_This, funcScaleX, funcScaleY) 
		{
			d3.selectAll("circle.perover60_vs_hdi").remove();
			d3.selectAll("text.perover60_vs_hdi_name").remove();
			d3.selectAll("text.perover60_vs_hdi_title").remove();

			console.log("funcDrawPercentageOver60VSHDI_Year", nSelectedYear_Prev, nSelectedYear_This);

			// content
			g_domSVGMain_HDI_Circle.enter()
							.append("circle")
								.attr("class", "interaction perover60_vs_hdi " + function(d) { return "perover60_vs_hdi_" + d.data.id; })

					// -----------------------------------------------------------------------
					
						.on("mouseover", function (d) {

							g_nSelectedCountryID = d.data.id;
							
							d3.select(this)
								.attr("fill-opacity", g_Opacity_2015);

							//d3.select("text.perover60_vs_hdi_title_" + d.data.id)
							//	.attr("fill-opacity", 0);
							/*
							g_domSVGMain_HDI.append("text")
												.attr("class", "interaction perover60_vs_hdi_name_" + nSelectedYear_This + "_" + d.data.id)
												.attr("x", funcScaleX(getPercentageOver60(d.data, nSelectedYear_This)) + "mm")
												.attr("y", funcScaleY(d.data.hdi) - 10 + "mm")
												.attr("fill", g_colorBackground)
												.attr("font-size", g_nSVG_FontSize_Country_Hmm + "mm")
												.attr("text-anchor","middle")
												.attr("font-weight", "bold")
												.attr("fill-opacity", g_Opacity_2015)
												.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")")
												.text(d.data.name.toUpperCase());
								
							g_domSVGMain_HDI.append("text")
												.attr("class", "interaction subfont perover60_vs_hdi_population_" + nSelectedYear_This + "_" + d.data.id)
												.attr("x", funcScaleX(getPercentageOver60(d.data, nSelectedYear_This)) + "mm")
												.attr("y", funcScaleY(d.data.hdi) + 4 + "mm")
												.attr("fill", g_colorBackground)
												.attr("font-size", g_nSVG_FontSize_Number_Hmm + "mm")
												.attr("text-anchor","middle")
												.attr("fill-opacity", g_Opacity_2015)
												.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")")
												.text(Math.round(getPopulationOver60(d.data, nSelectedYear_This) / 1000).toFixed(1) + "m");
								
							g_domSVGMain_HDI.append("text")
												.attr("class", "interaction subfont perover60_vs_hdi_percentage_" + nSelectedYear_This + "_" + d.data.id + " subfont")
												.attr("x", funcScaleX(getPercentageOver60(d.data, nSelectedYear_This)) + "mm")
												.attr("y", funcScaleY(d.data.hdi) + 18 + "mm")
												.attr("fill", g_colorBackground)
												.attr("font-size", g_nSVG_FontSize_Number_Hmm + "mm")
												.attr("text-anchor","middle")
												.attr("fill-opacity", g_Opacity_2015)
												.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")")
												.text(getPercentageOver60(d.data, nSelectedYear_This) + "%");
												*/

				        	funcDrawPopulation();
				        	funcDrawPercentage();
							//funcDrawPercentageOver60VSHDI();
							funcDrawTitle();
						})
						.on("mouseout", function (d) {
							
							d3.select(this)
								.attr("fill-opacity", getHDICircleOpacity(nSelectedYear_This));

							d3.select("text.perover60_vs_hdi_title_" + d.data.id)
								.attr("fill-opacity", g_Opacity_2015);
/*
							d3.select("text.perover60_vs_hdi_name_" + nSelectedYear_This + "_" + d.data.id).remove();
							d3.select("text.perover60_vs_hdi_population_" + nSelectedYear_This + "_" + d.data.id).remove();
							d3.select("text.perover60_vs_hdi_percentage_" + nSelectedYear_This + "_" + d.data.id).remove();
							*/
						})
					// -----------------------------------------------------------------------

								.attr("cx", function(d) { return funcScaleX(getPercentageOver60(d.data, nSelectedYear_Prev)) + "mm"; })
								.attr("cy", function(d) { return funcScaleY(d.data.hdi) + "mm"; })
								.attr("r", function(d) { return getCircleRadius_PopulationOver60(d.data, nSelectedYear_Prev) + "mm"; })
								.attr("fill", function(d) { return getCountryColor(d); })
								.attr("fill-opacity", getHDICircleOpacity(nSelectedYear_Prev))
								.attr("stroke", g_colorBackground)
								.attr("stroke-opacity", function(d) { return (isDrawStroke(d)) ? g_Opacity_World_2015 : 0.0; })
								.attr("stroke-width", 0.5 + "mm")
								.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")")
								// -----------------------------------------------------------------------
								.transition()
								.duration(500)
								// -----------------------------------------------------------------------
								.attr("cx", function(d) { return funcScaleX(getPercentageOver60(d.data, nSelectedYear_This)) + "mm"; })
								.attr("r", function(d) { return getCircleRadius_PopulationOver60(d.data, nSelectedYear_This) + "mm"; })
								.attr("fill-opacity", getHDICircleOpacity(nSelectedYear_This))

			g_domSVGMain_HDI_Circle_Title.enter()
							.append("text")
								.attr("class", function(d) { return "interaction perover60_vs_hdi_title perover60_vs_hdi_title_" + d.data.id; })
								.attr("x", function(d) { return funcScaleX(getPercentageOver60(d.data, nSelectedYear_Prev)) + "mm"; })
								.attr("y", function(d) { return funcScaleY(d.data.hdi) + 4 + "mm"; })
								.attr("fill", g_colorBackground)
								.attr("fill-opacity", g_Opacity_World_2015)
								.attr("font-size", g_nSVG_FontSize_Number_Hmm + "mm")
								.attr("text-anchor", "middle")
								.attr("font-weight", "bold")
								.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")")
								// -----------------------------------------------------------------------
								.transition()
								.duration(500)
								// -----------------------------------------------------------------------
								.attr("x", function(d) { return funcScaleX(getPercentageOver60(d.data, nSelectedYear_This)) + "mm"; })
								.text(function(d) { return d.data.name.toUpperCase(); });

			// ---------------------------

			g_nSelectedYear_Prev = g_nSelectedYear_This;
		}
		
	}

}

function getHDICircleOpacity(nYear)
{
	var fOpacity = 1.0;

	if (data != null)
	{
		switch (nYear)
		{
			case 2015: fOpacity = g_Opacity_2015; break;
			case 2030: fOpacity = (g_Opacity_2015 + g_Opacity_2050)/ 2; break;
			case 2050: fOpacity = g_Opacity_2050; break;
		}
	}

	return fOpacity;
}

function isDrawStroke(d)
{
	var bDraw = false;

	if (g_vsCircleText.includes(d.data.name) || d.data.id == g_nSelectedCountryID) 
		bDraw = true;

	return bDraw;
}
