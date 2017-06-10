// ClearBlade

var cb = new ClearBlade();
var initOptions = {
    URI: "https://machineq.clearblade.com",
    messagingURI: "machineq.clearblade.com",
    messagingPort: 8904,
    useMQTT: true,
    cleanSession: true,
    systemKey: "fe84ba920bce84d088a1ded934",
    systemSecret: "FE84BA920BFCD28284EDD5FD9AB601",
    email: "hi@crystalfruit.co",
    password: "supsupsup"
}

cb.init(initOptions);

// ---- //

// Helper
function hex2dec(hex) {
    hex = hex.split(/\./);
    var len = hex[1].length;
    hex[1] = parseInt(hex[1], 16);
    hex[1] *= Math.pow(16, -len);
    return parseInt(hex[0], 16) + hex[1];
}

// --- //

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
    var query = cb.Query({ collectionName: "Sensor Data" });
    query.setPage(1, 0);
    query.fetch(function (err, data) {
        if (err) {
            console.log(err);
        }
        else {
            console.log(data);
            for(var i = 0; i < data.length; i++) {
                var randLon = (Math.random() * (0.12) + 39.897642).toFixed(4)
                var randLat = (Math.random() * (0.12) + 75.132877).toFixed(4) * -1
                L.marker([randLon, randLat]).addTo(potholeMap)
            }
        }
    })

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

var polygon2 = L.polygon([
    [39.944520, -75.151098],
    [39.934510, -75.151048],
    [39.941504, -75.151989]
], {
        color: "orange"
    }).addTo(predictionMap);

var polygon3 = L.polygon([
    [39.944520, -75.251098],
    [39.934510, -75.231048],
    [39.941504, -75.201989]
], {
        color: "orange"
    }).addTo(predictionMap);

function refreshAreas() {
    alert('refreshing areas~')
}

