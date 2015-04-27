'use strict';

/**
 * @ngdoc service
 * @name accessimapEditeurDerApp.svgicon
 * @description
 * # svgicon
 * Service in the accessimapEditeurDerApp.
 */
angular.module('accessimapEditeurDerApp')
  .service('svgicon', function() {
    var featureIcon = function(item, type) {
      var iconSvg = document.createElement('svg');
      var iconContainer = d3.select(iconSvg).attr('height', 30).append('g');
      if (type === 'line') {
        var symbol = iconContainer.append('line')
          .attr('x1', function() {
              return 0;
          })
          .attr('y1', function() {
              return 15;
          })
          .attr('x2', function() {
              return 250;
          })
          .attr('y2', function() {
              return 15;
          })
          .attr('fill', 'red');
      }
      if (type === 'point') {
        var symbol = iconContainer.append('path')
            .attr('d', function() {
                return item.path(15, 15, item.radius);
            })
            .attr('fill', 'red');
      }
      if (type === 'polygon') {
        var symbol = iconContainer.append('rect')
              .attr('x', function() {
                  return 0;
              })
              .attr('y', function() {
                  return 0;
              })
              .attr('width', function() {
                  return 250;
              })
              .attr('height', function() {
                  return 30;
              })
              .attr('fill', 'red');
      }

      angular.forEach(item.style, function(attribute) {
        symbol.attr(attribute.k, attribute.v);
      });

      return (new XMLSerializer).serializeToString(iconSvg);
    };

    return {
      featureIcon: featureIcon
    };

  });