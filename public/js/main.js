var map,
	layer;
(function($){
  layer = new L.StamenTileLayer("toner-lite");
	map = L.map('mapLayer', {
	  center: L.latLng(37.476526, -119.938271),
    zoom: 6,
	  maxZoom: 19
	});
	map.addLayer(layer);
	$('#splash button').click(function(e){
		e.preventDefault();
		$('#splash').hide();
	});
	$('footer .drawer').toggle(
		function(){
			$('body').addClass('footer-up');
		},
		function(){
			$('body').removeClass('footer-up')
		}
	);
})($);
