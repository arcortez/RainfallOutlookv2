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

function openTip(){
    document.getElementById("tiptag").style.display = "none";
    document.getElementById("agritips").style.display = "block";
}

function closeTip(){
    document.getElementById("tiptag").style.display = "block";
    document.getElementById("agritips").style.display = "none";   
}

function openPage(string){
    if(currentPage != string){
        document.getElementById("scheme").style.display = "none";
        document.getElementById("home").style.display = "none";
        document.getElementById("data").style.display = "none";
        document.getElementById("footer").style.display = "none";
        document.getElementById("downloads").style.display = "none";
        document.getElementById("settings").style.display = "none";
        document.getElementById("main").style.backgroundColor = "white";
        document.getElementById("main").style.color = "black";
        document.getElementById("hometag").style.color = "white";
        document.getElementById("tabletag").style.color = "white";
        document.getElementById("abouttag").style.color = "white";
        document.getElementById("hometag").style.backgroundColor = "#444440";
        document.getElementById("tabletag").style.backgroundColor = "#444440";
        document.getElementById("abouttag").style.backgroundColor = "#444440";
        document.getElementById("hometag").style.borderBottom = "0px";
        document.getElementById("tabletag").style.borderBottom = "0px";
        document.getElementById("abouttag").style.borderBottom = "0px";
        document.getElementById("backarrow").style.display = "none";

        if(string =='home'){
            document.getElementById("home").style.display = "block"; 
            currentPage = 'home';
            document.getElementById("hometag").style.color = "#28a745";
            document.getElementById("hometag").style.backgroundColor = "white";
            document.getElementById("hometag").style.borderBottom = "3px solid #28a745";
        }else if(string =='maps'){
            document.getElementById("maps").style.display = "block"; 
            currentPage = 'maps';
        }else if(string =='data'){
            document.getElementById("data").style.display = "block";
            currentPage = 'data';



            document.getElementById("backarrow").style.display = "inline-block";
            document.getElementById("tabletag").style.color = "#007bff";
            document.getElementById("tabletag").style.backgroundColor = "white";
            document.getElementById("tabletag").style.borderBottom = "3px solid #007bff";
        }else if(string =='downloads'){
            document.getElementById("downloads").style.display = "block";
            currentPage = 'downloads';
        }else if(string =='settings'){
            document.getElementById("settings").style.display = "block";
            currentPage = 'settings';
        }else if(string == 'footer'){

            document.getElementById("backarrow").style.display = "inline-block";
            document.getElementById("footer").style.display = "block";
            document.getElementById("main").style.backgroundColor = "#444440";
            document.getElementById("main").style.color = "white";
            document.getElementById("abouttag").style.color = "#28a745";
            currentPage = 'footer';
        }
    }else{
        //do nothing
    }

}

document.getElementById('displays').provinceSelect.onchange = changeP;

function changeP(){
    var changeID = document.getElementById('displays').provinceSelect.value;
    var loaded = angular.element(document.getElementById("fullscale")).scope();
    //trigger angular function in controller.js
    loaded.$apply(function(){
        loaded.changeCurrentProvince(changeID);
    })
}


document.getElementById('displays').muniSelect.onchange = changeM;

function changeM(){
    var changeID = document.getElementById('displays').muniSelect.value;
    var loaded = angular.element(document.getElementById("fullscale")).scope();

    //trigger angular function in controller.js
    loaded.$apply(function(){
        loaded.changeDisplayArr(changeID);
    })
}

function onDeviceReady(){
    d3.csv("data/Forecast.csv", parseData);
    document.getElementById('main').style.display = 'block';
    document.getElementById('page-header').style.display = 'block';
    openPage('home');   

    document.addEventListener("deviceready", ONDReady, false);
}

function ONDReady(){
    document.addEventListener("backbutton", onBackKeyDown, false);
    console.log("ONDREADY")
}

function onBackKeyDown(){
    openPage('home');
}

function onMapReady(){
    d3.json("data/Provinces.json", drawMaps);
    document.getElementById('maploaderx').innerHTML= "Loading... Please Wait.";
}


function setM(val){
    document.getElementById('displays').muniSelect.value = val.id;
    changeM();
}

function setP(){
    document.getElementById('displays').pkey.value
    document.getElementById('displays').provinceSelect.value = val.id;
    changeP();
}


function recolor(){
    var recoloredMuni = [];
    var changeTo = document.getElementById('re_schema').value;

    if(changeTo == scheme){
        console.log('no change')
        document.getElementById('schemenote').innerHTML = "* color scheme has not changed."
        return;
    }else{
        document.getElementById('schemenote').innerHTML = "";
        openPage('home');
        var loaded = angular.element(document.getElementById("fullscale")).scope();
        loaded.$apply(function(){
            loaded.changeLBAR(true);
        });

        if(changeTo == 'FOUR'){ //taking from predefined colorarr
            colorarr = colorschemes[1];
        }else if(changeTo == 'BLUE'){
            colorarr = colorschemes[0];
        }

        for(let each of allMunicipalities){
            for(let x of each.array){
                x.color = getColorVal(x.value, changeTo);
                x.textcolor = getTextColor(x.value, changeTo);
            }
            for(let y of each.municipalities){
                for(let z of y.array){
                    z.color = getColorVal(z.value, changeTo);
                    z.textcolor = getTextColor(z.value, changeTo);
                }
            }
        }

        console.log(allMunicipalities);

        document.getElementById('maps').innerHTML ="<div class='upper-border'><p class='font20 center bottomless'>Six Month Nationwide Rainfall Outlook</p></div><div class='map'> <div class='map-holder'></div> </div><div class='map'> <div class='map-holder'></div> </div><div class='map'> <div class='map-holder'></div> </div><div class='map'> <div class='map-holder'></div> </div><div class='map'> <div class='map-holder'></div> </div><div class='map'> <div class='map-holder'></div> </div>";
        
        
        loaded.$apply(function(){
            loaded.REloadProvinceData();
        });
    }
}