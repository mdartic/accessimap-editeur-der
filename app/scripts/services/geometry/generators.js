'use strict';

/**
 * @ngdoc service
 * @name accessimapEditeurDerApp.generators
 * @description
 * # generators
 * Service in the accessimapEditeurDerApp.
 */
angular.module('accessimapEditeurDerApp')
  .service('generators', function() {

        this.lineFunction = d3.svg.line()
                                     .x(function(d) { return d[0]; })
                                     .y(function(d) { return d[1]; })
                                     .interpolate('linear');
        this.cardinalLineFunction = d3.svg.line()
                                     .x(function(d) { return d[0]; })
                                     .y(function(d) { return d[1]; })
                                     .interpolate('cardinal');
        this.polygonFunction = d3.svg.line()
                                     .x(function(d) { return d[0]; })
                                     .y(function(d) { return d[1]; })
                                     .interpolate('linear-closed');
        this.pathFunction = {
            'line': this.lineFunction,
            'polygon': this.polygonFunction
        };

  });
