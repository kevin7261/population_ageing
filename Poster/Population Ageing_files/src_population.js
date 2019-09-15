
var g_fDrawPopulationCircleValueMin = 0;
var g_fDrawPopulationCircleValueMax = 0;

var g_funcScalePopulationCircle = null;

function funcDrawPopulation() {

	var nCountryCount = 7;

	var tjWorld_Population = g_tjWorld
								.filter(function(d) { if (d.data != null) return d; })
								.sort(function(a, b) { return d3.descending(a.data.population_over_60.Y2050, b.data.population_over_60.Y2050); })
								.slice(0, nCountryCount);

	console.log(tjWorld_Population);

	var tjWorld_Population_Taiwan = g_tjWorld.filter(function(d) { if (d.data != null && d.data.name == "Taiwan") return d; });

	var nWorld_Population_2015 = d3.sum(g_tjWorld, function(d){ if (d.data != null) return d.data.population_over_60.Y2015; });
	var nWorld_Population_2050 = d3.sum(g_tjWorld, function(d){ if (d.data != null) return d.data.population_over_60.Y2050; });

	var vnYear = [2015, 2050];

	var n2015 = 0;
	var n2050 = 1;

	g_fDrawPopulationCircleValueMin = d3.min(tjWorld_Population, function (d) { return d.data.population_over_60.Y2015; });
	g_fDrawPopulationCircleValueMax = d3.max(tjWorld_Population, function (d) { return d.data.population_over_60.Y2050; });

	console.log(g_fDrawPopulationCircleValueMin);
	console.log(g_fDrawPopulationCircleValueMax);

	g_funcScalePopulationCircle = d3.scaleLinear()
									.domain([g_fDrawPopulationCircleValueMin, g_fDrawPopulationCircleValueMax])
									.range([g_fDrawPopulationCircleValueMin / 40, g_fDrawPopulationCircleValueMax / 40]);


	var Population_First = tjWorld_Population.slice(0, 1)[0]

	var nRadius_First = getCircleRadius_PopulationOver60(Population_First.data, 2015);
	var nRadius_World_2015 = (Math.sqrt(g_funcScalePopulationCircle(nWorld_Population_2015) / Math.PI));
	var nRadius_World_2050 = (Math.sqrt(g_funcScalePopulationCircle(nWorld_Population_2050) / Math.PI));

	var funcScaleX = d3.scaleLinear()
					.domain([1, nCountryCount + 1])
					.range([0, g_nSVG_Wmm - (g_nSVG_Padding_mm * 2) - (nRadius_World_2050 * 2)]);//.range([0, g_nSVG_Wmm - (g_nSVG_Padding_mm * 2)]);		
	
	var funcScaleY = 500; 

	// -------------

	g_domSVGMain.append("circle")
						.attr("class", "countries_populationover60_world_" + vnYear[n2050])
						.attr("cx", nRadius_World_2050 + funcScaleX(1) + "mm")
						.attr("cy", nRadius_First - nRadius_World_2050 + "mm") 
						.attr("r", nRadius_World_2050 + "mm")
						.attr("fill", "#999999")
						.attr("fill-opacity", 0.10)
						.attr("stroke", "#999999")
						.attr("stroke-width", "0.5mm")
						.attr("stroke-opacity", 1.00)
						.attr("transform", "translate(" + funcGetWpt(g_nSVG_Padding_mm) + ", " + funcGetHpt(800) + ")");

	g_domSVGMain.append("circle")
						.attr("class", "countries_populationover60_world_" + vnYear[n2015])
						.attr("cx", nRadius_World_2050 + funcScaleX(1) + "mm")
						.attr("cy", nRadius_First - nRadius_World_2015 + "mm") 
						.attr("r", nRadius_World_2015 + "mm")
						.attr("fill", "#999999")
						.attr("fill-opacity", 0.50)
						.attr("transform", "translate(" + funcGetWpt(g_nSVG_Padding_mm) + ", " + funcGetHpt(800) + ")");
	
	// -------------

	g_domSVGMain.selectAll("circle.countries_populationover60_country_" + vnYear[n2050])
					.data(tjWorld_Population)
					.enter()
					.append("circle")
						.attr("class", "countries_populationover60_country_" + vnYear[n2050])
						.attr("cx", function(d, i) { return nRadius_World_2050 + funcScaleX(i + 1) + "mm"} )
						.attr("cy", function(d) { return (nRadius_First - getCircleRadius_PopulationOver60(d.data, vnYear[n2050])) + "mm"; }) 
						.attr("r", function(d) { return getCircleRadius_PopulationOver60(d.data, vnYear[n2050]) + "mm"; })
						.attr("fill", function(d) { return getCountryColor(d.data); })
						.attr("fill-opacity", 0.10)
						.attr("stroke", function(d) { return getCountryColor(d.data); })
						.attr("stroke-width", "0.5mm")
						.attr("stroke-opacity", 1.00)
						.attr("transform", "translate(" + funcGetWpt(g_nSVG_Padding_mm)  + ", " + funcGetHpt(800) + ")");

	g_domSVGMain.selectAll("circle.countries_populationover60_country_" + vnYear[n2015])
					.data(tjWorld_Population)
					.enter()
					.append("circle")
						.attr("class", "countries_populationover60_" + vnYear[n2015])
						.attr("cx", function(d, i) { return nRadius_World_2050 + funcScaleX(i + 1) + "mm"} )
						.attr("cy", function(d) { return (nRadius_First - getCircleRadius_PopulationOver60(d.data, vnYear[n2015])) + "mm"; }) 
						.attr("r", function(d) { return getCircleRadius_PopulationOver60(d.data, vnYear[n2015]) + "mm"; })
						.attr("fill", function(d) { return getCountryColor(d.data); })
						.attr("fill-opacity", 0.50)
						.attr("transform", "translate(" + funcGetWpt(g_nSVG_Padding_mm)  + ", " + funcGetHpt(800) + ")");
	
	// -------------

	g_domSVGMain.selectAll("circle.countries_populationover60_taiwan_" + vnYear[n2050])
					.data(tjWorld_Population_Taiwan)
					.enter()
					.append("circle")
						.attr("class", "countries_populationover60_taiwan_" + vnYear[n2050])
						.attr("cx", function(d, i) { return nRadius_World_2050 + funcScaleX(nCountryCount + 1) + "mm"} )
						.attr("cy", function(d, i) { return (nRadius_First - getCircleRadius_PopulationOver60(d.data, vnYear[n2050])) + "mm"; }) 
						.attr("r", function(d) { return getCircleRadius_PopulationOver60(d.data, vnYear[n2050]) + "mm"; })
						.attr("fill", function(d) { return getCountryColor(d.data); })
						.attr("fill-opacity", 0.10)
						.attr("stroke", function(d) { return getCountryColor(d.data); })
						.attr("stroke-width", "0.5mm")
						.attr("stroke-opacity", 1.00)
						.attr("transform", "translate(" + funcGetWpt(g_nSVG_Padding_mm) + ", " + funcGetHpt(800) + ")");

	g_domSVGMain.selectAll("circle.countries_populationover60_taiwan_" + vnYear[n2015])
					.data(tjWorld_Population_Taiwan)
					.enter()
					.append("circle")
						.attr("class", "countries_populationover60_taiwan_" + vnYear[n2015])
						.attr("cx", function(d, i) { return nRadius_World_2050 + funcScaleX(nCountryCount + 1) + "mm"} )
						.attr("cy", function(d, i) { return (nRadius_First - getCircleRadius_PopulationOver60(d.data, vnYear[n2015])) + "mm"; }) 
						.attr("r", function(d) { return getCircleRadius_PopulationOver60(d.data, vnYear[n2015]) + "mm"; })
						.attr("fill", function(d) { return getCountryColor(d.data); })
						.attr("fill-opacity", 0.50)
						.attr("transform", "translate(" + funcGetWpt(g_nSVG_Padding_mm) + ", " + funcGetHpt(800) + ")");

	// -------------

	g_domSVGMain.append("text")
						.attr("class", "countries_populationover60_world")
						.attr("x", nRadius_World_2050 + funcScaleX(1) + "mm")
						.attr("y", nRadius_First - (nRadius_World_2050 * 2) - 15 + "mm") 
						.attr("fill", "#999999")//"#00314F")
						.attr("font-size", "12mm")
						.attr("text-anchor", "middle")
						.attr("fill-opacity", 0.90)
						.attr("transform", "translate(" + funcGetWpt(g_nSVG_Padding_mm) + ", " + funcGetHpt(800) + ")")
	        			.text("World");

	g_domSVGMain.append("text")
						.attr("class", "countries_populationover60_world_" + vnYear[n2050])
						.attr("x", nRadius_World_2050 + funcScaleX(1) + "mm")
						.attr("y", nRadius_First - (nRadius_World_2050 * 2) + 25 + "mm") 
						.attr("fill", "#999999")//"#00314F")
						.attr("font-size", "12mm")
						.attr("text-anchor", "middle")
						.attr("fill-opacity", 0.90)
						.attr("transform", "translate(" + funcGetWpt(g_nSVG_Padding_mm) + ", " + funcGetHpt(800) + ")")
	        			.text(vnYear[n2050]);

	g_domSVGMain.append("text")
						.attr("class", "countries_populationover60_world_" + vnYear[n2050])
						.attr("x", nRadius_World_2050 + funcScaleX(1) + "mm")
						.attr("y", nRadius_First - (nRadius_World_2050 * 2) + 40 + "mm") 
						.attr("fill", "#999999")//"#00314F")
						.attr("font-size", "8mm")
						.attr("text-anchor", "middle")
						.attr("fill-opacity", 0.50)
						.attr("transform", "translate(" + funcGetWpt(g_nSVG_Padding_mm) + ", " + funcGetHpt(800) + ")")
	        			.text((nWorld_Population_2050 / 1000).toFixed(1) + "m");

	g_domSVGMain.append("text")
						.attr("class", "countries_populationover60_world_" + vnYear[n2015])
						.attr("x", nRadius_World_2050 + funcScaleX(1) + "mm")
						.attr("y", nRadius_First - (nRadius_World_2050 * 2) + 110 + "mm") 
						.attr("fill", "#FFFFFF")//"#00314F")
						.attr("font-size", "12mm")
						.attr("text-anchor", "middle")
						.attr("fill-opacity", 0.90)
						.attr("transform", "translate(" + funcGetWpt(g_nSVG_Padding_mm) + ", " + funcGetHpt(800) + ")")
	        			.text(vnYear[n2015]);

	g_domSVGMain.append("text")
						.attr("class", "countries_populationover60_world_" + vnYear[n2015])
						.attr("x", nRadius_World_2050 + funcScaleX(1) + "mm")
						.attr("y", nRadius_First - (nRadius_World_2050 * 2) + 125 + "mm") 
						.attr("fill", "#FFFFFF")//"#00314F")
						.attr("font-size", "8mm")
						.attr("text-anchor", "middle")
						.attr("fill-opacity", 0.50)
						.attr("transform", "translate(" + funcGetWpt(g_nSVG_Padding_mm) + ", " + funcGetHpt(800) + ")")
	        			.text((nWorld_Population_2015 / 1000).toFixed(1) + "m");

	// -------------

	g_domSVGMain.selectAll("text.countries_populationover60_country")
					.data(tjWorld_Population)
					.enter()
					.append("text")
						.attr("class", "countries_populationover60_country")
						.attr("x", function(d, i) { return nRadius_World_2050 + funcScaleX(i + 1) + "mm"} )
						.attr("y", function(d) { return nRadius_First + 20 + "mm"; }) 
						.attr("fill", function(d) { return getCountryColor(d.data); })//"#00314F")
						.attr("font-size", "8mm")
						.attr("text-anchor", "middle")
						.attr("fill-opacity", 0.90)
						.attr("transform", "translate(" + funcGetWpt(g_nSVG_Padding_mm) + ", " + funcGetHpt(800) + ")")
	        			.text(function(d) { return d.data.name; } );

	// -------------

	g_domSVGMain.selectAll("text.countries_populationover60_taiwan")
					.data(tjWorld_Population_Taiwan)
					.enter()
					.append("text")
						.attr("class", "countries_populationover60_taiwan")
						.attr("x", function(d, i) { return nRadius_World_2050 + funcScaleX(nCountryCount + 1) + "mm"} )
						.attr("y", function(d) { return nRadius_First + 20 + "mm"; }) 
						.attr("fill", function(d) { return getCountryColor(d.data); })//"#00314F")
						.attr("font-size", "8mm")
						.attr("text-anchor", "middle")
						.attr("fill-opacity", 0.90)
						.attr("transform", "translate(" + funcGetWpt(g_nSVG_Padding_mm) + ", " + funcGetHpt(800) + ")")
	        			.text(function(d) { return d.data.name; } );
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

function getPopulation(data, nYear)
{
	var nPopulation = 0;

	if (data != null)
	{
		switch (nYear)
		{
			case 2015: nPopulation = data.population_over_60.Y2015 / data.percentage_over_60.Y2015 * 100; break;
			case 2030: nPopulation = data.population_over_60.Y2030 / data.percentage_over_60.Y2030 * 100; break;
			case 2050: nPopulation = data.population_over_60.Y2050 / data.percentage_over_60.Y2050 * 100; break;
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

function getCircleRadius_Population(data, nYear)
{
	var nRadius = 0;

	if (data != null)
	{
		nPupulation = getPopulation(data, nYear);

		nRadius = Math.sqrt(g_funcScalePopulationCircle(nPupulation) / Math.PI);
	}

	return nRadius;
}
