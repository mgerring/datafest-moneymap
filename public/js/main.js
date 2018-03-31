var map,
	layer;
(function($){
  if (getCookie('datafest-moneymap') !== 'hide-overlay-on-load') {
	  $('#splash').show();
  }
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
		setCookie('datafest-moneymap','hide-overlay-on-load',30);
	});
	$('#about').click(function(e) {
	  $('#splash').show();
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

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name) {
    document.cookie = name+'=; Max-Age=-99999999;';
}
