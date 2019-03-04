
var g_fDrawMapValueMin = 0;
var g_fDrawMapValueMax = 0;

var g_colorWorldMap = "#009090";//"#15A6A6";//"DarkCyan"; 

var g_nSelectedCountryID = -1;

function funcDrawWorldMap() {

	var vsDisplayText = ["Taiwan", 
						"Japan", 
					    "China",
						"India", 
						"United States", 
						"Germany", 
						"Brazil", 
						"Australia"
						];
						//"Republic of Korea"];

	var nRotate = -15;//-150;//-10;//-150;

    var projection = d3.geoMercator()
				        //.translate([2750, 1350])
				        .rotate([nRotate,0,0])
				        .scale(500);

	var path = d3.geoPath().projection(projection);

	var tjWorld = g_tjWorld.filter(function(d) { if (d.data != null && d.data.life_expectancy > 0) return d;});

	var tjWorld_Display = tjWorld.filter(function(d) { if (vsDisplayText.includes(d.data.name)) return d; });

	g_fDrawMapValueMin = d3.min(tjWorld, function (d) { return d.data.life_expectancy; });
	g_fDrawMapValueMax = d3.max(tjWorld, function (d) { return d.data.life_expectancy; });

	g_funcScaleDrawMapOpacity = d3.scaleLinear()
								.domain([g_fDrawMapValueMin, g_fDrawMapValueMax])
								.range([0.1, 1.0]);

	var funcScaleDrawMapScale = d3.scaleLinear()
								.domain([g_fDrawMapValueMin, g_fDrawMapValueMax])
								.range([0.0, 100]);

	var nWpt = 290;
	var nHpt = 210;
	
	g_domSVGMain.selectAll("path.worldmap")
					.data(tjWorld)
					.enter()
					.append("path")
						.attr("d", path)
						.attr("class", "worldmap")
						.attr("id", function(d) { return getSVGContryMapID(d); })

						// -----------------------------------------------------------------------
					    .on("mousemove", function (d) {

					        d3.select("path.worldmap_fill_" + g_nSelectedCountryID)
								.attr("fill", g_colorWorldMap)
					        	.attr("stroke-width", 0.5 + "mm")
								.attr("stroke-opacity", 0.25);

							g_domSVGMain.select("text.worldmap_name_" + g_nSelectedCountryID).remove();
							g_domSVGMain.select("text.worldmap_life_expectancy_" + g_nSelectedCountryID).remove();

							// ----------

							g_nSelectedCountryID = d.data.id;

					        d3.select(this)
								.attr("class", "worldmap_fill_" + g_nSelectedCountryID)
								.attr("fill", function(d) { return getCountryColor(d); })
								.attr("stroke", getCountryColor)
					        	.attr("stroke-width", 1.5 + "mm")
								.attr("stroke-opacity", 1.00);
								
							var nMouseX = d3.mouse(this)[0];  
							var nMouseY = d3.mouse(this)[1];  

							g_domSVGMain
								.append("text")
									.attr("class", "worldmap_name_" + g_nSelectedCountryID)
									.attr("x", nMouseX + 60)
									.attr("y", nMouseY + 90)
									.attr("font-size", g_nSVG_FontSize_Country_Hmm + "mm")
									.attr("text-anchor", "front")
									.attr("font-weight", "bold")
									.attr("fill", g_colorBackground)
									.attr("fill-opacity", g_Opacity_World_2015)
									.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")")
				        			.text(d.data.name.toUpperCase());

							g_domSVGMain
								.append("text")
									.attr("class", "worldmap_life_expectancy_" + g_nSelectedCountryID + " subfont")
									.attr("x", nMouseX + 60)
									.attr("y", nMouseY + g_nSVG_FontSize_Country_Hmm + 120)
									.attr("font-size", g_nSVG_FontSize_Number_Hmm + "mm")
									.attr("text-anchor", "front")
									.attr("fill", g_colorBackground)
									.attr("fill-opacity", g_Opacity_World_2015)
									.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")")
				        			.text(d.data.life_expectancy);

				        	funcDrawPopulation();
				        	funcDrawPercentage();
							funcDrawPercentageOver60VSHDI();
							funcDrawTitle();
					    })
					    .on("mouseout", function (d) {

					        d3.select(this)
								.attr("fill", g_colorWorldMap)
								.attr("stroke", g_colorBackground_Draw)
					        	.attr("stroke-width", 0.5 + "mm")
								.attr("stroke-opacity", 0.25);
				
							g_domSVGMain.select("text.worldmap_name_" + d.data.id).remove();
							g_domSVGMain.select("text.worldmap_life_expectancy_" + d.data.id).remove();
								
					    })
						
                		// -----------------------------------------------------------------------

						.attr("fill", getWorldMapColor)
						.attr("fill-opacity", function(d) { return g_funcScaleDrawMapOpacity(d.data.life_expectancy); })
						.attr("stroke", g_colorBackground_Draw)
						.attr("stroke-width", 0.5 + "mm")
						.attr("stroke-opacity", 0.25)
						.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")");

/*
	g_domSVGMain.append("text")
						.attr("fill", "Crimson")//"#00314F")
						.attr("x", 260 + "mm")
						.attr("y", 130 + "mm")
						.attr("font-size", "16mm")
						.attr("text-anchor", "middle")
						.attr("fill", "#666666")
						.attr("fill-opacity", 0.90)
						.attr("transform", "translate(" + funcGetWpt(290) + ", " + funcGetHpt(210) + ")")
	        			.text("LIFE EXPECTANCY 2015");

*/

	g_domSVGMain.append("rect")
	        		.attr("x", g_nSVG_Padding_mm + "mm")
	        		.attr("y", 0 + "mm")
		    		.attr("width", g_nSVG_Draw_Wmm + "mm")
		    		.attr("height", g_nSVG_Padding_mm /*+ g_nSVG_Title_Hmm*/ + "mm")
		    		.attr("fill", g_colorBackground);

	g_domSVGMain.append("rect")
	        		.attr("x", 0 + "mm")
	        		.attr("y", 0 + "mm")
		    		.attr("width", g_nSVG_Padding_mm + "mm")
		    		.attr("height", g_nSVG_Hmm + "mm")
		    		.attr("fill", g_colorBackground);

	g_domSVGMain.append("rect")
	        		.attr("x", (g_nSVG_Wmm - g_nSVG_Padding_mm)+ "mm")
	        		.attr("y", 0 + "mm")
		    		.attr("width", g_nSVG_Padding_mm + "mm")
		    		.attr("height", g_nSVG_Hmm + "mm")
		    		.attr("fill", g_colorBackground);

	var nTop = 120;
	var nBottom = 320;

	g_domSVGMain.append("path")
	        		.attr('d', function(d) { 

				      	return "M " + funcGetWpt(g_nSVG_Wmm - g_nSVG_Padding_mm) + " " + funcGetHpt(nTop) + " " + 
				      		   "L " + funcGetWpt(g_nSVG_Wmm - g_nSVG_Padding_mm) + " " + funcGetHpt(nBottom)+ " " + 
				      		   "L " + funcGetWpt(g_nSVG_Wmm - g_nSVG_Padding_mm - ((nBottom - nTop)/ 2)) + " " + funcGetHpt((nTop + nBottom)/ 2) + " " + 
				      		   "L " + funcGetWpt(g_nSVG_Wmm - g_nSVG_Padding_mm) + " " + funcGetHpt(nTop) + " ";
						    })
		    		.attr("fill", g_colorBackground);

	g_domSVGMain.append("path")
	        		.attr('d', function(d) { 

				      	return "M " + funcGetWpt(g_nSVG_Wmm - g_nSVG_Padding_mm) + " " + funcGetHpt(nBottom) + " " + 
				      		   "L " + funcGetWpt(g_nSVG_Wmm - g_nSVG_Padding_mm) + " " + funcGetHpt(nBottom - 40)+ " " + 
							   "L " + funcGetWpt(g_nSVG_Wmm - g_nSVG_Padding_mm - 40) + " " + funcGetHpt(nBottom - 40)+ " " + 
				      		   "L " + funcGetWpt(g_nSVG_Wmm - g_nSVG_Padding_mm) + " " + funcGetHpt(nBottom);
						    })
		    		.attr("fill", g_colorBackground_Draw);

	g_domSVGMain.append("path")
	        		.attr('d', function(d) { 

				      	return "M " + funcGetWpt(g_nSVG_Wmm - g_nSVG_Padding_mm) + " " + funcGetHpt(nBottom) + " " + 
				      		   "L " + funcGetWpt(g_nSVG_Wmm - g_nSVG_Padding_mm) + " " + funcGetHpt(nBottom - 40)+ " " + 
							   "L " + funcGetWpt(g_nSVG_Wmm - g_nSVG_Padding_mm - 40) + " " + funcGetHpt(nBottom - 40)+ " " + 
				      		   "L " + funcGetWpt(g_nSVG_Wmm - g_nSVG_Padding_mm) + " " + funcGetHpt(nBottom);
						    })
		    		.attr("fill-opacity", g_Opacity_2050)
		    		.attr("fill", g_colorBackground);

	g_domSVGMain.append("text")
						.attr("x", (g_nSVG_Wmm - g_nSVG_Padding_mm) + "mm")
						.attr("y", funcGetHpt(((nBottom + nTop)/ 2) - g_nSVG_FontSize_Title_Hmm_Sub + 7))
						.attr("fill", g_colorBackground_Draw)
						.attr("font-size", g_nSVG_FontSize_Title_Hmm_Sub + "mm")
						.attr("text-anchor", "end")
						.attr("font-weight", "bold")
						.attr("fill-opacity", g_Opacity_World_2015)
	        			.text("LIFE");

	g_domSVGMain.append("text")
						.attr("x", (g_nSVG_Wmm - g_nSVG_Padding_mm) + "mm")
						.attr("y", funcGetHpt(((nBottom + nTop)/ 2) + 7))
						.attr("fill", g_colorBackground_Draw)
						.attr("font-size", g_nSVG_FontSize_Title_Hmm_Sub + "mm")
						.attr("text-anchor", "end")
						.attr("font-weight", "bold")
						.attr("fill-opacity", g_Opacity_World_2015)
	        			.text("EXPECT-");

	g_domSVGMain.append("text")
						.attr("x", (g_nSVG_Wmm - g_nSVG_Padding_mm) + "mm")
						.attr("y", funcGetHpt(((nBottom + nTop)/ 2) + g_nSVG_FontSize_Title_Hmm_Sub + 7))
						.attr("fill", g_colorBackground_Draw)
						.attr("font-size", g_nSVG_FontSize_Title_Hmm_Sub + "mm")
						.attr("text-anchor", "end")
						.attr("font-weight", "bold")
						.attr("fill-opacity", g_Opacity_World_2015)
	        			.text("ANCY");

	g_domSVGMain.append("text")
						.attr("class", "subfont")
						.attr("x", (g_nSVG_Wmm - g_nSVG_Padding_mm) + "mm")
						.attr("y", funcGetHpt(((nBottom + nTop)/ 2) + (g_nSVG_FontSize_Title_Hmm_Sub * 2.5) + 5))
						.attr("fill", g_colorBackground_Draw)
						.attr("font-size", g_nSVG_FontSize_Number_Hmm + "mm")
						.attr("text-anchor", "end")
						.attr("fill-opacity", g_Opacity_World_2015)
						.attr("text-decoration", "underline")
	        			.text(2015);
}

function getSVGContryMapID(d)
{
	var id = 0;

	if (d.data != null)
	{
		id = d.data.id;
	}
		
	return g_sID_SVG_poster + "_worldmap_" + id;
}

function getWorldMapColor(d) {

	color = g_colorWorldMap;

	if (d.data.name == "Taiwan")
		color = g_colorTaiwan;//"Gold";

	return color;

}
