
var g_fDrawPercentageValueMin = 0;
var g_fDrawPercentageValueMax = 0;

var g_funcScalepercentageLength = null;

function funcDrawPercentage() {

	var vsDisplayText = ["Taiwan", 
						"Japan", 
						"Korea"
						];

	var nCountryCount = vsDisplayText.length;

	d3.select(".percentage").remove(); 

	var domSVGMain_Percentage = g_domSVGMain.append("g").
												attr("class", "percentage");

	var tjWorld_Percentage = g_tjWorld
								.filter(function(d) { if (d.data != null && vsDisplayText.includes(d.data.name)) return d; })
								.sort(function(a, b) { return d3.descending(a.data.percentage_over_60.Y2050, b.data.percentage_over_60.Y2050); })
								.slice(0, nCountryCount);

	var tjWorld_Percentage_Selected = g_tjWorld.filter(function(d) { if (d.data != null && d.data.id == g_nSelectedCountryID) return d; });
	
	var fWorld_Percentage_2015 = 12.3;
	var fWorld_Percentage_2050 = 21.5;

	var vnYear = [2015, 2050];

	var n2015 = 0;
	var n2050 = 1;

	g_fDrawPercentageValueMin = d3.min(tjWorld_Percentage, function (d) { return d.data.percentage_over_60.Y2015; });
	g_fDrawPercentageValueMax = d3.max(tjWorld_Percentage, function (d) { return d.data.percentage_over_60.Y2050; });

	g_funcScalePercentageLength = d3.scaleLinear()
									.domain([g_fDrawPercentageValueMin, g_fDrawPercentageValueMax])
									.range([g_fDrawPercentageValueMin * 15, g_fDrawPercentageValueMax * 15]);
	
	var funcScaleY = d3.scaleLinear()
					.domain([0, nCountryCount])
					.range([0, 80]);

	var nWpt = 0;
	var nHpt = 640;

	// -------------

	domSVGMain_Percentage.append("rect")
					.attr("class", "countries_percentageover60_world_2050")
					.attr("x", g_nSVG_Wmm - g_nSVG_Padding_mm - g_funcScalePercentageLength(fWorld_Percentage_2050) + "mm")
					.attr("y", funcScaleY(-4.5) + "mm")
					.attr("width", g_funcScalePercentageLength(fWorld_Percentage_2050) + "mm")
					.attr("height", (funcScaleY(nCountryCount + 3.5) + g_nSVG_Grid_mm) + "mm")
					.attr("fill", g_colorBackground)
					.attr("fill-opacity", g_Opacity_World_2050)
					.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")");

	domSVGMain_Percentage.append("rect")
					.attr("class", "countries_percentageover60_world_2015")
					.attr("x", g_nSVG_Wmm - g_nSVG_Padding_mm - g_funcScalePercentageLength(fWorld_Percentage_2015) + "mm")
					.attr("y", funcScaleY(-4.5) + "mm")
					.attr("width", g_funcScalePercentageLength(fWorld_Percentage_2015) + "mm")
					.attr("height", (funcScaleY(nCountryCount + 3.5) + g_nSVG_Grid_mm) + "mm")
					.attr("fill", g_colorBackground)
					.attr("fill-opacity", g_Opacity_World_2015)
					.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")");

	domSVGMain_Percentage.selectAll("rect.countries_percentageover60_selected_2050")
					.data(tjWorld_Percentage_Selected)
					.enter()
					.append("rect")
						.attr("class", "countries_percentageover60_selected_2050")
						.attr("x", function(d, i) { return g_nSVG_Wmm - g_nSVG_Padding_mm - g_funcScalePercentageLength(d.data.percentage_over_60.Y2050) + "mm"})
						.attr("y", function(d, i) { return funcScaleY(nCountryCount - 1) + "mm"})
						.attr("width", function(d, i) { return g_funcScalePercentageLength(d.data.percentage_over_60.Y2050) + "mm"; })
						.attr("height", 20 + "mm")
						.attr("fill", function(d) { return getCountryColor(d); })
						.attr("fill-opacity", g_Opacity_2050)
						.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")");

	domSVGMain_Percentage.selectAll("rect.countries_percentageover60_selected_2015")
					.data(tjWorld_Percentage_Selected)
					.enter()
					.append("rect")
						.attr("class", "countries_percentageover60_selected_2015")
						.attr("x", function(d, i) { return g_nSVG_Wmm - g_nSVG_Padding_mm - g_funcScalePercentageLength(d.data.percentage_over_60.Y2015) + "mm"})
						.attr("y", function(d, i) { return funcScaleY(nCountryCount - 1) + "mm"})
						.attr("width", function(d, i) { return g_funcScalePercentageLength(d.data.percentage_over_60.Y2015) + "mm"; })
						.attr("height", 20 + "mm")
						.attr("fill", function(d) { return getCountryColor(d); })
						.attr("fill-opacity", g_Opacity_2015)
						.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")");

	domSVGMain_Percentage.selectAll("rect.countries_percentageover60_country_2050")
					.data(tjWorld_Percentage)
					.enter()
					.append("rect")
						.attr("class", "countries_percentageover60_country_2050")
						.attr("x", function(d, i) { return g_nSVG_Wmm - g_nSVG_Padding_mm - g_funcScalePercentageLength(d.data.percentage_over_60.Y2050) + "mm"})
						.attr("y", function(d, i) { return funcScaleY(i - 1) + "mm"})
						.attr("width", function(d, i) { return g_funcScalePercentageLength(d.data.percentage_over_60.Y2050) + "mm"; })
						.attr("height", g_nSVG_Grid_mm + "mm")
						.attr("fill", function(d) { return getCountryColor(d); })
						.attr("fill-opacity", g_Opacity_2050)
						.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")");

	domSVGMain_Percentage.selectAll("rect.countries_percentageover60_country_2015")
					.data(tjWorld_Percentage)
					.enter()
					.append("rect")
						.attr("class", "countries_percentageover60_country_2015")
						.attr("x", function(d, i) { return g_nSVG_Wmm - g_nSVG_Padding_mm - g_funcScalePercentageLength(d.data.percentage_over_60.Y2015) + "mm"})
						.attr("y", function(d, i) { return funcScaleY(i - 1) + "mm"})
						.attr("width", function(d, i) { return g_funcScalePercentageLength(d.data.percentage_over_60.Y2015) + "mm"; })
						.attr("height", g_nSVG_Grid_mm + "mm")
						.attr("fill", function(d) { return getCountryColor(d); })
						.attr("fill-opacity", g_Opacity_2015)
						.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")");

	// --------------------------------------------

	domSVGMain_Percentage.selectAll("text.countries_percentageover60_selected")
					.data(tjWorld_Percentage_Selected)
					.enter()
					.append("text")
						.attr("class", "countries_percentageover60_selected")
						.attr("x", function(d, i) { return (g_nSVG_Wmm - g_nSVG_Padding_mm - g_nSVG_Grid_mm) + "mm"})
						.attr("y", function(d, i) { return (funcScaleY(nCountryCount - 1) + 15) + "mm"})
						.attr("fill", g_colorBackground_Draw)
						.attr("font-size", g_nSVG_FontSize_Country_Hmm + "mm")
						.attr("text-anchor","end")
						.attr("font-weight", "bold")
						.attr("fill-opacity", g_Opacity_World_2015)
						.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")")
	        			.text(function(d) { return d.data.name.toUpperCase(); } );

	domSVGMain_Percentage.selectAll("text.countries_percentageover60_country")
					.data(tjWorld_Percentage)
					.enter()
					.append("text")
						.attr("class", "countries_percentageover60_country")
						.attr("x", function(d, i) { return (g_nSVG_Wmm - g_nSVG_Padding_mm - g_nSVG_Grid_mm) + "mm"})
						.attr("y", function(d, i) { return (funcScaleY(i - 1) + 15) + "mm"})
						.attr("fill", g_colorBackground_Draw)
						.attr("font-size", g_nSVG_FontSize_Country_Hmm + "mm")
						.attr("text-anchor","end")
						.attr("font-weight", "bold")
						.attr("fill-opacity", g_Opacity_World_2015)
						.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")")
	        			.text(function(d) { return d.data.name.toUpperCase(); } );
	
	// --------------------------------------------

	domSVGMain_Percentage.selectAll("text.countries_percentageover60_selected_2015")
					.data(tjWorld_Percentage_Selected)
					.enter()
					.append("text")
						.attr("class", "countries_percentageover60_selected_2015 subfont")
						.attr("x", function(d, i) { return (g_nSVG_Wmm - g_nSVG_Padding_mm - g_funcScalePercentageLength(d.data.percentage_over_60.Y2015) + 10) + "mm"})
						.attr("y", function(d, i) { return (funcScaleY(nCountryCount - 1) + 15) + "mm"})
						.attr("fill", g_colorBackground_Draw)
						.attr("font-size", g_nSVG_FontSize_Number_Hmm + "mm")
						.attr("text-anchor","front")
						.attr("fill-opacity", g_Opacity_World_2015)
						.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")")
	        			.text(function(d) { return d.data.percentage_over_60.Y2015 + "%"; } );

	domSVGMain_Percentage.selectAll("text.countries_percentageover60_selected_2050")
					.data(tjWorld_Percentage_Selected)
					.enter()
					.append("text")
						.attr("class", "countries_percentageover60_selected_2050 subfont")
						.attr("x", function(d, i) { return (g_nSVG_Wmm - g_nSVG_Padding_mm - g_funcScalePercentageLength(d.data.percentage_over_60.Y2050) + 10) + "mm"})
						.attr("y", function(d, i) { return (funcScaleY(nCountryCount - 1) + 15) + "mm"})
						.attr("fill", g_colorBackground_Draw)
						.attr("font-size", g_nSVG_FontSize_Number_Hmm + "mm")
						.attr("text-anchor","front")
						.attr("fill-opacity", g_colorBackground_Draw)
						.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")")
	        			.text(function(d) { return d.data.percentage_over_60.Y2050 + "%"; } );
						
	domSVGMain_Percentage.selectAll("text.countries_percentageover60_country_2015")
					.data(tjWorld_Percentage)
					.enter()
					.append("text")
						.attr("class", "countries_percentageover60_selected_2015 subfont")
						.attr("x", function(d, i) { return (g_nSVG_Wmm - g_nSVG_Padding_mm - g_funcScalePercentageLength(d.data.percentage_over_60.Y2015) + 10) + "mm"})
						.attr("y", function(d, i) { return (funcScaleY(i - 1) + 15) + "mm"})
						.attr("fill", g_colorBackground_Draw)
						.attr("font-size", g_nSVG_FontSize_Number_Hmm + "mm")
						.attr("text-anchor","front")
						.attr("fill-opacity", g_Opacity_World_2015)
						.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")")
	        			.text(function(d) { return d.data.percentage_over_60.Y2015 + "%"; } );

	domSVGMain_Percentage.selectAll("text.countries_percentageover60_country_2050")
					.data(tjWorld_Percentage)
					.enter()
					.append("text")
						.attr("class", "countries_percentageover60_country_2050 subfont")
						.attr("x", function(d, i) { return (g_nSVG_Wmm - g_nSVG_Padding_mm - g_funcScalePercentageLength(d.data.percentage_over_60.Y2050) + 10) + "mm"})
						.attr("y", function(d, i) { return (funcScaleY(i - 1) + 15) + "mm"})
						.attr("fill", g_colorBackground_Draw)
						.attr("font-size", g_nSVG_FontSize_Number_Hmm + "mm")
						.attr("text-anchor","front")
						.attr("fill-opacity", g_Opacity_World_2015)
						.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")")
	        			.text(function(d) { return d.data.percentage_over_60.Y2050 + "%"; } );

	domSVGMain_Percentage.selectAll("text.countries_percentageover60_country_2050_rank")
					.data(tjWorld_Percentage)
					.enter()
					.append("text")
						.attr("class", "countries_percentageover60_country_2050_rank subfont")
						.attr("x", function(d, i) { return (g_nSVG_Wmm - g_nSVG_Padding_mm - g_funcScalePercentageLength(d.data.percentage_over_60.Y2050) - 10) + "mm"})
						.attr("y", function(d, i) { return (funcScaleY(i - 1) + 15) + "mm"})
						.attr("fill", getCountryColor)
						.attr("font-size", g_nSVG_FontSize_Number_Hmm + "mm")
						.attr("text-anchor","end")
						.attr("fill-opacity", g_Opacity_World_2015)
						.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")")
	        			.text(function(d, i) { return i + 1; } );
						
	// -------------

	domSVGMain_Percentage.append("text")
						.attr("x", (g_nSVG_Wmm - g_nSVG_Padding_mm) + "mm")
						.attr("y", funcScaleY(-3.5) + "mm") 
						.attr("fill", g_colorBackground_Draw)
						.attr("font-size", g_nSVG_FontSize_Title_Hmm_Sub + "mm")
						.attr("text-anchor", "end")
						.attr("font-weight", "bold")
						.attr("fill-opacity", g_Opacity_World_2015)
						.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")")
	        			.text("PERCENTAGE of");

	domSVGMain_Percentage.append("text")
						.attr("x", (g_nSVG_Wmm - g_nSVG_Padding_mm) + "mm")
						.attr("y", funcScaleY(-3.5) + g_nSVG_FontSize_Title_Hmm_Sub + "mm") 
						.attr("fill", g_colorBackground_Draw)
						.attr("font-size", g_nSVG_FontSize_Title_Hmm_Sub + "mm")
						.attr("text-anchor", "end")
						.attr("font-weight", "bold")
						.attr("fill-opacity", g_Opacity_World_2015)
						.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")")
	        			.text("AGE > 60");

	domSVGMain_Percentage.append("text")
						.attr("x", function(d, i) { return (g_nSVG_Wmm - g_nSVG_Padding_mm - g_nSVG_Grid_mm) + "mm"})
						.attr("y", function(d, i) { return (funcScaleY(-2) + 15) + "mm"})
						.attr("fill", g_colorBackground_Draw)
						.attr("font-size", g_nSVG_FontSize_Country_Hmm + "mm")
						.attr("text-anchor","end")
						.attr("font-weight", "bold")
						.attr("fill-opacity", g_Opacity_World_2015)
						.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")")
	        			.text("WORLD");
						
	domSVGMain_Percentage.append("text")
						.attr("class", "subfont")
						.attr("x", function(d, i) { return (g_nSVG_Wmm - g_nSVG_Padding_mm - g_funcScalePercentageLength(fWorld_Percentage_2050) + 10) + "mm"})
						.attr("y", function(d, i) { return (funcScaleY(-4) + 5) + "mm"})
						.attr("fill", g_colorBackground_Draw)
						.attr("font-size", g_nSVG_FontSize_Number_Hmm + "mm")
						.attr("text-anchor", "front")
						.attr("fill-opacity", g_Opacity_World_2015)
						.attr("text-decoration", "underline")
						.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")")
						.text(vnYear[n2050]);
						
	domSVGMain_Percentage.append("text")
						.attr("class", "subfont")
						.attr("x", function(d, i) { return (g_nSVG_Wmm - g_nSVG_Padding_mm - g_funcScalePercentageLength(fWorld_Percentage_2015) + 10) + "mm"})
						.attr("y", function(d, i) { return (funcScaleY(-4) + 5) + "mm"})
						.attr("fill", g_colorBackground_Draw)
						.attr("font-size", g_nSVG_FontSize_Number_Hmm + "mm")
						.attr("text-anchor", "front")
						.attr("fill-opacity", g_Opacity_World_2015)
						.attr("text-decoration", "underline")
						.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")")
						.text(vnYear[n2015]);
						
	domSVGMain_Percentage.append("text")
						.attr("class", "subfont")
						.attr("x", function(d, i) { return (g_nSVG_Wmm - g_nSVG_Padding_mm - g_funcScalePercentageLength(fWorld_Percentage_2050) + 10) + "mm"})
						.attr("y", function(d, i) { return (funcScaleY(-2) + 15) + "mm"})
						.attr("fill", g_colorBackground_Draw)
						.attr("font-size", g_nSVG_FontSize_Number_Hmm + "mm")
						.attr("text-anchor", "front")
						.attr("fill-opacity", g_Opacity_World_2015)
						.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")")
	        			.text(fWorld_Percentage_2050 + "%");	
						
	domSVGMain_Percentage.append("text")
						.attr("class", "subfont")
						.attr("x", function(d, i) { return (g_nSVG_Wmm - g_nSVG_Padding_mm - g_funcScalePercentageLength(fWorld_Percentage_2015) + 10) + "mm"})
						.attr("y", function(d, i) { return (funcScaleY(-2) + 15) + "mm"})
						.attr("fill", g_colorBackground_Draw)
						.attr("font-size", g_nSVG_FontSize_Number_Hmm + "mm")
						.attr("text-anchor", "front")
						.attr("fill-opacity", g_Opacity_World_2015)
						.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")")
	        			.text(fWorld_Percentage_2015 + "%");						

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
