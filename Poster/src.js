
var g_nSelectedCountryID = 0;

var g_dsWorld = [];
var g_dsTaiwan = [];
var g_dsTaiwanPopulation = [];

var g_tjWorld = [];
var g_tjTaiwan = [];

var g_domSVGMain = null;

var g_nSVG_FontSize_Title_Hmm = 30;
var g_nSVG_FontSize_Title_Hmm_Sub = 20;

var g_nSVG_FontSize_Country_Hmm = 12;
var g_nSVG_FontSize_Number_Hmm = 10;

var g_Opacity_World_2015 = 1.0;
var g_Opacity_World_2050 = 0.4;
var g_Opacity_2015 = 0.8;
var g_Opacity_2050 = 0.4;

function funcGetWpt(Wmm)
{
	return Wmm * (g_nSVG_Wpt / g_nSVG_Wmm);
}

function funcGetHpt(Hmm)
{
	return Hmm * (g_nSVG_Hpt / g_nSVG_Hmm);
}

function funcSetPoster_Begin() {

	//d3.select(g_sID_SVG_poster).remove(); 
				
	g_domSVGMain = d3.select("#" + g_sID_DIV_svgMain)
						 .append("svg")	
							.attr("id", g_sID_SVG_poster)
						 	.attr("width", g_nSVG_Wmm + "mm")
							.attr("height", g_nSVG_Hmm + "mm");

	g_domSVGMain.append("rect")
		    		.attr("width", "100%")
		    		.attr("height", "100%")
		    		.attr("fill", g_colorBackground);
				
	g_domSVGMain.append("rect")
		    		.attr("x", g_nSVG_Padding_mm + "mm")
		    		.attr("y", g_nSVG_Padding_mm + "mm")
		    		.attr("width", g_nSVG_Draw_Wmm + "mm")
		    		.attr("height", g_nSVG_Draw_Hmm + "mm")
		    		.attr("fill", g_colorBackground_Draw);
}

function funcSetPoster_End() 
{
}

function funcDrawTitle()
{
	d3.select(".title").remove(); 

	g_domSVGMain_Title = g_domSVGMain.append("g").
												attr("class", "title");

	var tjWorld_Population_Selected = g_tjWorld.filter(function(d) { if (d.data != null && d.data.id == g_nSelectedCountryID) return d; });
	
	var nTitle_W = 300;
	var nTitle_H = 70;

	var s2015 = "2015";  

	var sTitle = "POPULATION AGEING";
	var sTitle_Sub = "WORLD v.s TAIWAN & ";

	if (tjWorld_Population_Selected.length == 1)
	{
		sTitle_Sub = sTitle_Sub + tjWorld_Population_Selected[0].data.name.toUpperCase();

		var nWidth_Title = sTitle.length * 16;
		var nWidth_Title_Sub = sTitle_Sub.length * 11;

		var nWidth = (nWidth_Title_Sub > nWidth_Title) ? nWidth_Title_Sub : nWidth_Title;

		g_domSVGMain_Title.append("rect")
							.attr("x", g_nSVG_Padding_mm + "mm")
							.attr("y", g_nSVG_Padding_mm + "mm")
				    		.attr("width", nWidth + "mm")
				    		.attr("height", (g_nSVG_FontSize_Title_Hmm * 2) + "mm")
				    		.attr("fill", g_colorBackground);
		
		g_domSVGMain_Title.append("text")
					        .attr("class", "title")
					        .attr("x", g_nSVG_Padding_mm + "mm")
					        .attr("y", (g_nSVG_Padding_mm + (g_nSVG_FontSize_Title_Hmm * 2) - 7) + "mm")
							.attr("fill", g_colorBackground_Draw)
					        .attr("font-size", g_nSVG_FontSize_Title_Hmm_Sub + "mm")
							.attr("font-weight", "bold")
							.attr("text-anchor", "front")
					        .text(sTitle_Sub);

		g_domSVGMain_Title.append("rect")
							.attr("x", g_nSVG_Padding_mm + "mm")
							.attr("y", g_nSVG_Padding_mm + (g_nSVG_FontSize_Title_Hmm * 2) + "mm")
					    	.attr("width", nWidth + "mm")
				    		.attr("height", (g_nSVG_FontSize_Number_Hmm * 2) + "mm")
				    		.attr("fill", g_colorBackground)
				    		.attr("fill-opacity", g_Opacity_World_2050);

	    g_domSVGMain_Title.append("text")
					        .attr("class", "title subfont")
					        .attr("x", (g_nSVG_Padding_mm + nWidth - (g_nSVG_Padding_mm / 2)) + "mm")
						    .attr("y", g_nSVG_Padding_mm + (g_nSVG_FontSize_Title_Hmm * 2.1) + g_nSVG_FontSize_Number_Hmm + "mm")
							.attr("fill", g_colorBackground_Draw)
					        .attr("font-size", g_nSVG_FontSize_Number_Hmm + "mm")
							.attr("text-anchor", "end")
							.attr("text-decoration", "underline")
					        .text("2050");
	}

	g_domSVGMain_Title.append("rect")
						.attr("x", g_nSVG_Padding_mm + "mm")
						.attr("y", g_nSVG_Padding_mm + (g_nSVG_FontSize_Title_Hmm * 2) + "mm")
			    		.attr("width", (s2015.length * 8) + "mm")
				    	.attr("height", (g_nSVG_FontSize_Number_Hmm * 2) + "mm")
			    		.attr("fill", g_colorBackground)
			    		.attr("fill-opacity", g_Opacity_World_2015);
					
    // title
    g_domSVGMain_Title.append("text")
				        .attr("class", "title")
				        .attr("x", g_nSVG_Padding_mm + "mm")
				        .attr("y", (g_nSVG_Padding_mm + g_nSVG_FontSize_Title_Hmm - 7) + "mm")
						.attr("fill", g_colorBackground_Draw)
				        .attr("font-size", g_nSVG_FontSize_Title_Hmm + "mm")
						.attr("font-weight", "bold")
						.attr("text-anchor", "front")
				        .text(sTitle);

    g_domSVGMain_Title.append("text")
				        .attr("class", "title subfont")
				        .attr("x", g_nSVG_Padding_mm + "mm")
					    .attr("y", g_nSVG_Padding_mm + (g_nSVG_FontSize_Title_Hmm * 2.1) + g_nSVG_FontSize_Number_Hmm + "mm")
						.attr("fill", g_colorBackground_Draw)
				        .attr("font-size", g_nSVG_FontSize_Number_Hmm + "mm")
						.attr("text-anchor", "front")
						.attr("text-decoration", "underline")
				        .text("2015");
}

function funcDraw() {

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

	funcSetPoster_Begin();

	funcDrawWorldMap();
	funcDrawPopulation();
	funcDrawPercentage();
	funcDrawPercentageOver60VSHDI();
	funcDrawTaiwanPopulation();
	funcDrawTitle();
	
	funcSetPoster_End();

	var nFontSize_Title = 20;
	var nFontSize_TitleSub = 12;

	var nRectWmm = 400;
	var nRectHmm = 50;
}

function funcLoadData(sFilePath, sFileName_TopoJSON, sFileName_DataSet, sFileName_TopoJSON_Taiwan, sFileName_DataSet_Taiwan, sFileName_DataSet_Taiwan_Population, funcAfterLoad) {

	d3.json(sFilePath + "/" + sFileName_TopoJSON + ".json", function(error, data) {
				
		if (error) console.log(error);

		g_tjWorld = topojson.feature(data, data.objects.countries).features;

		//g_tjWorld = g_tjWorld.filter(function(d) { if (d.properties.name != "Greenland") return d; }); // thousand
		g_tjWorld = g_tjWorld.filter(function(d) { if (d.properties.name != "") return d; }); // thousand

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

					// ----------------------

					d3.json(sFilePath + "/" + sFileName_DataSet_Taiwan_Population + ".json", function(error, data) {

						if (error) console.log(error);

						g_dsTaiwanPopulation = data;

						funcAfterLoad();
					});
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

function getCountryColor(d) {

	color = "black";

	if (d.data.name == "Taiwan")
		color = g_colorTaiwan;//"Gold";
	else if (d.data.state == "AS")
		color = "#CEA508";//"DarkOrange";//"Orange";//"Gold";
	else if (d.data.state == "E")
		color = "#5E8A30";//"DarkGreen";//"#2A6041";//"SeaGreen";
	else if (d.data.state == "NA")
		color = "#C16631";//"FireBrick";//"SaddleBrown"//"#B53F45";//"LightCoral";
	else if (d.data.state == "LAC")
		color = "#C16631";//"Gold";//"SaddleBrown";//"#B53F45";//"LightCoral";
	else if (d.data.state == "AF")
		color = "#987044";//"SaddleBrown";//"#222222";//"DarkGray";
	else if (d.data.state == "O")
		color = "#7C6EA3";//"RoyalBlue";//"#00314F";//"DodgerBlue";

	return color;

}
