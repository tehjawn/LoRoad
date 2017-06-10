$('.button-collapse').sideNav();

$('.collapsible').collapsible();

$('select').material_select();

// Map

var mymap = L.map('map').setView([39.9526, -75.1652], 12);
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'pk.eyJ1IjoidGVoamF3biIsImEiOiJjaWo3YXhoeGQwMDI5MHJsdmpkNWtsaThwIn0._dx3gY6_FsDvofCObZKp2Q'
}).addTo(mymap);