// ClearBlade

var cb = new ClearBlade();
var initOptions = {
    URI : "https://machineq.clearblade.com",
    messagingURI : "machineq.clearblade.com",
    messagingPort: 8904,
    useMQTT: true,
    cleanSession: true,
    systemKey: "fe84ba920bce84d088a1ded934",
    systemSecret: "FE84BA920BFCD28284EDD5FD9AB601",
    email: "crystalfruit.john@gmail.com",
    password: "makingbacon"
}

cb.init(initOptions);

// ---- //

$('.button-collapse').sideNav();

$('.collapsible').collapsible();

$('select').material_select();

// Pothole Identification Map

var potholeMap = L.map('potholeMap').setView([39.96526, -75.1652], 12);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.light',
    accessToken: 'pk.eyJ1IjoidGVoamF3biIsImEiOiJjaWo3YXhoeGQwMDI5MHJsdmpkNWtsaThwIn0._dx3gY6_FsDvofCObZKp2Q'
}).addTo(potholeMap);

var marker = L.marker([39.953110, -75.172455]).addTo(potholeMap);

function refreshMarkers() {
    alert('refreshing markers~')
}



// Pothole Prediction Map

var predictionMap = L.map('predictionMap').setView([39.96526, -75.1652], 12);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.dark',
    accessToken: 'pk.eyJ1IjoidGVoamF3biIsImEiOiJjaWo3YXhoeGQwMDI5MHJsdmpkNWtsaThwIn0._dx3gY6_FsDvofCObZKp2Q'
}).addTo(predictionMap);

var polygon = L.polygon([
    [39.954820, -75.151098],
    [39.951004, -75.151999]
], {
    color: "orange"
}).addTo(predictionMap);

function refreshAreas() {
    alert('refreshing areas~')
}

