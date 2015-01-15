'use strict';

/**
 * @ngdoc function
 * @name accessimapEditeurDer.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the accessimapEditeurDer
 */
angular.module('accessimapEditeurDerApp')
  .controller('MainCtrl', ['$scope', '$http', 'usSpinnerService', 'mapService', 'settings',
    function ($scope, $http, usSpinnerService, mapService, settings) {

  var width = Math.max(960, window.innerWidth),
      height = Math.max(500, window.innerHeight);

  var tile = d3.geo.tile()
      .size([width, height]);

  var projection = d3.geo.mercator()
      .scale((1 << 22) / 2 / Math.PI)
      .translate([width / 2, height / 2]);

  var center = projection(settings.leaflet.GLOBAL_MAP_CENTER);

  var path = d3.geo.path()
      .projection(projection);

  var zoom = d3.behavior.zoom()
      .scale(projection.scale() * 2 * Math.PI)
      .scaleExtent([1 << 11, 1 << 26])
      .translate([width - center[0], height - center[1]])
      .on("zoom", zoomed);

  var svg = d3.select("#map").append("svg")
      .attr("width", width)
      .attr("height", height);

  var raster = svg.append("g")
      .attr("class", "tiles");

  var vector = svg.append("path");

  svg.call(zoom);
  zoomed();

  function zoomed() {
    var tiles = tile
        .scale(zoom.scale())
        .translate(zoom.translate())
        ();
    vector
        .attr("d", path);
    projection
        .scale(zoom.scale() / 2 / Math.PI)
        .translate(zoom.translate());

    var image = raster
        .attr("transform", "scale(" + tiles.scale + ")translate(" + tiles.translate + ")")
      .selectAll("image")
        .data(tiles, function(d) { return d; });

    image.exit()
        .remove();

    image.enter().append("image")
        .attr("xlink:href", function(d) { return "http://" + ["a", "b", "c"][Math.random() * 3 | 0] + ".tile.osm.org/" + d[2] + "/" + d[0] + "/" + d[1] + ".png"; })
        .attr("width", 1)
        .attr("height", 1)
        .attr("x", function(d) { return d[0]; })
        .attr("y", function(d) { return d[1]; });
  }

  $scope.geojson = [];

  $scope.queryChoices = settings.QUERY_LIST;
  $scope.queryChosen = $scope.queryChoices[0];

  function downloadSidewalks() {
    usSpinnerService.spin('spinner-1');

    console.log(mapService);

    var boundsNW = mapService.formatLocation(projection.invert([0, 0]), zoom.scale());
    var boundsSE = mapService.formatLocation(projection.invert([width, height]), zoom.scale());
    var mapS = boundsSE.lat,
        mapW = boundsNW.lon,
        mapN = boundsNW.lat,
        mapE = boundsSE.lon;
    $http.get(settings.XAPI_URL + '[out:json];(way'+ $scope.queryChosen.query + '(' + mapS + ',' + mapW + ',' + mapN + ',' + mapE + '););out body;>;out skel qt;').
      success(function(data, status, headers, config) {
        var osmGeojson = osmtogeojson(data);

        var path = d3.geo.path()
            .projection(projection);

        svg.call(zoom);
        vector.datum({type: "FeatureCollection", features: osmGeojson.features});
        zoomed();

        $scope.geojson.push({
          name: $scope.queryChosen.name,
          layer: osmGeojson
          }
        );
        usSpinnerService.stop('spinner-1');
      }).
      error(function(data, status, headers, config) {
        usSpinnerService.stop('spinner-1');
      });
  }

  $scope.downloadSidewalks = downloadSidewalks;

  }]);
