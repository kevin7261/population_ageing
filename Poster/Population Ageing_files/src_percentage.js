
var g_fDrawPercentageValueMin = 0;
var g_fDrawPercentageValueMax = 0;

var g_funcScalepercentageLength = null;

function funcDrawPercentage() {

	var nCountryCount = 7;

	var tjWorld_Percentage = g_tjWorld
								.filter(function(d) { if (d.data != null) return d; })
								.sort(function(a, b) { return d3.descending(a.data.percentage_over_60.Y2050, b.data.percentage_over_60.Y2050); })
								.slice(0, nCountryCount);

	console.log(tjWorld_Percentage);

	var tjWorld_Percentage_Taiwan = g_tjWorld.filter(function(d) { if (d.data != null && d.data.name == "Taiwan") return d; });

	var fWorld_Percentage_2015 = 12.3;
	var fWorld_Percentage_2050 = 21.5;

	var vnYear = [2015, 2050];

	var n2015 = 0;
	var n2050 = 1;

	g_fDrawPercentageValueMin = d3.min(tjWorld_Percentage, function (d) { return d.data.percentage_over_60.Y2015; });
	g_fDrawPercentageValueMax = d3.max(tjWorld_Percentage, function (d) { return d.data.percentage_over_60.Y2050; });

	console.log(g_fDrawPercentageValueMin);
	console.log(g_fDrawPercentageValueMax);

	g_funcScalePercentageLength = d3.scaleLinear()
									.domain([g_fDrawPercentageValueMin, g_fDrawPercentageValueMax])
									.range([g_fDrawPercentageValueMin * 7.5, g_fDrawPercentageValueMax * 7.5]);
	
	var funcScaleY = d3.scaleLinear()
					.domain([1, nCountryCount + 1])
					.range([0, 175]);//.range([0, g_nSVG_Wmm - (g_nSVG_Padding_mm * 2)]);	

	// -------------

	g_domSVGMain.append("rect")
					.attr("class", "countries_percentageover60_world_" + vnYear[n2050])
					.attr("x", g_nSVG_Wmm - g_nSVG_Padding_mm - 70 - g_funcScalePercentageLength(fWorld_Percentage_2050) + "mm")
					.attr("y", funcScaleY(nCountryCount + 1) + "mm")
					.attr("width", g_funcScalePercentageLength(fWorld_Percentage_2050) + "mm")
					.attr("height", "12mm")
					.attr("fill", "#999999")
					.attr("fill-opacity", 0.10)
					.attr("stroke", "#999999")
					.attr("stroke-width", "0.5mm")
					.attr("stroke-opacity", 1.00)
					.attr("transform", "translate(" + 0 + ", " + funcGetHpt(600) + ")");

	g_domSVGMain.append("rect")
					.attr("class", "countries_percentageover60_world_" + vnYear[n2015])
					.attr("x", g_nSVG_Wmm - g_nSVG_Padding_mm - 70 - g_funcScalePercentageLength(fWorld_Percentage_2015) + "mm")
					.attr("y", funcScaleY(nCountryCount + 1) + "mm")
					.attr("width", g_funcScalePercentageLength(fWorld_Percentage_2015) + "mm")
					.attr("height", "12mm")
					.attr("fill", "#999999")
					.attr("fill-opacity", 0.50)
					.attr("transform", "translate(" + 0 + ", " + funcGetHpt(600) + ")");

	g_domSVGMain.selectAll("rect.countries_percentageover60_" + vnYear[n2050])
					.data(tjWorld_Percentage)
					.enter()
					.append("rect")
						.attr("class", "countries_percentageover60_" + vnYear[n2050])
						.attr("x", function(d, i) { return g_nSVG_Wmm - g_nSVG_Padding_mm - 70 - g_funcScalePercentageLength(d.data.percentage_over_60.Y2050) + "mm"})
						.attr("y", function(d, i) { return funcScaleY(i + 1) + "mm"})
						.attr("width", function(d, i) { return g_funcScalePercentageLength(d.data.percentage_over_60.Y2050) + "mm"; })
						.attr("height", "12mm")
						.attr("fill", function(d) { return getCountryColor(d.data); })
						.attr("fill-opacity", 0.10)
						.attr("stroke", function(d) { return getCountryColor(d.data); })
						.attr("stroke-width", "0.5mm")
						.attr("stroke-opacity", 1.00)
						.attr("transform", "translate(" + 0 + ", " + funcGetHpt(600) + ")");

	g_domSVGMain.selectAll("rect.countries_percentageover60_" + vnYear[n2015])
					.data(tjWorld_Percentage)
					.enter()
					.append("rect")
						.attr("class", "countries_percentageover60_" + vnYear[n2015])
						.attr("x", function(d, i) { return g_nSVG_Wmm - g_nSVG_Padding_mm - 70 - g_funcScalePercentageLength(d.data.percentage_over_60.Y2015) + "mm"})
						.attr("y", function(d, i) { return funcScaleY(i + 1) + "mm"})
						.attr("width", function(d, i) { return g_funcScalePercentageLength(d.data.percentage_over_60.Y2015) + "mm"; })
						.attr("height", "12mm")
						.attr("fill", function(d) { return getCountryColor(d.data); })
						.attr("fill-opacity", 0.50)
						.attr("transform", "translate(" + 0 + ", " + funcGetHpt(600) + ")");

	// --------------------------------------------

	g_domSVGMain.append("text")
						.attr("class", "countries_percentageover60_world")
						.attr("x", g_nSVG_Wmm - g_nSVG_Padding_mm - 50 + "mm")
						.attr("y", funcScaleY(nCountryCount + 1) + 9 + "mm")
						.attr("fill", "#999999")
						.attr("font-size","8mm")
						.attr("text-anchor","front")
						.attr("fill-opacity", 0.90)
						.attr("transform", "translate(" + 0 + ", " + funcGetHpt(600) + ")")
	        			.text("World");

	g_domSVGMain.selectAll("text.countries_percentageover60_country")
					.data(tjWorld_Percentage)
					.enter()
					.append("text")
						.attr("class", "countries_percentageover60_country")
						.attr("x", function(d, i) { return g_nSVG_Wmm - g_nSVG_Padding_mm - 50 + "mm"})
						.attr("y", function(d, i) { return funcScaleY(i + 1) + 9 + "mm"})
						.attr("fill", function(d) { return getCountryColor(d.data); })
						.attr("font-size","8mm")
						.attr("text-anchor","front")
						.attr("fill-opacity", 0.90)
						.attr("transform", "translate(" + 0 + ", " + funcGetHpt(600) + ")")
	        			.text(function(d) { return d.data.name; } );

	// --------------------------------------------

	g_domSVGMain.append("text")
						.attr("class", "countries_percentageover60_world_" + vnYear[n2015])
						.attr("x", g_nSVG_Wmm - g_nSVG_Padding_mm - 70 - g_funcScalePercentageLength(fWorld_Percentage_2015) + 5 + "mm")
						.attr("y", funcScaleY(nCountryCount + 1) + 9 + "mm")
						.attr("fill", "#FFFFFF")
						.attr("font-size","8mm")
						.attr("text-anchor","front")
						.attr("fill-opacity", 0.90)
						.attr("transform", "translate(" + 0 + ", " + funcGetHpt(600) + ")")
	        			.text(fWorld_Percentage_2015);

	g_domSVGMain.append("text")
						.attr("class", "countries_percentageover60_world_" + vnYear[n2050])
						.attr("x", g_nSVG_Wmm - g_nSVG_Padding_mm - 70 - g_funcScalePercentageLength(fWorld_Percentage_2050) + 5 + "mm")
						.attr("y", funcScaleY(nCountryCount + 1) + 9 + "mm")
						.attr("fill", "#999999")
						.attr("font-size","8mm")
						.attr("text-anchor","front")
						.attr("fill-opacity", 0.90)
						.attr("transform", "translate(" + 0 + ", " + funcGetHpt(600) + ")")
	        			.text(fWorld_Percentage_2050);

	g_domSVGMain.selectAll("text.countries_percentageover60_country_" + vnYear[n2015])
					.data(tjWorld_Percentage)
					.enter()
					.append("text")
						.attr("class", "countries_percentageover60_country_" + vnYear[n2015])
						.attr("x", function(d, i) { return g_nSVG_Wmm - g_nSVG_Padding_mm - 70 - g_funcScalePercentageLength(d.data.percentage_over_60.Y2015) + 5 + "mm"})
						.attr("y", function(d, i) { return funcScaleY(i + 1) + 9 + "mm"})
						.attr("fill", "#FFFFFF")
						.attr("font-size","8mm")
						.attr("text-anchor","front")
						.attr("fill-opacity", 0.90)
						.attr("transform", "translate(" + 0 + ", " + funcGetHpt(600) + ")")
	        			.text(function(d) { return d.data.percentage_over_60.Y2015; } );

	g_domSVGMain.selectAll("text.countries_percentageover60_country_" + vnYear[n2050])
					.data(tjWorld_Percentage)
					.enter()
					.append("text")
						.attr("class", "countries_percentageover60_country_" + vnYear[n2050])
						.attr("x", function(d, i) { return g_nSVG_Wmm - g_nSVG_Padding_mm - 70 - g_funcScalePercentageLength(d.data.percentage_over_60.Y2050) + 5 + "mm"})
						.attr("y", function(d, i) { return funcScaleY(i + 1) + 9 + "mm"})
						.attr("fill", function(d) { return getCountryColor(d.data); })
						.attr("font-size","8mm")
						.attr("text-anchor","front")
						.attr("fill-opacity", 0.90)
						.attr("transform", "translate(" + 0 + ", " + funcGetHpt(600) + ")")
	        			.text(function(d) { return d.data.percentage_over_60.Y2050; } );
}

function getPercentageOver60(data, nYear)
{
	var npercentage = 0;

	if (data != null)
	{
		switch (nYear)
		{
			case 2015: npercentage = data.percentage_over_60.Y2015; break;
			case 2030: npercentage = data.percentage_over_60.Y2030; break;
			case 2050: npercentage = data.percentage_over_60.Y2050; break;
		}
	}

	return npercentage;
}

function getpercentage(data, nYear)
{
	var npercentage = 0;

	if (data != null)
	{
		switch (nYear)
		{
			case 2015: npercentage = data.percentage_over_60.Y2015 / data.percentage_over_60.Y2015 * 100; break;
			case 2030: npercentage = data.percentage_over_60.Y2030 / data.percentage_over_60.Y2030 * 100; break;
			case 2050: npercentage = data.percentage_over_60.Y2050 / data.percentage_over_60.Y2050 * 100; break;
		}
	}

	return npercentage;
}


function getCircleRadius_PercentageOver60(data, nYear)
{
	var nRadius = 0;

	if (data != null)
	{
		nPupulation = getPercentageOver60(data, nYear);

		nRadius = Math.sqrt(g_funcScalePercentageLength(nPupulation) / Math.PI);
	}

	return nRadius;
}

function getCircleRadius_Percentage(data, nYear)
{
	var nRadius = 0;

	if (data != null)
	{
		nPupulation = getpercentage(data, nYear);

		nRadius = Math.sqrt(g_funcScalePercentageLength(nPupulation) / Math.PI);
	}

	return nRadius;
}


