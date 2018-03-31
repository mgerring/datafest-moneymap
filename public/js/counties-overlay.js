var layer;
var layer_data;
var scale = d3.scale.linear();
scale.domain([1,100]).rangeRound([1,10]);

function addOverlay(house) {

  var svg = d3.select(map.getPanes().overlayPane).append("svg"),
      g   = svg.append("g").attr("class", "leaflet-zoom-hide");

  layer_data = $.ajax({
    url : data_dir+"ca/data-"+house+".json",
    async: false,
    dataType: 'json',
  });
  layer_data = $.parseJSON(layer_data.responseText);

    d3.json(data_dir+"/ca/bound-"+house+".json", function(collection) {
      var bounds = d3.geo.bounds(collection),
          path = d3.geo.path().projection(project);

      var feature = g.selectAll("path")
          .data(collection.features)
        .enter()
          .append("path")
          .attr('data-name', function(d){ return d.properties.name; })
          .attr('class', function(d){if( typeof layer_data[d.properties.district] != 'undefined' ) { var blah = scale( layer_data[d.properties.district]["votesperregisterednorm"] ); return 'apathy-'+blah; } })
          .on('mouseover',function(d){
            if( typeof layer_data[d.properties.district] != 'undefined' ) {
              vpe = (layer_data[d.properties.district]["votespereligible"] * 100).toFixed(0);
              vpr = (layer_data[d.properties.district]["votesperregistered"] * 100).toFixed(0);
              $("#mouseinfo").html(d.properties.name + "<br/>" +
                "$/eligible: " + layer_data[d.properties.district]["moneypereligiblevoter"] + "<br/>" +
                "# Contributions: " + layer_data[d.properties.district]["nocontributions"] + "<br/>" +
                "Total spent: $" + layer_data[d.properties.district]["totalmoneyspent"] + "<br/>" +
                "Votes/eligible: " + vpe + "%" + "<br/>" +
                "Votes/registered: " + vpr + "%"
              );
            } else {
              $("#mouseinfo").html(d.properties.name + "<br/>" +
                "No data for 2012"
              );
            }
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

$(function($){
  $("#toggle [name='leg-layer']").change(function(){
    layer.remove();
    layer = addOverlay($(this).val() );
  });
  $(window).load(function(){
      layer = addOverlay("l");
  });
});
