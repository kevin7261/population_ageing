

var g_dsWorld = [];
var g_dsTaiwan = [];

var g_tjWorld = [];
var g_tjTaiwan = [];

var g_domSVGMain = null;

function funcGetWpt(Wmm)
{
	return Wmm * (g_nSVG_Wpt / g_nSVG_Wmm);
}

function funcGetHpt(Hmm)
{
	return Hmm * (g_nSVG_Hpt / g_nSVG_Hmm);
}


function funcSetPoster() {

	d3.select(g_sID_SVG_poster).remove(); 
				
	g_domSVGMain = d3.select("#" + g_sID_DIV_svgMain)
						 .append("svg")	
							.attr("id", g_sID_SVG_poster)
						 	.attr("width", g_nSVG_Wmm + "mm")
							.attr("height", g_nSVG_Hmm + "mm");

	var fGreylevel = 256 * (0.20);

	g_domSVGMain.append("rect")
		    		.attr("width", "100%")
		    		.attr("height", "100%")
		    		.attr("fill", "#EFEFEF");
		    		//.attr("fill", "#00314F");
		    		//.attr("fill", "rgb(" + f#999999level + ", " + f#999999level + ", " + f#999999level + ")");
}

function funcDrawPoster() {

	for (i = 0; i < g_tjWorld.length; i++) 
	{	
		data = getObjectByKeyValue(g_dsWorld, "name", g_tjWorld[i].properties.name);

		if (data != null)
		{
			g_tjWorld[i].data = data;
		}
		else
		{
			g_tjWorld[i].data = null;

			//console.log(g_tjWorld[i].properties.name);
		}
	}

	for (i = 0; i < g_tjTaiwan.length; i++) 
	{	
		data = getObjectByKeyValue(g_dsTaiwan, "name", g_tjTaiwan[i].properties.name);

		if (data != null)
		{
			g_tjTaiwan[i].data = data;
		}
	}

	funcSetPoster();

	funcDrawWorldMap();
	funcDrawPopulation();
	funcDrawPercentage();
	funcDrawPercentageOver60VSHDI();
	funcDrawTaiwanMap();

	var nFontSize_Title = 25;
	var nFontSize_TitleSub = 12;


	var nRectWmm = 400;
	var nRectHmm = 100;

	g_domSVGMain.append("rect")
					.attr("rx","5mm")
					.attr("ry","5mm")
					.attr("width", nRectWmm + "mm")
					.attr("height", nRectHmm + "mm")//.attr("height", g_nSVG_H - 575 - 50 + "mm")
					.attr("fill","#FFFFFF")
					//.attr("fill-opacity", 0.9)
					.attr("transform", "translate(" + funcGetWpt((g_nSVG_Wmm - nRectWmm) / 2) +", " + funcGetWpt(g_nSVG_Padding_mm) + ")");

    // title
    g_domSVGMain.append("text")
	        .attr("id", "title")
	        .attr("x", (g_nSVG_Wmm / 2) + "mm")
	        .attr("y", g_nSVG_Padding_mm + 40+ "mm")
			.attr("fill", "#00314F")
	        .attr("font-size", nFontSize_Title +　"mm")
			.attr("text-anchor","middle")
	        .text("WORLD AGEING POPULATION");

    g_domSVGMain.append("text")
	        .attr("id", "title")
	        .attr("x", (g_nSVG_Wmm / 2) + "mm")
	        .attr("y", g_nSVG_Padding_mm + 40 + nFontSize_Title + 10 + "mm")
			.attr("fill", "#00314F")
	        .attr("font-size", nFontSize_TitleSub +"mm")
			.attr("text-anchor","middle")
	        .text("2015 - 2050");
}

function funcLoadData(sFilePath, sFileName_TopoJSON, sFileName_DataSet, sFileName_TopoJSON_Taiwan, sFileName_DataSet_Taiwan, funcAfterLoad) {

	d3.json(sFilePath + "/" + sFileName_TopoJSON + ".json", function(error, data) {
				
		if (error) console.log(error);

		g_tjWorld = topojson.feature(data, data.objects.countries).features;

		g_tjWorld = g_tjWorld.filter(function(d) { if (d.properties.name != "Greenland") return d; }); // thousand

		// ----------

		d3.json(sFilePath + "/" + sFileName_DataSet + ".json", function(error, data) {
				
			if (error) console.log(error);

			g_dsWorld = data;

			// ----------------------

		    d3.json(sFilePath + "/" + sFileName_TopoJSON_Taiwan + ".json", function(error, data) {
				
				if (error) console.log(error);

				g_tjTaiwan = topojson.feature(data, data.objects.layer1).features;

				// ----------------------

				d3.json(sFilePath + "/" + sFileName_DataSet_Taiwan + ".json", function(error, data) {

					if (error) console.log(error);

					g_dsTaiwan = data;

					funcAfterLoad();
				});
		    });
		});
    });
}


function getObjectByKeyValue(vObjects, key, value){

	objectFind = null;

    for (var i = 0; i < vObjects.length; i++) {

        if (vObjects[i][key] == value) {

            objectFind = vObjects[i];

            break;
        }
    }

    return objectFind;
}

function getCountryColor(data) {

	color = "black";

	if (data.name == "Taiwan")
		color = "Red";//"Gold";
	else if (data.state == "AS")
		color = "Orange";//"Gold";
	else if (data.state == "E")
		color = "#2A6041";//"SeaGreen";
	else if (data.state == "NA")
		color = "SaddleBrown"//"#B53F45";//"LightCoral";
	else if (data.state == "LAC")
		color = "SaddleBrown";//"#B53F45";//"LightCoral";
	else if (data.state == "AF")
		color = "#222222";//"DarkGray";
	else if (data.state == "O")
		color = "#00314F";//"DodgerBlue";

	return color;

}
