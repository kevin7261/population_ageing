
var g_fDrawMapValueMin = 0;
var g_fDrawMapValueMax = 0;

function funcDrawWorldMap() {

	var nRotate = -150;//-10;//-150;

    var projection = d3.geoMercator()
				        //.translate([2750, 1350])
				        .rotate([nRotate,0,0])
				        .scale(450);

	var path = d3.geoPath().projection(projection);

	tjWorld = g_tjWorld.filter(function(d) { if (d.data != null && d.data.life_expectancy > 0) return d;});

	g_fDrawMapValueMin = d3.min(tjWorld, function (d) { return d.data.life_expectancy; });
	g_fDrawMapValueMax = d3.max(tjWorld, function (d) { return d.data.life_expectancy; });

	console.log("g_fDrawMapValueMin" + g_fDrawMapValueMin);
	console.log("g_fDrawMapValueMax" + g_fDrawMapValueMax);

	//g_funcScaleDrawMap = d3.scaleLinear()
	//							.domain([g_fDrawMapValueMin, g_fDrawMapValueMax])
	//							.range(["#00314F", "#FCE4A8"]);


	g_funcScaleDrawMapOpacity = d3.scaleLinear()
								.domain([g_fDrawMapValueMin, g_fDrawMapValueMax])
								.range([0.1, 1.0]);

	g_domSVGMain.selectAll("path.worldmap")
					.data(tjWorld)
					.enter()
					.append("path")
						.attr("d", path)
						.attr("class", "worldmap")
						.attr("id", function(d) { return getSVGContryMapID(d.data); })
						.attr("fill", "#00314F")
						.attr("fill-opacity", function(d) { console.log(g_funcScaleDrawMapOpacity(d.data.life_expectancy)); return g_funcScaleDrawMapOpacity(d.data.life_expectancy); })
						.attr("stroke", "#00314F")
						.attr("stroke-width", 0.5 + "mm")
						.attr("stroke-opacity", 0.25)
						.attr("transform", "translate(" + funcGetWpt(290) + ", " + funcGetHpt(325) + ")");
}

function getSVGContryMapID(data)
{
	var id = 0;

	if (data != null)
	{
		id = data.id;
	}
		
	return g_sID_SVG_poster + "_worldmap_" + id;
}
