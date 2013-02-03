var layer;
var data;
var layer_data;

function addOverlay(house) {

  var svg = d3.select(map.getPanes().overlayPane).append("svg"),
      g   = svg.append("g").attr("class", "leaflet-zoom-hide");

  $.getJSON(data_dir+"ca/data-"+house+".json", function(data) {
    layer_data = data;
  });

    d3.json(data_dir+"/ca/bound-"+house+".json", function(collection) {
      var bounds = d3.geo.bounds(collection),
          path = d3.geo.path().projection(project);

      var feature = g.selectAll("path")
          .data(collection.features)
        .enter()
          .append("path")
          .attr('data-name', function(d){ return d.properties.name })
          .on('mouseover',function(d){
            vpe = (layer_data[d.properties.district]["votespereligible"] * 100).toFixed(0);
            vpr = (layer_data[d.properties.district]["votesperregistered"] * 100).toFixed(0);
            $("#mouseinfo").html(d.properties.name + "<br/>" +
              "$/eligible: " + layer_data[d.properties.district]["moneypereligiblevoter"] + "<br/>" +
              "# Contributions: " + layer_data[d.properties.district]["nocontributions"] + "<br/>" +
              "Total $ spent: $" + layer_data[d.properties.district]["totalmoneyspent"] + "<br/>" +
              "Votes/eligible: " + vpe + "%" + "<br/>" +
              "Votes/registered: " + vpr + "%"
            );
          });

      map.on("viewreset", reset);
      reset();

      // Reposition the SVG to cover the features.
      function reset() {
        var bottomLeft = project(bounds[0]),
            topRight = project(bounds[1]);

        svg.attr("width", topRight[0] - bottomLeft[0])
          .attr("height", bottomLeft[1] - topRight[1])
          .style("margin-left", bottomLeft[0] + "px")
          .style("margin-top", topRight[1] + "px");

        g.attr("transform", "translate(" + -bottomLeft[0] + "," + -topRight[1] + ")");

        feature.attr("d", path);
      }

      // Use Leaflet to implement a D3 geographic projection.
      function project(x) {
        var point = map.latLngToLayerPoint(new L.LatLng(x[1], x[0]));
        return [point.x, point.y];
      }

    });
  return svg;
}

function make_fullscreen() {
  var page = document.getElementById('viewport'),
      ua = navigator.userAgent,
      iphone = ~ua.indexOf('iPhone') || ~ua.indexOf('iPod'),
      ipad = ~ua.indexOf('iPad'),
      ios = iphone || ipad,
      // Detect if this is running as a fullscreen app from the homescreen
      fullscreen = window.navigator.standalone,
      android = ~ua.indexOf('Android'),
      lastWidth = 0;

  if (android) {
    // Android's browser adds the scroll position to the innerHeight, just to
    // make this really fucking difficult. Thus, once we are scrolled, the
    // page height value needs to be corrected in case the page is loaded
    // when already scrolled down. The pageYOffset is of no use, since it always
    // returns 0 while the address bar is displayed.
    window.onscroll = function() {
      page.style.height = window.innerHeight + 'px'
    } 
  }
  var setupScroll = window.onload = function() {
    // Start out by adding the height of the location bar to the width, so that
    // we can scroll past it
    if (ios) {
      // iOS reliably returns the innerWindow size for documentElement.clientHeight
      // but window.innerHeight is sometimes the wrong value after rotating
      // the orientation
      var height = document.documentElement.clientHeight;
      // Only add extra padding to the height on iphone / ipod, since the ipad
      // browser doesn't scroll off the location bar.
      if (iphone && !fullscreen) height += 60;
      page.style.height = height + 'px';
    } else if (android) {
      // The stock Android browser has a location bar height of 56 pixels, but
      // this very likely could be broken in other Android browsers.
      page.style.height = (window.innerHeight + 56) + 'px'
    }
    // Scroll after a timeout, since iOS will scroll to the top of the page
    // after it fires the onload event
    setTimeout(scrollTo, 0, 0, 1);
  };
  (window.onresize = function() {
    var pageWidth = page.offsetWidth;
    // Android doesn't support orientation change, so check for when the width
    // changes to figure out when the orientation changes
    if (lastWidth == pageWidth) return;
    lastWidth = pageWidth;
    setupScroll();
  })();
}

$(function($){
  $("#toggle [name='leg-layer']").change(function(){
    layer.remove();
    layer = addOverlay($(this).val() );
  });
  $(window).load(function(){
      layer = addOverlay("l");
      make_fullscreen();
  });
});
