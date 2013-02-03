var svg = d3.select(map.getPanes().overlayPane).append("svg"),
    g 	= svg.append("g").attr("class", "leaflet-zoom-hide");

/*d3.json(data_dir + "ca_asembly.json", function(collection) {
	console.log('loaded');

	var project = function(x) {
		var point = map.latLngToLayerPoint(new L.LatLng(x[1], x[0]));
		return [point.x, point.y];
	}
	var path = d3.geo.path().projection(project);
	var feature = g.selectAll("path")
    				.data(collection.features)
  					.enter().append("path");

  	var bounds 		= d3.geo.bounds(collection),

    //feature.attr("d", path);

    reset = function(){
    	var bottomLeft 	= project(bounds[0]),
    		topRight 	= project(bounds[1]);
    	svg .attr("width", topRight[0] - bottomLeft[0])
    		.attr("height", bottomLeft[1] - topRight[1])
    		.style("margin-left", bottomLeft[0] + "px")
    		.style("margin-top", topRight[1] + "px");

		g   .attr("transform", "translate(" + -bottomLeft[0] + "," + -topRight[1] + ")");

		feature.attr("d", path);
    }

    map.on('viewreset',reset);
    reset();
});*/