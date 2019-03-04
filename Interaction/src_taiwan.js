
var g_fDrawTaiwanMapValueMin = 0;
var g_fDrawTaiwanMapValueMax = 0;

var g_funcScaleDrawTaiwanOpacity = null;

var g_fDrawPercentageValueMin = 0;
var g_fDrawPercentageValueMax = 0;

var g_funcScalePercentageLength = null;

var g_fDrawPopulationValueMin = 0;
var g_fDrawPopulationValueMax = 0;

var g_funcScalePopulationRadius = null;

var g_colorTaiwanMap = "#5B5E5F";//"Peru";//"DarkCyan"; 

function funcDrawTaiwanMap() {

    var projection = d3.geoMercator()
    					.center([121,24])
				        .translate([600, 380])
				        .scale(20000);

    //var projection = d3.geoMercator().center([121,24]).scale(5000) // 座標變換函式

	var path = d3.geoPath().projection(projection); // 路徑產生器
				        
	var tjTaiwan = g_tjTaiwan.filter(function(d) { if (d.data.name != "金門縣" && d.data.name != "連江縣") return d; })
							 .sort(function(a, b) { return d3.ascending(a.data.id, b.data.id); });


	var nTaiwan_Population = d3.sum(tjTaiwan, function(d){ return d.data.population_65; });

	console.log(nTaiwan_Population);

	console.log(tjTaiwan);

 	g_fDrawTaiwanMapValueMin = d3.min(tjTaiwan, function (d) { return d.data.life_expectancy; });//{ return d.data.structual_ratio_65; });
	g_fDrawTaiwanMapValueMax = d3.max(tjTaiwan, function (d) { return d.data.life_expectancy; });//{ return d.data.structual_ratio_65; });
	g_fDrawPercentageValueMin = d3.min(tjTaiwan, function (d) { return d.data.structual_ratio_65; });
	g_fDrawPercentageValueMax = d3.max(tjTaiwan, function (d) { return d.data.structual_ratio_65; });
	g_fDrawPopulationValueMin = d3.min(tjTaiwan, function (d) { return d.data.population_65; });
	g_fDrawPopulationValueMax = d3.max(tjTaiwan, function (d) { return d.data.population_65; });

	g_funcScaleDrawTaiwanOpacity = d3.scaleLinear()
										.domain([g_fDrawTaiwanMapValueMin, g_fDrawTaiwanMapValueMax])
										//.range([1.0, 0.1]);
										.range([0.1, 1.0]);

	g_funcScalePercentageLength_Taiwan = d3.scaleLinear()
											.domain([g_fDrawPercentageValueMin, g_fDrawPercentageValueMax])
											.range([g_fDrawPercentageValueMin * 7.5, g_fDrawPercentageValueMax * 7.5]);

	g_funcScalePercentageOpacity_Taiwan = d3.scaleLinear()
										.domain([g_fDrawPercentageValueMin, g_fDrawPercentageValueMax])
										.range([0.3, 0.8]);

	g_funcScalePopulationRadius = d3.scaleLinear()
										.domain([g_fDrawPopulationValueMin, g_fDrawPopulationValueMax])
										.range([g_fDrawPopulationValueMin / 100, g_fDrawPopulationValueMax / 100]);
											
	g_funcScalePopulationOpacity_Taiwan = d3.scaleLinear()
										.domain([g_fDrawPopulationValueMin, g_fDrawPopulationValueMax])
										.range([0.3, 0.8]);

	var nWidth = 250;
	var nHeight = 175;

	var funcScaleY = d3.scaleLinear()
					.domain([1, tjTaiwan.length / 2])
					.range([0, nHeight]);//.range([0, g_nSVG_Wmm - (g_nSVG_Padding_mm * 2)]);	

    // title
    /*
    g_domSVGMain.append("text")
	        .attr("id", "title_taiwan")
			.attr("x", "10mm")
			.attr("y", "-10mm")
			.attr("fill", g_colorTaiwanMap)
			.attr("fill-opacity", 0.75)
	        .attr("font-size", "10mm")
			.attr("text-anchor","right")
			.attr("transform", "translate(1500, 1000)")
	        .text("TAIWAN 2015");
*/

/*
	g_domSVGMain.append("rect")
					.attr("rx", "5mm")
					.attr("ry", "5mm")
					.attr("width", g_nSVG_Wmm - (g_nSVG_Padding_mm * 2) + "mm")
					.attr("height", 215 + "mm")
					.attr("fill", "#000000")
					.attr("fill-opacity", 0.30)
					//.attr("stroke", "Crimson")
					//.attr("stroke-width", 2 + "mm")
					//.attr("stroke-opacity", 0.5)
					.attr("transform", "translate(" + funcGetHpt(g_nSVG_Padding_mm) + ", " + funcGetHpt(900) + ")");
*/
	var tjTaiwan = g_tjTaiwan.filter(function(d) { if (d.data.name != "金門縣" && d.data.name != "連江縣") return d; });
/*
	g_domSVGMain.selectAll("path.taiwanmap_strock")
					.data(tjTaiwan)
					.enter()
					.append("path")
						.attr("d", path)
						.attr("class", "taiwanmap_strock")
						.attr("id", function(d) { return getSVGTaiwanMapID(d.data); })
						.attr("stroke", "Crimson")//.attr("fill", "white")
						.attr("stroke-width", 1 + "mm")
						.attr("stroke-opacity", 0.9)
						.attr("transform", "translate(" + funcGetHpt(g_nSVG_Padding_mm) + ", " + funcGetHpt(900) + ")");
*/
/*
	g_domSVGMain.selectAll("path.taiwanmap_back")
					.data(tjTaiwan)
					.enter()
					.append("path")
						.attr("d", path)
						.attr("class", "taiwanmap_back")
						.attr("id", function(d) { return getSVGTaiwanMapID(d.data); })
						.attr("fill", "white")//.attr("fill", "white")
						.attr("transform", "translate(" + funcGetHpt(g_nSVG_Padding_mm) + ", " + funcGetHpt(900) + ")");
*/
	g_domSVGMain.selectAll("path.taiwanmap")
					.data(tjTaiwan)
					.enter()
					.append("path")
						.attr("d", path)
						.attr("class", "taiwanmap")
						.attr("id", function(d) { return getSVGTaiwanMapID(d.data); })
						.attr("fill", g_colorTaiwanMap)//g_colorBackground)//"Crimson")
						.attr("fill-opacity", function(d) { return g_funcScaleDrawTaiwanOpacity(d.data.life_expectancy); })
						.attr("stroke", g_colorBackground_Draw)
						.attr("stroke-width", 0.5 + "mm")
						.attr("stroke-opacity", 0.50)
						.attr("transform", "translate(" + funcGetHpt(g_nSVG_Padding_mm) + ", " + funcGetHpt(900) + ")");

	g_domSVGMain.selectAll("text.taiwan_county")
					.data(tjTaiwan)
					.enter()
					.append("text")
						.attr("class", "taiwan_county")
						.attr("x", function(d, i) { return (Math.floor((d.data.id - 1) / 10) * 270) + "mm"})
						.attr("y", function(d, i) { return funcScaleY(((d.data.id - 1) % 10)+ 1) + 23 + "mm"})
						.attr("fill", g_colorTaiwanMap)//"#00314F")
						.attr("font-size", "8mm")
						.attr("text-anchor", "front")
						.attr("fill-opacity", 0.90)
						.attr("transform", "translate(" + funcGetHpt(250) + ", " + funcGetHpt(900) + ")")
	        			.text(function(d) { return d.data.name; } );

		var pie = d3.pie()
				//.sort(null)	
				//.padAngle(10)
				.value(1)
				//.value(function(d){  return d.data.population_65; })
				.sort(function(a, b) { return d3.descending(a.data.id, b.data.id); })
				.startAngle(-90 * (Math.PI/180))
				.endAngle(90 * (Math.PI/180))




		var arc1 = d3.arc()
				.outerRadius(funcGetWpt(Math.sqrt(g_funcScalePopulationRadius(nTaiwan_Population) / Math.PI)))
				.innerRadius(0);
				//.startAngle(-90 * (Math.PI/180))
				//.endAngle(90 * (Math.PI/180))
		var arc = d3.arc()
				.outerRadius(funcGetWpt(Math.sqrt(g_funcScalePopulationRadius(nTaiwan_Population) / Math.PI)) + 100)
				.innerRadius(funcGetWpt(Math.sqrt(g_funcScalePopulationRadius(nTaiwan_Population) / Math.PI)) + 100);
				//.startAngle(-90 * (Math.PI/180))
				//.endAngle(90 * (Math.PI/180))
	

		g_domSVGMain.selectAll("g.arc_taiwan1")
						.data(pie(tjTaiwan))
						.enter()
						.append("g")
							.attr("class", "arc_taiwan1")
							.attr("transform", "translate(" + funcGetWpt(550) + ", " + funcGetHpt(400) + ")");

		g_domSVGMain.selectAll("g.arc_taiwan1")
						.append("path")
							.attr("fill", "#5B5E5F")
							.attr("d", function(d) { return arc1(d); });


		g_domSVGMain.selectAll("g.arc_taiwan")
						.data(pie(tjTaiwan))
						.enter()
						.append("g")
							.attr("class", "arc_taiwan")
							.attr("transform", "translate(" + funcGetWpt(550) + ", " + funcGetHpt(400) + ")");

		g_domSVGMain.selectAll("g.arc_taiwan")
						.append("path")
							.attr("fill", "#5B5E5F")
							.attr("fill-opacity", "0")
							//.attr("stroke", "#5B5E5F")
							//.attr("stroke-width", "1mm")
							//.attr("stroke-opacity", "0")
							.attr("d", function(d) { return arc(d); });




	g_domSVGMain.selectAll("g.arc_taiwan")
					.append("circle")
						.attr("class", "arc_taiwan1")
						.attr("cx", 0 + "mm")
						.attr("cy", 0 + "mm")
						.attr("r", function(d) { return getCircleRadius_PopulationOver60_Taiwan(d.data.data) + "mm"; })
						.attr("fill", g_colorTaiwanMap)
						.attr("fill-opacity", "0.2")
						.attr("transform", function(d) { var array = arc.centroid(d); return "translate(" + array[0] + ", " + array[1] + ")"; });



	g_domSVGMain.selectAll("g.arc_taiwan")
					.append("rect")
						.attr("class", "arc_taiwan2")
						.attr("x", 0 + "mm")
						.attr("y", 0 + "mm")
						.attr("width", function(d, i) { return g_funcScalePercentageLength_Taiwan(d.data.data.structual_ratio_65) + "mm"; })
						.attr("height", "6mm")
						.attr("fill", g_colorTaiwanMap)
						//.attr("fill-opacity", 0.50)
						.attr("fill-opacity", "0.2")
						//.attr("stroke", g_colorTaiwanMap)
						//.attr("stroke-width", "0.5mm")
						//.attr("stroke-opacity", 0.50)
						.attr("transform", 
							function(d, i) 
							{ 
								var array = arc.centroid(d); 
								console.log(d.data.data.id, (180 / 20 * d.data.data.id));
								return	'rotate(' + (-180/20*d.data.data.id)+ ', 0, 0)' + 
								"translate(" + 300 + ", " + 0 + ")" ;
								 		//"translate(" + array[0] + ", " + array[1] + ")" ;
                       					//'rotate(' + -90 + (180 * (Math.PI/180) / 20 * i) + ', 0, 0)';
							});


		//-----------------





	g_domSVGMain.append("circle")
						.attr("cx", g_nSVG_Wmm / 2 + "mm")
						.attr("cy", g_nSVG_Hmm + "mm")
						.attr("r", Math.sqrt(g_funcScalePopulationRadius(nTaiwan_Population) / Math.PI) + "mm")
						.attr("fill", g_colorTaiwanMap);
						//.attr("transform", "translate(" + funcGetHpt(250) + ", " + funcGetHpt(900) + ")");

	g_domSVGMain.selectAll("circle.countries_populationover60_taiwan")
					.data(tjTaiwan)
					.enter()
					.append("circle")
						.attr("class", "countries_populationover60_taiwan")
						.attr("cx", function(d, i) { return 30 + 20 + (Math.floor((d.data.id - 1) / 10) * 270) + "mm"})
						.attr("cy", function(d, i) { return funcScaleY(((d.data.id - 1) % 10)+ 1) + 20 + "mm"})
						.attr("r", function(d) { return getCircleRadius_PopulationOver60_Taiwan(d.data) + "mm"; })
						.attr("fill", g_colorTaiwanMap)
						//.attr("fill-opacity", 0.50)
						.attr("fill-opacity", "0.1")
						//.attr("fill-opacity", function(d) { return g_funcScalePopulationOpacity_Taiwan(d.data.population_65); })
						//.attr("stroke", g_colorTaiwanMap)
						//.attr("stroke-width", "0.5mm")
						//.attr("stroke-opacity", 0.50)
						.attr("transform", "translate(" + funcGetHpt(250) + ", " + funcGetHpt(900) + ")");

	g_domSVGMain.selectAll("rect.countries_percentageover60_taiwan")
					.data(tjTaiwan)
					.enter()
					.append("rect")
						.attr("class", "countries_percentageover60_taiwan")
						.attr("x", function(d, i) { return 30 + 20 + 30 + (Math.floor((d.data.id - 1) / 10) * 270) + "mm"})
						.attr("y", function(d, i) { return funcScaleY(((d.data.id - 1) % 10)+ 1) + 17 + "mm"})
						.attr("width", function(d, i) { return g_funcScalePercentageLength_Taiwan(d.data.structual_ratio_65) + "mm"; })
						.attr("height", "6mm")
						.attr("fill", g_colorTaiwanMap)
						//.attr("fill-opacity", 0.50)
						.attr("fill-opacity", function(d) { return g_funcScalePercentageOpacity_Taiwan(d.data.structual_ratio_65); })
						//.attr("stroke", g_colorTaiwanMap)
						//.attr("stroke-width", "0.5mm")
						//.attr("stroke-opacity", 0.50)
						.attr("transform", "translate(" + funcGetHpt(250) + ", " + funcGetHpt(900) + ")");

	g_domSVGMain.selectAll("text.countries_percentageover60_taiwan")
					.data(tjTaiwan)
					.enter()
					.append("text")
						.attr("class", "countries_percentageover60_taiwan")
						.attr("x", function(d, i) { return 30 + 20 + 30 + g_funcScalePercentageLength_Taiwan(d.data.structual_ratio_65) + (Math.floor((d.data.id - 1) / 10) * 270) + 5 + "mm"})
						.attr("y", function(d, i) { return funcScaleY(((d.data.id - 1) % 10)+ 1) + 23 + "mm"})
						.attr("fill", g_colorTaiwanMap)
						.attr("font-size", "8mm")
						.attr("text-anchor", "front")
						.attr("fill-opacity", function(d) { return g_funcScalePercentageOpacity_Taiwan(d.data.structual_ratio_65); })
						.attr("transform", "translate(" + funcGetHpt(250) + ", " + funcGetHpt(900) + ")")
	        			.text(function(d) { return d.data.structual_ratio_65; } );
/*
	g_domSVGMain.append("text")
						.attr("x", -160 + "mm")
						.attr("y", 25 + "mm") 
						.attr("fill", g_colorTaiwanMap)//"#00314F")
						.attr("font-size", "10mm")
						.attr("text-anchor", "middle")
						.attr("fill-opacity", 0.80)
						.attr("transform", "translate(" + funcGetHpt(250) + ", " + funcGetHpt(900) + ")")
	        			.text("TAIWAN");
*/
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