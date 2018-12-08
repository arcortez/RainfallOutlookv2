  
$(window).resize(function() {
  svg
    .attr("width", $(".map-holder").width())
    .attr("height", $(".map-holder").height())
  ;  
}); //for debugging/testing

function getColorVal(num){
	if(num < 100) return "#eceff1";
	else if(num >= 100 && num <250) return "#b3e5fc";
	else if(num >=250 && num <=500) return "#039be5";
	else if(num > 500) return "#01579b";
	else console.log('invalid input >> '+num);
}

function getTextColor(num){
	if(num < 250) return "black";
	else return "white"
}

var svg = d3.selectAll(".map-holder")
  .append("svg")
  .attr("width", $(".map-holder").width())
  .attr("height", $(".map-holder").height());
  
var width = $(".map-holder").width();
var height = $(".map-holder").height();

// var scale_value = 700;

// var projection = d3
// 	.geoEquirectangular()
// 	.center([155, 1]) //the lat-long degrees of the philippines
// 	.scale(scale_value);

var scale_value = 500;

var projection = d3
	.geoEquirectangular()
	.center([170, -4]) //the lat-long degrees of the philippines
	.scale(scale_value);

var path = d3
  .geoPath()
  .projection(projection)
;

var provlist = [];
d3.csv("data/Forecast-Provinces.csv", parseProv)
function parseProv(data){
	for(let each of data){
		provlist.push(each.Provinces);
	}

}

var allMunicipalities = [];
var monthspan = [];
var colorarr;
var scheme;

function parseData(data){
	// console.log(data)

	monthspan = data.columns; // will be used late in controller.js
	monthspan.shift(); // removes first column header of csv file, uneeded
	// console.log(monthspan);

	data.push({Municipality:"end"}); // to mark end of iteration in parsing

	var currentProvince = provlist.shift(); //dequeue
	var nextProvince = provlist.shift();
	
	var provinceCount = 0; // for IDs
	var municipalityCount = 0;

	var pMuni = [];
	for(let each of data){
		var currProvAsObject;
		var arrayofvalues = [];

		var keylist = Object.keys(each);
		var entryString = each[keylist[0]]; // array of objects do not have index, a workaround

		// console.log(each); //checking by sight

		if(entryString == "Abra"){ 
			currProvAsObject = each;
			continue;
		}

		/*
		CSV File Format:
		
		Prov/Muni   Month1 Month2 ...  Month6
		Prov
		Muni
		Muni
		...
		Prov
	
		*/

		if(entryString == nextProvince || entryString == "end"){ // if province is encountered.
			var keys = Object.keys(currProvAsObject);
			for(let i=1;i<keys.length;i++){
				var val = currProvAsObject[keys[i]];
				arrayofvalues.push({
					id: i-1,
					value: val,
					color: getColorVal(val),
					textcolor: getTextColor(val)
				});
			}

			allMunicipalities.push({
				id: provinceCount,
				province: currentProvince,
				array: arrayofvalues,
				municipalities: pMuni
			});

			provinceCount++;
			municipalityCount = 0;
			pMuni = [];
			currentProvince = nextProvince;
			nextProvince = provlist.shift();
			currProvAsObject = each;
		}else{
			var name = entryString
			var arr = [];
			var carr = [];

			var keys = Object.keys(each);
			var len = keys.length;
			for(let i=1;i<len;i++){
				var temp = each[keys[i]]
				arr.push({
					id: i-1,
					value: temp,
					color: getColorVal(temp),
					textcolor: getTextColor(temp)					
				});
			}
			var obj = {
				id: municipalityCount,
				Municipality: name,
				array: arr
			}
			municipalityCount += 1;
			// console.log(each);
			// console.log(arr);
			pMuni.push(obj);
		}
	}
	// console.log(allMunicipalities)

    var loaded = angular.element(document.getElementById("fullscale")).scope();
    loaded.$apply(function(){
        loaded.loadProvinceData();
    })
}



//d3js
function drawMaps (geojson){
	// console.log('mapping')
	var t = 0;
	var m = 0;
	var p = 0;
	var provinces = svg.append("g").attr("class", "geo");
	
	provinces
		.append("rect")
		.attr("x", 0)
		.attr("y", 0)
		.attr("width", width)
		.attr("height", height)
		.attr("fill", "white");

	provinces
		.append("text")
		.attr("x", 25)
		.attr("y", 25)
		.attr("fill", "#d0d0d0")
		.attr("style", "opacity: .8;")
		.attr("font-size", "14px")
		.text(function(d){
			var string = monthspan[p].toUpperCase();
			p++;
			// console.log(string);
			return string;
		});

	var prov = provinces
		.selectAll("path")
		.data(geojson.features)
		.enter()
		.append("path")
		.attr("d", path)
		.attr("fill", function(d){
			var provnumberID = parseInt(d.properties.ID_1) - 1;
			var colorstring = allMunicipalities[provnumberID].array[m].color	
			if(d.properties.ID_1 == 82){
				m++;
			}
			return colorstring;
		});
	
	
	var loaded = angular.element(document.getElementById("fullscale")).scope();
    loaded.$apply(function(){
        loaded.changeLBAR(false);
    })
}