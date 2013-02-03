var map,
	layer;
(function($){
	map = L.map('map',{maxZoom: 19});
	layer = new L.StamenTileLayer("toner-lite");
	map.addLayer(layer).locate({setView: true, maxZoom: 16});
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