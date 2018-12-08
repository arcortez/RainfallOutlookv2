var app = angular.module("app", []); 

app.controller('Controller', ['$scope', function($scope) {
	
	$scope.showProvince = true;
	$scope.showMunicipality = false;

	$scope.provincedata = [];
	$scope.months = [];

	$scope.currentProvince = "allProvinces"
	$scope.currentMunicipality = "all"

	$scope.municipalData = $scope.provincedata[0];

	$scope.loadingbar = true;
	$scope.notif = "Loading Data. Please Wait.";

	$scope.displayarr = [];
	var trigger = false;

	$scope.loadProvinceData = function() {
		$scope.currentProvince = "allProvinces"
		$scope.showProvince = true;
		$scope.showMunicipality = false;
		$scope.provincedata = allMunicipalities;
		$scope.months = monthspan;
		$scope.municipalData = $scope.provincedata[0];
		$scope.notif = "";
		// console.log($scope.provincedata);
		// console.log($scope.months);
		// console.log($scope.currentScheme);

		var arr = $scope.municipalData.array;
		var newarr = [];
		for(let each of arr){
			var obj = {
				id: each.id,
				value: Math.round(each.value),
				color: each.color,
				textcolor: each.textcolor
			};
			newarr.push(obj);
		}
		
		$scope.displayarr = newarr;
		$scope.loadingbar = false;

	}

	$scope.changenotif = function(string) {
		$scope.notif = string;
	}

	$scope.onChangedProvince = function() {
		// console.log($scope.currentProvince);	
		$scope.municipalData = $scope.provincedata[parseInt($scope.currentProvince.id)]
		$scope.muniArr = $scope.municipalData.municipalities;
	}

	$scope.changeCurrentProvince = function(string) {
		$scope.showMunicipality = true;
		$scope.showProvince = false;
		$scope.municipalData = $scope.provincedata[parseInt(string)];
		// console.log($scope.municipalData)

		var arr = $scope.municipalData.array;
		var newarr = [];
		for(let each of arr) {
			var obj = {
				id: each.id,
				value: Math.round(each.value),
				color: each.color,
				textcolor: each.textcolor
			};
			newarr.push(obj);
		}
		
		$scope.displayarr = newarr;
	}

	$scope.changeDisplayArr = function(val) {
		
		if(val == "all") {
			
			var arr = $scope.municipalData.array;
			var newarr = [];
			for(let each of arr){
				var obj = {
					id: each.id,
					value: Math.round(each.value),
					color: each.color,
					textcolor: each.textcolor
				};
				newarr.push(obj);
			}

			$scope.displayarr = newarr;

		}else {
			var muns = $scope.municipalData.municipalities;
			
			var arr = muns[parseInt(val)].array;
			var newarr = [];
			for(let each of arr){
				var obj = {
					id: each.id,
					value: Math.round(each.value),
					color: each.color,
					textcolor: each.textcolor
				};
				newarr.push(obj);
			}
			
			$scope.displayarr = newarr;
		}
	}


	$scope.changeLBAR = function(bool){
		$scope.loadingbar = bool;
		$scope.notif = "Loading Data. Please Wait.";
	}
}]);