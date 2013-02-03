var map,
	layer;


(function($){
map = L.map('map',{maxZoom: 19});
layer = new L.StamenTileLayer("terrain");
map.addLayer(layer).locate({setView: true, maxZoom: 16});
})($);