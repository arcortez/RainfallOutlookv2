var currentPage = '';
document.addEventListener("deviceready", onDeviceReady, false);

function openNav() {
    document.getElementById("mySidenav").style.display = "block";
    document.getElementById('schemenote').innerHTML = "";
}

function closeNav() {
    document.getElementById("mySidenav").style.display = "none";
    closeTip();
}

function openTip() {
    document.getElementById("tiptag").style.display = "none";
    document.getElementById("agritips").style.display = "block";
}

function closeTip() {
    document.getElementById("tiptag").style.display = "block";
    document.getElementById("agritips").style.display = "none";   
}

function openPage(string) {

    if(currentPage != string) {

        document.getElementById("home").style.display = "none";
        document.getElementById("data").style.display = "none";
        document.getElementById("about").style.display = "none";
        document.getElementById("backarrow").style.display = "none";
        
        document.getElementById("main").style.backgroundColor = "white";
        document.getElementById("main").style.color = "black";

        document.getElementById("hometag").style.color = "white";
        document.getElementById("hometag").style.backgroundColor = "#444440";
        document.getElementById("hometag").style.borderBottom = "0px";

        document.getElementById("tabletag").style.color = "white";
        document.getElementById("tabletag").style.backgroundColor = "#444440";
        document.getElementById("tabletag").style.borderBottom = "0px";

        document.getElementById("abouttag").style.color = "white";
        document.getElementById("abouttag").style.backgroundColor = "#444440";
        document.getElementById("abouttag").style.borderBottom = "0px";

        if(string =='home') {

            document.getElementById("home").style.display = "block"; 
            currentPage = 'home';

            document.getElementById("hometag").style.color = "#28a745";
            document.getElementById("hometag").style.backgroundColor = "white";
            document.getElementById("hometag").style.borderBottom = "3px solid #28a745";
        }
        else if(string =='data') {

            document.getElementById("data").style.display = "block";
            currentPage = 'data';

            document.getElementById("backarrow").style.display = "block";
            document.getElementById("tabletag").style.color = "#28a745";
            document.getElementById("tabletag").style.backgroundColor = "white";
            document.getElementById("tabletag").style.borderBottom = "3px solid #28a745";
        }
        else if(string == 'about'){

            document.getElementById("backarrow").style.display = "block";
            document.getElementById("about").style.display = "block";
            currentPage = 'about';

            document.getElementById("main").style.backgroundColor = "#444440";
            document.getElementById("main").style.color = "white";
            document.getElementById("abouttag").style.color = "#28a745";
        }
    }
}

document.getElementById('displays').provinceSelect.onchange = changeP;
function changeP() {
    var changeID = document.getElementById('displays').provinceSelect.value;
    var loaded = angular.element(document.getElementById("fullscale")).scope();

    //trigger angular function in controller.js
    loaded.$apply(function(){
        loaded.changeCurrentProvince(changeID);
    })
}


document.getElementById('displays').muniSelect.onchange = changeM;
function changeM() {
    var changeID = document.getElementById('displays').muniSelect.value;
    var loaded = angular.element(document.getElementById("fullscale")).scope();

    //trigger angular function in controller.js
    loaded.$apply(function(){
        loaded.changeDisplayArr(changeID);
    })
}

function onDeviceReady() {
    d3.csv("data/Forecast.csv", parseData);
    document.getElementById('main').style.display = 'block';
    document.getElementById('page-header').style.display = 'block';
    openPage('home');   
}

function onMapReady() {
    var loaded = angular.element(document.getElementById("fullscale")).scope();
    loaded.$apply( function() {
        loaded.changeLBAR(true);
    });

    document.getElementById('maploader').innerHTML= ""; 
    d3.json("data/Provinces.json", drawMaps);
}


function setM(val) {
    document.getElementById('displays').muniSelect.value = val.id;
    changeM();
}

function setP() {
    document.getElementById('displays').pkey.value
    document.getElementById('displays').provinceSelect.value = val.id;
    changeP();
}
