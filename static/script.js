

let input = document.getElementById('mainsearchinput');
if (input != null){
    input.addEventListener('input', async function() {
        let response = await fetch('/search?q=' + input.value);
        let jsonfile = await response.json();
        let html = '';
        for (let id=0; id<jsonfile.length; id++) {
            let city = jsonfile[id].city;
            let country = jsonfile[id].country;
            //html += '<div class="autolink"><a href="/weather">' + city + ', ' + country + '</a></div>';
            html += '<div class="autolink"><form action="/weather" method="get"><input type="submit" name="location" value="' + city + ', ' + country + '"></form></div>';
        }
        document.getElementById('autocomplete').innerHTML = html;
    })};

let input2 = document.getElementById('searchinput');
if (input2 != null){
    input2.addEventListener('input', async function() {
        let response = await fetch('/search?q=' + input2.value);
        let jsonfile = await response.json();
        let html = '';
        for (let id=0; id<jsonfile.length; id++) {
            let city = jsonfile[id].city;
            let country = jsonfile[id].country;
            //html += '<div class="autolink"><a href="/weather">' + city + ', ' + country + '</a></div>';
            html += '<div class="topautolink"><i class="fa-solid fa-plus fa-2x"></i><input class="divaddition" type="button" name="location" value="' + city + ', ' + country + '"></div>';
        }
        document.getElementById('topautocomplete').innerHTML = html;
        divaddition();
    })};

/*

let input2 = document.getElementById('searchinput');
if (input2 != null){
    input2.addEventListener('input', async function() {
        let response = await fetch('/search?q=' + input2.value);
        let jsonfile = await response.json();
        let html = '';
        for (let id=0; id<jsonfile.length; id++) {
            let city = jsonfile[id].city;
            let country = jsonfile[id].country;
            //html += '<div class="autolink"><a href="/weather">' + city + ', ' + country + '</a></div>';
            html += '<div class="topautolink"><form action="/weather" method="get"><input class="divaddition" type="submit" name="location" value="' + city + ', ' + country + '"></form></div>';
        }
        document.getElementById('topautocomplete').innerHTML = html;
    })};

*/

/*
let container = document.querySelector('#maincontainer');
if (container != null){
container.addEventListener('DOMContentLoaded', function() {
    document.getElementById('searchbar').style.visibility = "visible";
    console.log('DOM fully loaded and parsed');
})};
*/

let divlist = [];

let container = document.querySelector('#maincontainer');
if (container != null){
    let html = document.getElementById('maincontainer').innerHTML;
    divlist.push(html);
    window.onload = function(){
        document.getElementById('subsearchbarcontainer').style.visibility = "visible";
        document.getElementById('toggle').style.visibility = "visible";
        console.log('DOM fully loaded and parsed');
}};


function divaddition(){

let inputlist = document.getElementsByClassName('divaddition');
if (inputlist){
    for (let i=0; i<inputlist.length; i++){
        inputlist[i].addEventListener('click', async function() {
            if(divlist.length<5){
            let response = await fetch('/adddiv?q=' + inputlist[i].value);
            let jsonfile = await response.json();

            lon = jsonfile["coord"]["lon"]
            lat = jsonfile["coord"]["lat"]
            main = jsonfile["weather"][0]["main"]
            description = jsonfile["weather"][0]["description"]
            icon = jsonfile["weather"][0]["icon"]
            temp = jsonfile["main"]["temp"]
            pressure = jsonfile["main"]["pressure"]
            humidity = jsonfile["main"]["humidity"]
            speed = jsonfile["wind"]["speed"]
            deg = jsonfile["wind"]["deg"]
            country = jsonfile["sys"]["country"]
            cname = jsonfile["name"]

            countryflag = country.toLowerCase()
            c = temp-273.15;
            f = (c*(9/5))+32;

            celcius = c.toFixed(2);
            fahrenheit = f.toFixed(2);

            if ((deg>=348.76 && deg<=360) || (deg<=11.25 && deg>=0)){
                direction = "N"}
            else if (deg>=11.26 && deg<=33.75){
                direction = "NNE"}
            else if (deg>=33.76 && deg<=56.25){
                direction = "NE"}
            else if (deg>=56.26 && deg<=78.75){
                direction = "ENE"}
            else if (deg>=78.76 && deg<=101.25){
                direction = "E"}
            else if (deg>=101.26 && deg<=123.75){
                direction = "ESE"}
            else if (deg>=123.76 && deg<=146.25){
                direction = "SE"}
            else if (deg>=146.25 && deg<=168.75){
                direction = "SSE"}
            else if (deg>=168.76 && deg<=191.25){
                direction = "S"}
            else if (deg>=191.26 && deg<=213.75){
                direction = "SSW"}
            else if (deg>=213.76 && deg<=236.25){
                direction = "SW"}
            else if (deg>=236.26 && deg<=258.75){
                direction = "WSW"}
            else if (deg>=258.76 && deg<=281.25){
                direction = "W"}
            else if (deg>=281.26 && deg<=303.75){
                direction = "WNW"}
            else if (deg>=303.76 && deg<=326.25){
                direction = "NW"}
            else if (deg>=326.26 && deg<=348.75){
                direction = "NNW"}

            console.log(divlist.length);
            console.log(divlist);

            addtolist();

            /*
            for (let q=0; divlist.length>=q; q++){
                if(divlist.length==q){
                    addtolist();
                    return;
                }
            };*/

            /*
            if(divlist.length==0){
                addtolist(0);
            }
            else if(divlist.length==1){
                addtolist(1);
            }
            else if(divlist.length==2){
                addtolist(2);
            }
            else if(divlist.length==3){
                addtolist(3);
            }
            else if(divlist.length==4){
                addtolist(4);
            };*/

                }
            else{
                /*error('You can only view 5 locations at a time! Please remove some.', 'primary');*/
                blackerror('You can only view 5 locations at a time. Please remove some!');
            }
            
        })}};

    };

    function error(message, type){
        
        html = '<div class="alert alert-'+type+' alert-dismissible" role="alert"><div>'+message+'</div><button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
     
        document.getElementById('liveAlertPlaceholder').innerHTML = html;
    };

    function blackerror(message){
        html = '<div id="blackscreen"><div>'+message+'</div><button type="button" class="btn-close" onclick="closeerror()" aria-label="Close"></button></div>';

        document.getElementById('blackAlertPlaceholder').innerHTML = html;
    }

    function closeerror(){
        document.getElementById('blackAlertPlaceholder').innerHTML = '';
    }

    function addtolist(){
        let html = '<div class="weatherdiv"><div class="smallerweatherdiv"><div class="weathername"><span>'+cname+', '+country+'</span><img src="https://openweathermap.org/images/flags/'+countryflag+'.png"></div><div class="weathertemp"><span class="celcius">around <span>'+celcius+'°C</span></span> <span class="fahrenheit">around <span>'+fahrenheit+'°F</span></span></div><div class="weatherimage"><img src="http://openweathermap.org/img/wn/'+icon+'@2x.png"><div class="windflex"><span class="windflextext">Wind: <span>'+direction+'</span> '+speed+'m/s</span><i style="transform: rotate('+deg+'deg);" class="fa-solid fa-location-arrow"></i></div></div><div class="weathermisc"><h5>Forecast: '+main+'</h5><h6>'+description+'</h6></div></div></div>';
        divlist.push(html);

        /*let string = divlist.join(' ');*/
        document.getElementById('maincontainer').innerHTML = '';
        for (let i=0; divlist.length>i; i++){
        document.getElementById('maincontainer').innerHTML += divlist[i];
        }
    }


    function removefromlist(){
        console.log(divlist.length);
        divlist.pop();
        console.log(divlist.length);
        document.getElementById('maincontainer').innerHTML = '';
        for (let i=0; divlist.length>i; i++){
            console.log(i);
        document.getElementById('maincontainer').innerHTML += divlist[i];
        }
    };

    if(document.getElementById('topautocomplete')){
    window.addEventListener('click', function(e){   
        if (document.getElementById('topautocomplete').contains(e.target)){
            return
        }
        else if(document.getElementById('searchbar').contains(e.target)){
            return
        }
        else{
            document.getElementById('topautocomplete').innerHTML = '';
        }
      })};

    if(document.getElementById('autocomplete')){
    window.addEventListener('click', function(e){   
        if (document.getElementById('autocomplete').contains(e.target)){
            return
        }
        else if(document.getElementById('mainsearchbar').contains(e.target)){
            return
        }
        else{
            document.getElementById('autocomplete').innerHTML = '';
        }
      })};


    function toggleoff(){
        document.getElementById('toggleoff').style.display = "none";
        document.getElementById('toggleon').style.display = "block";
        let c = document.getElementsByClassName('celcius');
        let f = document.getElementsByClassName('fahrenheit');
        for (let i=0; divlist.length>i; i++){
        c[i].style.display = "none";
        f[i].style.display = "block";
        }
    };

    function toggleon(){
        document.getElementById('toggleoff').style.display = "block";
        document.getElementById('toggleon').style.display = "none";
        let c = document.getElementsByClassName('celcius');
        let f = document.getElementsByClassName('fahrenheit');
        for (let i=0; divlist.length>i; i++){
        c[i].style.display = "block";
        f[i].style.display = "none";
        }
    };