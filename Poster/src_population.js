
var g_fDrawPopulationCircleValueMin = 0;
var g_fDrawPopulationCircleValueMax = 0;

var g_funcScalePopulationCircle = null;

function funcDrawPopulation() {

	var vsDisplayText = ["Taiwan", 
						"Japan", 
					    "China",
						"India", 
						"United States", 
						"Bangladesh"
						];

	var nCountryCount = vsDisplayText.length;

	d3.select(".population").remove(); 

	var domSVGMain_Population = g_domSVGMain.append("g").
												attr("class", "population");

	var tjWorld_Population = g_tjWorld
								//.filter(function(d) { if (d.data != null) return d; })
								.filter(function(d) { if (d.data != null && vsDisplayText.includes(d.data.name)) return d; })
								.sort(function(a, b) { return d3.descending(a.data.population_over_60.Y2050, b.data.population_over_60.Y2050); })
								.slice(0, nCountryCount);

	//var tjWorld_Population_Selected = g_tjWorld.filter(function(d) { if (d.data != null && d.data.name == "Taiwan") return d; });
	var tjWorld_Population_Selected = g_tjWorld.filter(function(d) { if (d.data != null && d.data.id == g_nSelectedCountryID) return d; });

	var nWorld_Population_2015 = d3.sum(g_tjWorld, function(d){ if (d.data != null) return d.data.population_over_60.Y2015; });
	var nWorld_Population_2050 = d3.sum(g_tjWorld, function(d){ if (d.data != null) return d.data.population_over_60.Y2050; });

	var vnYear = [2015, 2050];

	var n2015 = 0;
	var n2050 = 1;

	g_fDrawPopulationCircleValueMin = d3.min(tjWorld_Population, function (d) { return d.data.population_over_60.Y2015; });
	g_fDrawPopulationCircleValueMax = d3.max(tjWorld_Population, function (d) { return d.data.population_over_60.Y2050; });

	g_funcScalePopulationCircle = d3.scaleLinear()
									.domain([g_fDrawPopulationCircleValueMin, g_fDrawPopulationCircleValueMax])
									.range([g_fDrawPopulationCircleValueMin / 35, g_fDrawPopulationCircleValueMax / 35]);

	var Population_First = tjWorld_Population.slice(0, 1)[0]

	var nRadius_First = getCircleRadius_PopulationOver60(Population_First.data, 2015);
	var nRadius_World_2015 = (Math.sqrt(g_funcScalePopulationCircle(nWorld_Population_2015) / Math.PI));
	var nRadius_World_2050 = (Math.sqrt(g_funcScalePopulationCircle(nWorld_Population_2050) / Math.PI));

	var funcScaleX = d3.scaleLinear()
					.domain([0, nCountryCount])
					.range([g_nSVG_Padding_mm + (g_nSVG_Grid_mm * 6), 
							g_nSVG_Wmm - g_nSVG_Padding_mm - (g_nSVG_Grid_mm * 4)]);//.range([0, g_nSVG_Wmm - (g_nSVG_Padding_mm * 2)]);		
	
	var nWpt = 0;
	var nHpt = 520;

	// --------------

	// circle
	{
		domSVGMain_Population.append("circle")
							.attr("class", "countries_populationover60_world_2050")
							.attr("cx", funcScaleX(-1) + "mm")
							.attr("cy", nRadius_First - nRadius_World_2050 + "mm") 
							.attr("r", nRadius_World_2050 + "mm")
							.attr("fill", g_colorBackground)
							.attr("fill-opacity", g_Opacity_2050)
							.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")");

		domSVGMain_Population.append("circle")
							.attr("class", "countries_populationover60_world_2015")
							.attr("cx", funcScaleX(-1) + "mm")
							.attr("cy", nRadius_First - nRadius_World_2050 + "mm") 
							.attr("r", nRadius_World_2015 + "mm")
							.attr("fill", g_colorBackground)
							.attr("fill-opacity", g_Opacity_World_2015)
							.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")");
		
		// -------------

		domSVGMain_Population.selectAll("circle.countries_populationover60_country_2050")
						.data(tjWorld_Population)
						.enter()
						.append("circle")
							.attr("class", "countries_populationover60_country_2050")
							.attr("cx", function(d, i) { return funcScaleX(i) + "mm"} )
							.attr("cy", nRadius_First - nRadius_World_2050 + "mm") 
							.attr("r", function(d) { return getCircleRadius_PopulationOver60(d.data, vnYear[n2050]) + "mm"; })
							.attr("fill", function(d) { return getCountryColor(d); })
							.attr("fill-opacity", g_Opacity_2050)
							.attr("transform", "translate(" + funcGetWpt(nWpt)  + ", " + funcGetHpt(nHpt) + ")");

		domSVGMain_Population.selectAll("circle.countries_populationover60_country_2015")
						.data(tjWorld_Population)
						.enter()
						.append("circle")
							.attr("class", "countries_populationover60_2015")
							.attr("cx", function(d, i) { return funcScaleX(i) + "mm"} )
							.attr("cy", nRadius_First - nRadius_World_2050 + "mm") 
							.attr("r", function(d) { return getCircleRadius_PopulationOver60(d.data, vnYear[n2015]) + "mm"; })
							.attr("fill", function(d) { return getCountryColor(d); })
							.attr("fill-opacity", g_Opacity_2015)
							.attr("transform", "translate(" + funcGetWpt(nWpt)  + ", " + funcGetHpt(nHpt) + ")");
		
		// -------------

		domSVGMain_Population.selectAll("circle.countries_populationover60_selected_2050")
						.data(tjWorld_Population_Selected)
						.enter()
						.append("circle")
							.attr("class", "countries_populationover60_selected_2050")
							.attr("cx", function(d, i) { return funcScaleX(nCountryCount) + "mm"} )
							.attr("cy", nRadius_First - nRadius_World_2050 + "mm") 
							.attr("r", function(d) { return getCircleRadius_PopulationOver60(d.data, vnYear[n2050]) + "mm"; })
							.attr("fill", function(d) { return getCountryColor(d); })
							.attr("fill-opacity", g_Opacity_2050)
							.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")");

		domSVGMain_Population.selectAll("circle.countries_populationover60_selected_2015")
						.data(tjWorld_Population_Selected)
						.enter()
						.append("circle")
							.attr("class", "countries_populationover60_selected_2015")
							.attr("cx", function(d, i) { return funcScaleX(nCountryCount) + "mm"} )
							.attr("cy", nRadius_First - nRadius_World_2050 + "mm") 
							.attr("r", function(d) { return getCircleRadius_PopulationOver60(d.data, vnYear[n2015]) + "mm"; })
							.attr("fill", function(d) { return getCountryColor(d); })
							.attr("fill-opacity", g_Opacity_2015)
							.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")");
	}

	// -------------
	
	// text
	{
		for (var nRank = 1; nRank <= 3; nRank++)
		{
			domSVGMain_Population
						.append("text")
							.attr("class", "subfont")
							.attr("x", funcScaleX(nRank - 1) + "mm")
							.attr("y", (nRadius_First - nRadius_World_2050 + 4) + "mm") 
							.attr("fill", g_colorBackground_Draw)
							.attr("font-size", g_nSVG_FontSize_Country_Hmm + "mm")
							.attr("text-anchor", "middle")
							.attr("font-weight", "bold")
							.attr("fill-opacity", g_Opacity_World_2015)
							.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")")
		        			.text(nRank);
		}

		domSVGMain_Population.selectAll("text.countries_populationover60_country")
					.data(tjWorld_Population)
					.enter()
					.append("text")
						.attr("class", "countries_populationover60_country")
						.attr("x", function(d, i) { return funcScaleX(i) + "mm"} )
						.attr("y", (nRadius_First - nRadius_World_2050) + 47 + "mm") 
						.attr("fill", g_colorBackground)
						.attr("font-size", g_nSVG_FontSize_Country_Hmm + "mm")
						.attr("text-anchor", "middle")
						.attr("font-weight", "bold")
						.attr("fill-opacity", g_Opacity_World_2015)
						.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")")
	        			.text(function(d) { return d.data.name.toUpperCase(); } );
						
		domSVGMain_Population.selectAll("text.countries_populationover60_country_2015")
						.data(tjWorld_Population)
						.enter()
						.append("text")
							.attr("class", "countries_populationover60_country_2015 subfont")
							.attr("x", function(d, i) { return funcScaleX(i) + "mm"} )
							.attr("y", (nRadius_First - nRadius_World_2050) + 65 + "mm") 
							.attr("fill", g_colorBackground)
							.attr("font-size", g_nSVG_FontSize_Number_Hmm + "mm")
							.attr("text-anchor", "middle")
							.attr("fill-opacity", g_Opacity_World_2015)
							.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")")
							.text(function(d) { return Math.round(getPopulationOver60(d.data, 2015) / 1000).toFixed(1) + "m"; } );
							
		domSVGMain_Population.selectAll("text.countries_populationover60_country_2050")
						.data(tjWorld_Population)
						.enter()
						.append("text")
							.attr("class", "countries_populationover60_country_2050 subfont")
							.attr("x", function(d, i) { return funcScaleX(i) + "mm"} )
							.attr("y", (nRadius_First - nRadius_World_2050) + 80 + "mm") 
							.attr("fill", g_colorBackground)
							.attr("font-size", g_nSVG_FontSize_Number_Hmm + "mm")
							.attr("text-anchor", "middle")
							.attr("fill-opacity", g_Opacity_World_2050)
							.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")")
							.text(function(d) { return Math.round(getPopulationOver60(d.data, 2050) / 1000).toFixed(1) + "m"; } );			

		domSVGMain_Population.selectAll("text.countries_populationover60_selected")
						.data(tjWorld_Population_Selected)
						.enter()
						.append("text")
							.attr("class", "countries_populationover60_selected")
							.attr("x", function(d, i) { return funcScaleX(nCountryCount) + "mm"} )
							.attr("y", (nRadius_First - nRadius_World_2050) + 47 + "mm") 
							.attr("fill", g_colorBackground)
							.attr("font-size", g_nSVG_FontSize_Country_Hmm + "mm")
							.attr("text-anchor", "middle")
							.attr("font-weight", "bold")
							.attr("fill-opacity", g_Opacity_World_2015)
							.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")")
							.text(function(d) { return d.data.name.toUpperCase(); } );
							
		domSVGMain_Population.selectAll("text.countries_populationover60_selected_2015")
						.data(tjWorld_Population_Selected)
						.enter()
						.append("text")
							.attr("class", "countries_populationover60_selected_2015 subfont")
							.attr("x", function(d, i) { return funcScaleX(nCountryCount) + "mm"} )
							.attr("y", (nRadius_First - nRadius_World_2050) + 65 + "mm") 
							.attr("fill", g_colorBackground)
							.attr("font-size", g_nSVG_FontSize_Number_Hmm + "mm")
							.attr("text-anchor", "middle")
							.attr("fill-opacity", g_Opacity_World_2015)
							.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")")
							.text(function(d) { return Math.round(getPopulationOver60(d.data, 2015) / 1000).toFixed(1) + "m"; } );
							
		domSVGMain_Population.selectAll("text.countries_populationover60_selected_2050")
						.data(tjWorld_Population_Selected)
						.enter()
						.append("text")
							.attr("class", "countries_populationover60_selected_2050 subfont")
							.attr("x", function(d, i) { return funcScaleX(nCountryCount) + "mm"} )
							.attr("y", (nRadius_First - nRadius_World_2050) + 80 + "mm") 
							.attr("fill", g_colorBackground)
							.attr("font-size", g_nSVG_FontSize_Number_Hmm + "mm")
							.attr("text-anchor", "middle")
							.attr("fill-opacity", g_Opacity_World_2050)
							.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")")
							.text(function(d) { return Math.round(getPopulationOver60(d.data, 2050) / 1000).toFixed(1) + "m"; } );

	}	
	
	// -------------

	domSVGMain_Population.append("text")
						.attr("x", g_nSVG_Padding_mm + "mm")
						.attr("y", -(g_nSVG_Grid_mm * 6.5) + "mm") 
						.attr("fill", g_colorBackground_Draw)
						.attr("font-size", g_nSVG_FontSize_Title_Hmm_Sub + "mm")
						.attr("text-anchor", "front")
						.attr("font-weight", "bold")
						.attr("fill-opacity", g_Opacity_World_2015)
						.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")")
	        			.text("POP. of");

	domSVGMain_Population.append("text")
						.attr("x", g_nSVG_Padding_mm + "mm")
						.attr("y", -(g_nSVG_Grid_mm * 6.5 - g_nSVG_FontSize_Title_Hmm_Sub) + "mm") 
						.attr("fill", g_colorBackground_Draw)
						.attr("font-size", g_nSVG_FontSize_Title_Hmm_Sub + "mm")
						.attr("text-anchor", "front")
						.attr("font-weight", "bold")
						.attr("fill-opacity", g_Opacity_World_2015)
						.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")")
	        			.text("AGE > 60");
						
	domSVGMain_Population.append("text")
						.attr("x", funcScaleX(-1) + "mm")
						.attr("y", (nRadius_First - nRadius_World_2050) + 47 + "mm") 
						.attr("fill", g_colorBackground_Draw)
						.attr("font-size", g_nSVG_FontSize_Country_Hmm + "mm")
						.attr("text-anchor", "middle")
						.attr("font-weight", "bold")
						.attr("fill-opacity", g_Opacity_World_2015)
						.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")")
						.text("WORLD");
						
	domSVGMain_Population.append("text")
						.attr("class", "subfont")
						.attr("x", funcScaleX(-1) + "mm")
						.attr("y", (nRadius_First - nRadius_World_2050) - 125 + "mm") 
						.attr("fill", g_colorBackground_Draw)
						.attr("font-size", g_nSVG_FontSize_Number_Hmm + "mm")
						.attr("text-anchor", "middle")
						.attr("fill-opacity", g_Opacity_World_2015)
						.attr("text-decoration", "underline")
						.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")")
						.text(vnYear[n2050]);
						
	domSVGMain_Population.append("text")
						.attr("class", "subfont")
						.attr("x", funcScaleX(-1) + "mm")
						.attr("y", (nRadius_First - nRadius_World_2050) - 75 + "mm") 
						.attr("fill", g_colorBackground_Draw)
						.attr("font-size", g_nSVG_FontSize_Number_Hmm + "mm")
						.attr("text-anchor", "middle")
						.attr("fill-opacity", g_Opacity_World_2015)
						.attr("text-decoration", "underline")
						.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")")
						.text(vnYear[n2015]);
						
	domSVGMain_Population.append("text")
						.attr("class", "subfont")
						.attr("x", funcScaleX(-1) + "mm")
						.attr("y", (nRadius_First - nRadius_World_2050) + 75 + 5 + "mm") 
						.attr("fill", g_colorBackground_Draw)
						.attr("font-size", g_nSVG_FontSize_Number_Hmm + "mm")
						.attr("text-anchor", "middle")
						.attr("fill-opacity", g_Opacity_World_2015)
						.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")")
	        			.text((nWorld_Population_2050 / 1000).toFixed(1) + "m");
						
	domSVGMain_Population.append("text")
						.attr("class", "subfont")
						.attr("x", funcScaleX(-1) + "mm")
						.attr("y", (nRadius_First - nRadius_World_2050) + 125 + 5 + "mm") 
						.attr("fill", g_colorBackground_Draw)
						.attr("font-size", g_nSVG_FontSize_Number_Hmm + "mm")
						.attr("text-anchor", "middle")
						.attr("fill-opacity", g_Opacity_World_2015)
						.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")")
	        			.text((nWorld_Population_2015 / 1000).toFixed(1) + "m");


}

function getPopulationOver60(data, nYear)
{
	var nPopulation = 0;

	if (data != null)
	{
		switch (nYear)
		{
			case 2015: nPopulation = data.population_over_60.Y2015; break;
			case 2030: nPopulation = data.population_over_60.Y2030; break;
			case 2050: nPopulation = data.population_over_60.Y2050; break;
		}
	}

	return nPopulation;
}


function getCircleRadius_PopulationOver60(data, nYear)
{
	var nRadius = 0;

	if (data != null)
	{
		nPupulation = getPopulationOver60(data, nYear);

		nRadius = Math.sqrt(g_funcScalePopulationCircle(nPupulation) / Math.PI);
	}

	return nRadius;
}
