
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

function funcDrawTaiwanPopulation() {

	d3.select(".taiwan").remove(); 

	var domSVGMain_Taiwan = g_domSVGMain.append("g").
										attr("class", "taiwan");

	var nYear_S = 1961;
	var nYear_N = 2015;
	var nYear_E = 2050;

	var dsTaiwanPopulation = g_dsTaiwanPopulation.filter(function(d) { if (d.year % 1 == 0 && d.year >= nYear_S && d.year <= nYear_E) return d; });
	var dsTaiwanPopulation_Past = dsTaiwanPopulation.filter(function(d) { if (d.year % 1 == 0 && d.year <= nYear_N) return d; });
	var dsTaiwanDependancyRatio_Past = dsTaiwanPopulation.filter(function(d) { if (d.year % 1 == 0 && d.year >= 2000 &&  d.year <= nYear_N) return d; });
	var dsTaiwanPopulation_Pred = dsTaiwanPopulation.filter(function(d) { if (d.year % 1 == 0 && d.year >= nYear_N && d.year <= nYear_E) return d; });
	var dsTaiwanPopulation = dsTaiwanPopulation.filter(function(d) { if (d.year % 1 == 0 && d.year >= nYear_S && d.year <= nYear_E) return d; });

	var nYear_Min = d3.min(dsTaiwanPopulation, function (d) { return d.year; });
	var nYear_Max = d3.max(dsTaiwanPopulation, function (d) { return d.year; });
	
	// -------

	var nPopulation_Min = d3.min(dsTaiwanPopulation, function (d) { return d.population; });
	var nPopulation_Max = d3.max(dsTaiwanPopulation, function (d) { return d.population; });
	var nPopulation_Min_ExceptOld = d3.min(dsTaiwanPopulation, function (d) { return (d.population_14 + d.population_15_64); });
	var nPopulation_Max_ExceptOld = d3.max(dsTaiwanPopulation, function (d) { return (d.population_14 + d.population_15_64); });

	var nPopulation_Min_Past = d3.min(dsTaiwanPopulation_Past, function (d) { return d.population; });
	var nPopulation_Max_Past = d3.max(dsTaiwanPopulation_Past, function (d) { return d.population; });
	var nPopulation_Min_Pred = d3.min(dsTaiwanPopulation_Pred, function (d) { return d.population; });
	var nPopulation_Max_Pred = d3.max(dsTaiwanPopulation_Pred, function (d) { return d.population; });
	var nPopulation_Min_Past_ExceptOld = d3.min(dsTaiwanPopulation_Past, function (d) { return (d.population_14 + d.population_15_64); });
	var nPopulation_Max_Past_ExceptOld = d3.max(dsTaiwanPopulation_Past, function (d) { return (d.population_14 + d.population_15_64); });
	var nPopulation_Min_Pred_ExceptOld = d3.min(dsTaiwanPopulation_Pred, function (d) { return (d.population_14 + d.population_15_64); });
	var nPopulation_Max_Pred_ExceptOld = d3.max(dsTaiwanPopulation_Pred, function (d) { return (d.population_14 + d.population_15_64); });

	// -------

	var nDependencyRatioOldAge_Min = d3.min(dsTaiwanPopulation, function (d) { return d.dependency_ratio_old_age; });
	var nDependencyRatioOldAge_Max = d3.max(dsTaiwanPopulation, function (d) { return d.dependency_ratio_old_age; });
	var nDependencyRatioOldAge_Min_Past = d3.min(dsTaiwanPopulation_Past, function (d) { return d.dependency_ratio_old_age; });
	var nDependencyRatioOldAge_Max_Past = d3.max(dsTaiwanPopulation_Past, function (d) { return d.dependency_ratio_old_age; });
	var nDependencyRatioOldAge_Min_Pred = d3.min(dsTaiwanPopulation_Pred, function (d) { return d.dependency_ratio_old_age; });
	var nDependencyRatioOldAge_Max_Pred = d3.max(dsTaiwanPopulation_Pred, function (d) { return d.dependency_ratio_old_age; });

	// -------
	
	var scaleYear = d3.scaleLinear()
					.domain([nYear_Min, nYear_Max])
					.range([funcGetWpt(g_nSVG_Padding_mm), 
							funcGetWpt(g_nSVG_Wmm - (g_nSVG_Padding_mm))]);

	var scaleYear_Reverse = d3.scaleLinear()
					.domain([funcGetWpt(g_nSVG_Padding_mm), funcGetWpt(g_nSVG_Wmm - (g_nSVG_Padding_mm))])
					.range([nYear_Min, nYear_Max]);

	var scalePopulation = d3.scaleLinear()
					.domain([nPopulation_Min, nPopulation_Max])
					.range([funcGetHpt(g_nSVG_Hmm - g_nSVG_Padding_mm - (nPopulation_Min / 175)), 
							funcGetHpt(g_nSVG_Hmm - g_nSVG_Padding_mm - (nPopulation_Max / 175))]);

	var scareDependencyRatioOldAge = d3.scaleLinear()
					.domain([nDependencyRatioOldAge_Min, nDependencyRatioOldAge_Max])
					.range([funcGetHpt(g_nSVG_Hmm - g_nSVG_Padding_mm - (nDependencyRatioOldAge_Min * 4)), 
							funcGetHpt(g_nSVG_Hmm - g_nSVG_Padding_mm - (nDependencyRatioOldAge_Max * 4))]);

	var nWpt = 0;
	var nHpt = 2;

	// -------

	{
		var line_population = d3.line()
						.x(function(d) { return scaleYear(d.year); })
						.y(function(d) { return scalePopulation(d.population); })
						.curve(d3.curveBundle);//.curve(d3.curveLinear);
					
		var d_population = line_population(dsTaiwanPopulation_Past);
		
		d_population += ("V" + scalePopulation(0));
		d_population += ("H" + scaleYear(nYear_S));
		d_population += ("L" + scaleYear(nYear_S) + "," + scalePopulation(nPopulation_Min_Past));

		domSVGMain_Taiwan.append("path")
						.attr("class", "taiwan_population")
						.attr("d", d_population)
						.attr("fill", g_colorTaiwan)
						.attr("fill-opacity", 0.8)
						//.attr("stroke", g_colorTaiwan)
						//.attr("stroke-width", "1mm")
						.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")");
	}
	
	{
		var line_population = d3.line()
					.x(function(d) { return scaleYear(d.year); })
					.y(function(d) { return scalePopulation((d.population_14 + d.population_15_64)); })
					.curve(d3.curveBundle);//.curve(d3.curveLinear);
					
		var d_population = line_population(dsTaiwanPopulation_Past);
		
		d_population += ("V" + scalePopulation(0));
		d_population += ("H" + scaleYear(nYear_S));
		d_population += ("L" + scaleYear(nYear_S) + "," + scalePopulation(nPopulation_Min_Past_ExceptOld));

		domSVGMain_Taiwan.append("path")
						.attr("class", "taiwan_population")
						.attr("d", d_population)
						.attr("fill", g_colorBackground)
						.attr("fill-opacity", 1.0)
						.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetWpt(nHpt) + ")");
	}

	// ----

	{
		var line_population = d3.line()
						.x(function(d) { return scaleYear(d.year); })
						.y(function(d) { return scalePopulation(d.population); })
						.curve(d3.curveBundle);//.curve(d3.curveLinear);
					
		var d_population = line_population(dsTaiwanPopulation_Pred);
		
		d_population += ("V" +  + scalePopulation(0));
		d_population += ("H" + scaleYear(nYear_N));
		d_population += ("L" + scaleYear(nYear_N) + "," + scalePopulation(nPopulation_Min_Pred));

		domSVGMain_Taiwan.append("path")
						.attr("class", "taiwan_population")
						.attr("d", d_population)
						.attr("fill", g_colorTaiwan)
						.attr("fill-opacity", 0.4)
						.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")");
		
	}
	
	{
		var line_population = d3.line()
					.x(function(d) { return scaleYear(d.year); })
					.y(function(d) { return scalePopulation((d.population_14 + d.population_15_64)); })
					.curve(d3.curveBundle);//.curve(d3.curveLinear);
					
		var d_population = line_population(dsTaiwanPopulation_Pred);
		
		d_population += ("V" +  + scalePopulation(0));
		d_population += ("H" + scaleYear(nYear_N));
		d_population += ("L" + scaleYear(nYear_N) + "," + scalePopulation(nPopulation_Min_Pred_ExceptOld));

		domSVGMain_Taiwan.append("path")
						.attr("class", "taiwan_population")
						.attr("d", d_population)
						.attr("fill", g_colorBackground_Draw)
						.attr("fill-opacity", 1.0)
						.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")");

		domSVGMain_Taiwan.append("path")
						.attr("class", "taiwan_population")
						.attr("d", d_population)
						.attr("fill", g_colorBackground)
						.attr("fill-opacity", 0.40)
						.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")");
	}

	// ---

	{
		var line_dependency_ratio_old_age = d3.line()
					.x(function(d) { return scaleYear(d.year); })
					.y(function(d) { return scareDependencyRatioOldAge((d.dependency_ratio_old_age)); })
					.curve(d3.curveBundle);//.curve(d3.curveLinear);
					
		var d_dependency_ratio_old_age = line_dependency_ratio_old_age(dsTaiwanDependancyRatio_Past);

		domSVGMain_Taiwan.append("path")
						.attr("class", "taiwan_dependency_ratio_old_age")
						.attr("d", d_dependency_ratio_old_age)
						.attr("fill-opacity", 0.0)
						.attr("stroke", g_colorBackground_Draw)
						.attr("stroke-width", 1 + "mm")
						.attr("stroke-dasharray", "2mm,2mm")
						.attr("stroke-opacity", 1.0)
						.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")");
	}

	{
		var line_dependency_ratio_old_age = d3.line()
					.x(function(d) { return scaleYear(d.year); })
					.y(function(d) { return scareDependencyRatioOldAge((d.dependency_ratio_old_age)); })
					.curve(d3.curveBundle);//.curve(d3.curveLinear);
					
		var d_dependency_ratio_old_age = line_dependency_ratio_old_age(dsTaiwanPopulation_Pred);

		domSVGMain_Taiwan.append("path")
						.attr("class", "taiwan_dependency_ratio_old_age")
						.attr("d", d_dependency_ratio_old_age)
						.attr("fill-opacity", 0.0)
						.attr("stroke", g_colorTaiwan)//g_colorBackground)
						.attr("stroke-width", 1 + "mm")
						.attr("stroke-dasharray", "2mm,2mm")
						.attr("stroke-opacity", 0.6)
						.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")");
	}

	// ---------------------
	
	{/*
		domSVGMain_Taiwan.append("rect")
						.attr("x", g_nSVG_Padding_mm + "mm")
						.attr("y", (g_nSVG_Hmm - g_nSVG_Padding_mm - (g_nSVG_FontSize_Title_Hmm_Sub * 2) - 5) + "mm")
						.attr("width", scaleYear(2000) - scaleYear(nYear_Min))
						.attr("height", (g_nSVG_FontSize_Title_Hmm_Sub * 2 + 8) + "mm")
						.attr("fill", g_colorBackground);*/
					
		domSVGMain_Taiwan.append("text")
						.attr("x", g_nSVG_Padding_mm + "mm")
						.attr("y", (g_nSVG_Hmm - g_nSVG_Padding_mm - g_nSVG_FontSize_Title_Hmm_Sub) + "mm") 
						.attr("fill", g_colorBackground_Draw)
						.attr("font-size", g_nSVG_FontSize_Title_Hmm_Sub + "mm")
						.attr("text-anchor", "front")
						.attr("font-weight", "bold")
						.attr("fill-opacity", g_Opacity_World_2015)
						.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")")
	        			.text("POP. of");

		domSVGMain_Taiwan.append("text")
							.attr("x", g_nSVG_Padding_mm + "mm")
							.attr("y", (g_nSVG_Hmm - g_nSVG_Padding_mm) + "mm") 
							.attr("fill", g_colorBackground_Draw)
							.attr("font-size", g_nSVG_FontSize_Title_Hmm_Sub + "mm")
							.attr("text-anchor", "front")
							.attr("font-weight", "bold")
							.attr("fill-opacity", g_Opacity_World_2015)
							.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")")
							.text("AGE > 60 in TW");
					
		domSVGMain_Taiwan.append("text")
						.attr("x", scaleYear(2000))
						.attr("y", (g_nSVG_Hmm - g_nSVG_Padding_mm - g_nSVG_FontSize_Title_Hmm_Sub) + "mm") 
						.attr("fill", g_colorBackground_Draw)
						.attr("font-size", g_nSVG_FontSize_Title_Hmm_Sub + "mm")
						.attr("text-anchor", "front")
						.attr("font-weight", "bold")
						.attr("fill-opacity", g_Opacity_World_2015)
						.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")")
	        			.text("DEPENDENCY");

		domSVGMain_Taiwan.append("text")
							.attr("x", scaleYear(2000))
							.attr("y", (g_nSVG_Hmm - g_nSVG_Padding_mm) + "mm") 
							.attr("fill", g_colorBackground_Draw)
							.attr("font-size", g_nSVG_FontSize_Title_Hmm_Sub + "mm")
							.attr("text-anchor", "front")
							.attr("font-weight", "bold")
							.attr("fill-opacity", g_Opacity_World_2015)
							.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")")
							.text("RATIO in TW");

		// -------------
					
		domSVGMain_Taiwan.append("text")
						.attr("class", "subfont")
						.attr("x", (scaleYear(nYear_S) + 20))
						.attr("y", scalePopulation(getPopulation(nYear_S)) - 40) 
						.attr("fill", g_colorBackground)
						.attr("font-size", g_nSVG_FontSize_Number_Hmm + "mm")
						.attr("text-anchor", "front")
						.attr("font-weight", "bold")
						.attr("fill-opacity", g_Opacity_World_2015)
						.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")")
	        			.text((getPopulation(nYear_S) / 1000).toFixed(1) + "m");
					
		domSVGMain_Taiwan.append("text")
						.attr("class", "subfont")
						.attr("x", (scaleYear(nYear_S) + 20))
						.attr("y", scalePopulation(getPopulation(nYear_S)) - 40 - 50) 
						.attr("fill", g_colorBackground)
						.attr("font-size", g_nSVG_FontSize_Number_Hmm + "mm")
						.attr("text-anchor", "front")
						.attr("font-weight", "bold")
						.attr("fill-opacity", g_Opacity_World_2015)
						.attr("text-decoration", "underline")
						.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")")
	        			.text(nYear_S);
					
		domSVGMain_Taiwan.append("text")
						.attr("class", "subfont")
						.attr("x", (scaleYear(2000)))
						.attr("y", scalePopulation(getPopulation(2000)) - 30) 
						.attr("fill", g_colorBackground)
						.attr("font-size", g_nSVG_FontSize_Number_Hmm + "mm")
						.attr("text-anchor", "front")
						.attr("font-weight", "bold")
						.attr("fill-opacity", g_Opacity_World_2015)
						.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")")
	        			.text((getPopulation(2000) / 1000).toFixed(1) + "m");
					
		domSVGMain_Taiwan.append("text")
						.attr("class", "subfont")
						.attr("x", (scaleYear(2000)))
						.attr("y", scalePopulation(getPopulation(2000)) - 30 - 50) 
						.attr("fill", g_colorBackground)
						.attr("font-size", g_nSVG_FontSize_Number_Hmm + "mm")
						.attr("text-anchor", "front")
						.attr("fill-opacity", g_Opacity_World_2015)
						.attr("text-decoration", "underline")
						.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")")
	        			.text(2000);

		domSVGMain_Taiwan.append("text")
						.attr("class", "subfont")
						.attr("x", (scaleYear(2000)))
						.attr("y", scareDependencyRatioOldAge(getDepandancyRatioOldAge(2000)) - 30) 
						.attr("fill", g_colorBackground_Draw)
						.attr("font-size", g_nSVG_FontSize_Number_Hmm + "mm")
						.attr("text-anchor", "front")
						.attr("fill-opacity", g_Opacity_World_2015)
						.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")")
	        			.text(getDepandancyRatioOldAge(2000));
					
		domSVGMain_Taiwan.append("text")
						.attr("class", "subfont")
						.attr("x", (scaleYear(nYear_N)) - 20)
						.attr("y", scalePopulation(getPopulation(nYear_N)) - 30) 
						.attr("fill", g_colorBackground)
						.attr("font-size", g_nSVG_FontSize_Number_Hmm + "mm")
						.attr("text-anchor", "end")
						.attr("fill-opacity", g_Opacity_World_2015)
						.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")")
	        			.text((getPopulation(nYear_N) / 1000).toFixed(1) + "m");
					
		domSVGMain_Taiwan.append("text")
						.attr("class", "subfont")
						.attr("x", (scaleYear(nYear_N)) - 20)
						.attr("y", scalePopulation(getPopulation(nYear_N)) + 45) 
						.attr("fill", g_colorBackground_Draw)
						.attr("font-size", g_nSVG_FontSize_Number_Hmm + "mm")
						.attr("text-anchor", "end")
						.attr("fill-opacity", g_Opacity_World_2015)
						.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")")
	        			.text((getPopulation_65(nYear_N) / 1000).toFixed(1) + "m");

		domSVGMain_Taiwan.append("text")
						.attr("class", "subfont")
						.attr("x", (scaleYear(nYear_N)) - 20)
						.attr("y", scareDependencyRatioOldAge(getDepandancyRatioOldAge(nYear_N)) - 30) 
						.attr("fill", g_colorBackground_Draw)
						.attr("font-size", g_nSVG_FontSize_Number_Hmm + "mm")
						.attr("text-anchor", "end")
						.attr("fill-opacity", g_Opacity_World_2015)
						.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")")
	        			.text(getDepandancyRatioOldAge(nYear_N));
					
		domSVGMain_Taiwan.append("text")
						.attr("class", "subfont")
						.attr("x", (scaleYear(nYear_N)) + 20)
						.attr("y", scalePopulation(getPopulation(nYear_N)) + 45) 
						.attr("fill", g_colorBackground_Draw)
						.attr("font-size", g_nSVG_FontSize_Number_Hmm + "mm")
						.attr("text-anchor", "front")
						.attr("fill-opacity", g_Opacity_World_2015)
						.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")")
	        			.text("age > 65");

		domSVGMain_Taiwan.append("text")
						.attr("class", "subfont")
						.attr("x", (scaleYear(nYear_N)) + 20)
						.attr("y", scalePopulation(0) - 30) 
						.attr("fill", g_colorBackground_Draw)
						.attr("font-size", g_nSVG_FontSize_Number_Hmm + "mm")
						.attr("text-anchor", "front")
						.attr("fill-opacity", g_Opacity_World_2015)
						.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")")
	        			.text("age < 65");
					
		domSVGMain_Taiwan.append("text")
						.attr("class", "subfont")
						.attr("x", (scaleYear(nYear_N)) - 20)
						.attr("y", scalePopulation(getPopulation(nYear_N)) - 30 - 50) 
						.attr("fill", g_colorBackground)
						.attr("font-size", g_nSVG_FontSize_Number_Hmm + "mm")
						.attr("text-anchor", "end")
						.attr("fill-opacity", g_Opacity_World_2015)
						.attr("text-decoration", "underline")
						.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")")
	        			.text(nYear_N);
					
		domSVGMain_Taiwan.append("text")
						.attr("class", "subfont")
						.attr("x", (scaleYear(nYear_E)) - 20)
						.attr("y", scalePopulation(getPopulation(nYear_E)) - 30) 
						.attr("fill", g_colorBackground)
						.attr("font-size", g_nSVG_FontSize_Number_Hmm + "mm")
						.attr("text-anchor", "end")
						.attr("fill-opacity", g_Opacity_World_2015)
						.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")")
	        			.text((getPopulation(nYear_E) / 1000).toFixed(1) + "m");
					
		domSVGMain_Taiwan.append("text")
						.attr("class", "subfont")
						.attr("x", (scaleYear(nYear_E)) - 20)
						.attr("y", scalePopulation(getPopulation(nYear_E)) + 45) 
						.attr("fill", g_colorBackground_Draw)
						.attr("font-size", g_nSVG_FontSize_Number_Hmm + "mm")
						.attr("text-anchor", "end")
						.attr("fill-opacity", g_Opacity_World_2015)
						.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")")
	        			.text((getPopulation_65(nYear_E) / 1000).toFixed(1) + "m");
					
		domSVGMain_Taiwan.append("text")
						.attr("class", "subfont")
						.attr("x", (scaleYear(nYear_E)) - 20)
						.attr("y", scalePopulation(getPopulation(nYear_E)) - 30 - 50) 
						.attr("fill", g_colorBackground)
						.attr("font-size", g_nSVG_FontSize_Number_Hmm + "mm")
						.attr("text-anchor", "end")
						.attr("fill-opacity", g_Opacity_World_2015)
						.attr("text-decoration", "underline")
						.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")")
	        			.text(nYear_E);

		domSVGMain_Taiwan.append("text")
						.attr("class", "subfont")
						.attr("x", (scaleYear(nYear_E)) - 20)
						.attr("y", scareDependencyRatioOldAge(getDepandancyRatioOldAge(nYear_E)) - 30) 
						.attr("fill", g_colorTaiwan)
						.attr("font-size", g_nSVG_FontSize_Country_Hmm + "mm")
						.attr("text-anchor", "end")
						.attr("fill-opacity", g_Opacity_World_2015)
						.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")")
	        			.text(getDepandancyRatioOldAge(nYear_E));
	}

	{
		domSVGMain_Taiwan.append("line")
								.attr("class", "mouse_select_year")
								.attr("fill-opacity", 0)
								.attr("stroke", g_colorBackground_Draw)
								.attr("stroke-width", "1mm");

		domSVGMain_Taiwan.append("text")
								.attr("class", "mouse_select_year subfont")
								.attr("fill", g_colorBackground_Draw)
								.attr("fill-opacity", 0)
								.attr("font-size", g_nSVG_FontSize_Number_Hmm + "mm")
								.attr("text-anchor", "front");

		domSVGMain_Taiwan.append("text")
								.attr("class", "mouse_select_population subfont")
								.attr("fill", g_colorBackground_Draw)
								.attr("fill-opacity", 0)
								.attr("font-size", g_nSVG_FontSize_Number_Hmm + "mm")
								.attr("text-anchor", "front");

		domSVGMain_Taiwan.append("text")
								.attr("class", "mouse_select_population_65 subfont")
								.attr("fill", g_colorTaiwan)//g_colorBackground)
								.attr("fill-opacity", 0)
								.attr("font-size", g_nSVG_FontSize_Number_Hmm + "mm")
								.attr("text-anchor", "front");

		domSVGMain_Taiwan.append("circle")
								.attr("class", "mouse_select_depancancy_ratio")
								.attr("fill", g_colorTaiwan)
								.attr("fill-opacity", 0);

		domSVGMain_Taiwan.append("text")
								.attr("class", "mouse_select_depancancy_ratio subfont")
								.attr("fill", g_colorTaiwan)
								.attr("fill-opacity", 0)
								.attr("font-size", g_nSVG_FontSize_Number_Hmm + "mm")
								.attr("text-anchor", "middle");
	}

	{
		var line_population = d3.line()
					.x(function(d) { return scaleYear(d.year); })
					.y(function(d) { return scalePopulation((d.population)); })
					.curve(d3.curveBundle);//.curve(d3.curveLinear);
					
		var d_population = line_population(dsTaiwanPopulation);
		
		d_population += ("V" +  + scalePopulation(0));
		d_population += ("H" + scaleYear(nYear_S));
		d_population += ("L" + scaleYear(nYear_S) + "," + scalePopulation(nPopulation_Min));

		domSVGMain_Taiwan.append("path")
						.attr("class", "taiwan_population")
						.attr("d", d_population)
						.attr("fill", g_colorBackground)
						.attr("fill-opacity", 0.0)

						.on("mousemove", function (d) {

							var coordinates = d3.mouse(this);
							var nXpt = coordinates[0];
							var nYpt = coordinates[1];

							//console.log(nXpt, nYpt);

							var year = Math.floor(scaleYear_Reverse(nXpt));

							var dsTaiwanPopulation_Selected = dsTaiwanPopulation.filter(function(d) { if (d.year == year) return d; });

							//console.log(year);
							//console.log(dsTaiwanPopulation_Selected);

							var dsPopulation = dsTaiwanPopulation_Selected[0];

							domSVGMain_Taiwan.select("line.mouse_select_year")
								.attr("x1", 0)
								.attr("y1", scalePopulation(dsPopulation.population))
								.attr("x2", 0)
								.attr("y2", (g_nSVG_Hmm - g_nSVG_Padding_mm) + "mm")
								.attr("stroke", g_colorBackground_Draw)
								.attr("stroke-opacity", g_Opacity_World_2015)
								.attr("transform", "translate(" + nXpt + ", " + 0 + ")");

							domSVGMain_Taiwan.select("text.mouse_select_year")
								.attr("x", 5 + "mm")
								.attr("y", scalePopulation(dsPopulation.population_14 + dsPopulation.population_15_64) + 70)
								.attr("fill-opacity", g_Opacity_World_2015)
								.attr("text-decoration", "underline")
								.attr("transform", "translate(" + nXpt + ", " + 0 + ")")
								.text(year);

							domSVGMain_Taiwan.select("text.mouse_select_population")
								.attr("x", 5 + "mm")
								.attr("y", scalePopulation(dsPopulation.population_14 + dsPopulation.population_15_64) + 120)
								.attr("fill-opacity", g_Opacity_World_2015)
								.attr("transform", "translate(" + nXpt + ", " + 0 + ")")
								.text((dsPopulation.population / 1000).toFixed(1) + "m");

							domSVGMain_Taiwan.select("text.mouse_select_population_65")
								.attr("x", 5 + "mm")
								.attr("y", scalePopulation(dsPopulation.population_14 + dsPopulation.population_15_64) + 170)
								.attr("fill-opacity", g_Opacity_World_2015)
								.attr("transform", "translate(" + nXpt + ", " + 0 + ")")
								.text((dsPopulation.population_65 / 1000).toFixed(1) + "m");

							domSVGMain_Taiwan.select("circle.mouse_select_depancancy_ratio")
								.attr("cx", 0 + "mm")
								.attr("cy", scareDependencyRatioOldAge(dsPopulation.dependency_ratio_old_age))
								.attr("r", 2 + "mm")
								.attr("fill-opacity", g_Opacity_World_2015)
								.attr("transform", "translate(" + nXpt + ", " + 0 + ")");

							console.log(scareDependencyRatioOldAge(dsPopulation.dependency_ratio_old_age));

							domSVGMain_Taiwan.select("text.mouse_select_depancancy_ratio")
								.attr("x", 0 + "mm")
								.attr("y", scareDependencyRatioOldAge(dsPopulation.dependency_ratio_old_age) -50)
								.attr("fill-opacity", g_Opacity_World_2015)
								.attr("transform", "translate(" + nXpt + ", " + 0 + ")")
								.text(dsPopulation.dependency_ratio_old_age);

					    })
						.attr("transform", "translate(" + funcGetWpt(nWpt) + ", " + funcGetHpt(nHpt) + ")");
	}
}

function getPopulation(nYear)
{
	var nPopulation = 0;

	for (var nIdx = 0; nIdx < g_dsTaiwanPopulation.length; nIdx++)
	{
		if (nYear == g_dsTaiwanPopulation[nIdx].year)
		{
			nPopulation = g_dsTaiwanPopulation[nIdx].population;

			break;
		}
	}
	
	return nPopulation;
}

function getPopulation_65(nYear)
{
	var nPopulation = 0;

	for (var nIdx = 0; nIdx < g_dsTaiwanPopulation.length; nIdx++)
	{
		if (nYear == g_dsTaiwanPopulation[nIdx].year)
		{
			nPopulation = g_dsTaiwanPopulation[nIdx].population_65;

			break;
		}
	}
	
	return nPopulation;
}

function getDepandancyRatioOldAge(nYear)
{
	var nDependencyRatioOldAge = 0;

	for (var nIdx = 0; nIdx < g_dsTaiwanPopulation.length; nIdx++)
	{
		if (nYear == g_dsTaiwanPopulation[nIdx].year)
		{
			nDependencyRatioOldAge = g_dsTaiwanPopulation[nIdx].dependency_ratio_old_age;

			break;
		}
	}
	
	return nDependencyRatioOldAge;
}
