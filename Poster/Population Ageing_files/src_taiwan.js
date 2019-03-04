
var g_fDrawTaiwanMapValueMin = 0;
var g_fDrawTaiwanMapValueMax = 0;

var g_funcScaleDrawTaiwanOpacity = null;

var g_fDrawPercentageValueMin = 0;
var g_fDrawPercentageValueMax = 0;

var g_funcScalePercentageLength = null;

var g_fDrawPopulationValueMin = 0;
var g_fDrawPopulationValueMax = 0;

var g_funcScalePopulationRadius = null;

function funcDrawTaiwanMap() {

    var projection = d3.geoMercator()
    					.center([121,24])
				        .translate([275, 275])
				        .scale(5000);

    //var projection = d3.geoMercator().center([121,24]).scale(5000) // 座標變換函式

	var path = d3.geoPath().projection(projection); // 路徑產生器
				        
	var tjTaiwan = g_tjTaiwan.filter(function(d) { if (d.data.name != "金門縣" && d.data.name != "連江縣") return d; })
							 .sort(function(a, b) { return d3.ascending(a.data.id, b.data.id); });

	console.log(tjTaiwan);

 	g_fDrawTaiwanMapValueMin = d3.min(tjTaiwan, function (d) { return d.data.life_expectancy; });//{ return d.data.structual_ratio_65; });
	g_fDrawTaiwanMapValueMax = d3.max(tjTaiwan, function (d) { return d.data.life_expectancy; });//{ return d.data.structual_ratio_65; });
	g_fDrawPercentageValueMin = d3.min(tjTaiwan, function (d) { return d.data.structual_ratio_65; });
	g_fDrawPercentageValueMax = d3.max(tjTaiwan, function (d) { return d.data.structual_ratio_65; });
	g_fDrawPopulationValueMin = d3.min(tjTaiwan, function (d) { return d.data.population_65; });
	g_fDrawPopulationValueMax = d3.max(tjTaiwan, function (d) { return d.data.population_65; });

	g_funcScaleDrawTaiwanOpacity = d3.scaleLinear()
										.domain([g_fDrawTaiwanMapValueMin, g_fDrawTaiwanMapValueMax])
										.range([0.1, 1.0]);

	g_funcScalePercentageLength_Taiwan = d3.scaleLinear()
											.domain([g_fDrawPercentageValueMin, g_fDrawPercentageValueMax])
											.range([g_fDrawPercentageValueMin * 7.5, g_fDrawPercentageValueMax * 7.5]);

	g_funcScalePopulationRadius = d3.scaleLinear()
										.domain([g_fDrawPopulationValueMin, g_fDrawPopulationValueMax])
										.range([g_fDrawPopulationValueMin / 1000 * 2, g_fDrawPopulationValueMax / 1000 * 2]);

	var nWidth = 250;
	var nHeight = 300;

	var funcScaleY = d3.scaleLinear()
					.domain([1, tjTaiwan.length])
					.range([0, nHeight]);//.range([0, g_nSVG_Wmm - (g_nSVG_Padding_mm * 2)]);	

    // title
    /*
    g_domSVGMain.append("text")
	        .attr("id", "title_taiwan")
			.attr("x", "10mm")
			.attr("y", "-10mm")
			.attr("fill", "#FFFFFF")
			.attr("fill-opacity", 0.75)
	        .attr("font-size", "10mm")
			.attr("text-anchor","right")
			.attr("transform", "translate(1500, 1000)")
	        .text("TAIWAN 2015");
*/

	
	g_domSVGMain.append("rect")
					.attr("rx", "5mm")
					.attr("ry", "5mm")
					.attr("width", nWidth + 10 + "mm")
					.attr("height", nHeight + 50 + "mm")
					.attr("fill", "#FFFFFF")
					.attr("fill-opacity", 0.75)
					.attr("transform", "translate(" + funcGetWpt(400) + ", " + funcGetHpt(165) + ")");

	g_domSVGMain.append("rect")
					.attr("rx", "5mm")
					.attr("ry", "5mm")
					.attr("width", 100 + "mm")
					.attr("height", 120 + "mm")
					.attr("fill", "#FFFFFF")
					.attr("fill-opacity", 0.75)
					.attr("transform", "translate(" + funcGetWpt(290) + ", " + funcGetHpt(165) + ")");

	var tjTaiwan = g_tjTaiwan.filter(function(d) { if (d.data.name != "金門縣" && d.data.name != "連江縣") return d; });

	g_domSVGMain.selectAll("path.taiwanmap_stroke")
					.data(tjTaiwan)
					.enter()
					.append("path")
						.attr("d", path)
						.attr("class", "taiwanmap_stroke")
						.attr("id", function(d) { return getSVGTaiwanMapID(d.data); })
						.attr("stroke", "red")
						.attr("stroke-width", 0.5 + "mm")
						.attr("transform", "translate(" + funcGetWpt(280) + ", " + funcGetHpt(140) + ")");

	g_domSVGMain.selectAll("path.taiwanmap_back")
					.data(tjTaiwan)
					.enter()
					.append("path")
						.attr("d", path)
						.attr("class", "taiwanmap_back")
						.attr("id", function(d) { return getSVGTaiwanMapID(d.data); })
						.attr("fill", "white")
						.attr("transform", "translate(" + funcGetWpt(280) + ", " + funcGetHpt(140) + ")");

	g_domSVGMain.selectAll("path.taiwanmap")
					.data(tjTaiwan)
					.enter()
					.append("path")
						.attr("d", path)
						.attr("class", "taiwanmap")
						.attr("id", function(d) { return getSVGTaiwanMapID(d.data); })
						.attr("fill", "#85A894")
						.attr("fill-opacity", function(d) { return g_funcScaleDrawTaiwanOpacity(d.data.life_expectancy); })
						.attr("stroke", "#85A894")
						.attr("stroke-width", 0.5 + "mm")
						.attr("stroke-opacity", 0.25)
						.attr("transform", "translate(" + funcGetWpt(280) + ", " + funcGetHpt(140) + ")");


	g_domSVGMain.selectAll("text.countries_percentageover60_taiwan")
					.data(tjTaiwan)
					.enter()
					.append("text")
						.attr("class", "countries_percentageover60_taiwan")
						.attr("x", function(d, i) { return 0 + "mm"})
						.attr("y", function(d, i) { return funcScaleY(d.data.id) + 9 + "mm"})
						.attr("fill", "#222222")//"#00314F")
						.attr("font-size", "8mm")
						.attr("text-anchor", "front")
						.attr("fill-opacity", 0.90)
						.attr("transform", "translate(1600, 700)")
	        			.text(function(d) { return d.data.name; } );

	g_domSVGMain.selectAll("circle.countries_populationover60_taiwan")
					.data(tjTaiwan)
					.enter()
					.append("circle")
						.attr("class", "countries_populationover60_taiwan")
						.attr("cx", function(d, i) { return 30 + 20 + "mm"})
						.attr("cy", function(d, i) { return funcScaleY(d.data.id) + 5 + "mm"})
						.attr("r", function(d) { return getCircleRadius_PopulationOver60_Taiwan(d.data) + "mm"; })
						.attr("fill", "red")
						.attr("fill-opacity", 0.50)
						.attr("transform", "translate(1600, 700)");

	g_domSVGMain.selectAll("rect.countries_percentageover60_taiwan")
					.data(tjTaiwan)
					.enter()
					.append("rect")
						.attr("class", "countries_percentageover60_taiwan")
						.attr("x", function(d, i) { return 30 + 20 + 30 + "mm"})
						.attr("y", function(d, i) { return funcScaleY(d.data.id) + 3+ "mm"})
						.attr("width", function(d, i) { return g_funcScalePercentageLength_Taiwan(d.data.structual_ratio_65) + "mm"; })
						.attr("height", "6mm")
						.attr("fill", "red")
						.attr("fill-opacity", 0.50)
						.attr("transform", "translate(1600, 700)");

/*
	g_domSVGMain.selectAll("circle.taiwanmap")
			.data(tjTaiwan)
			.enter()
			.append("circle")
				.attr("class", "taiwanmap")
				.attr("id", function(d) { return getSVGTaiwanMapID(d.data); })
				.attr("cx", function(d) { bbox = document.getElementById(getSVGTaiwanMapID(d.data)).getBBox(); return bbox.x + (bbox.width / 2); })
				.attr("cy", function(d) { bbox = document.getElementById(getSVGTaiwanMapID(d.data)).getBBox(); return bbox.y + (bbox.height / 2); })
				.attr("r", function(d,i) { return Math.sqrt(g_funcScalePopulationCircle(d.data.population_65 * 0.1) / Math.PI); })
				//.attr("r", function(d,i) { return Math.sqrt(g_funcScaleDrawTaiwanCircle(d.data.population_65) / Math.PI); })
				.attr("fill", "MediumBlue")
				.attr("fill-opacity", 0.50)
				.attr("transform", "translate(1600, 1000)");
				*/
}

function getSVGTaiwanMapID(data)
{
	var id = 0;

	if (data != null)
	{
		id = data.id;
	}
		
	return g_sID_SVG_poster + "_taiwanmap_" + id;
}


function getCircleRadius_PopulationOver60_Taiwan(data, nYear)
{
	var nRadius = 0;

	if (data != null)
	{
		nRadius = Math.sqrt(g_funcScalePopulationRadius(data.population_65) / Math.PI);
	}

	return nRadius;
}