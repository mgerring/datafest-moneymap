var map = L.map('map',{maxZoom: 19});
var layer = new L.StamenTileLayer("toner-lite");
map.addLayer(layer).locate({setView: true, maxZoom: 16});


/*(function($){

})($);*/
