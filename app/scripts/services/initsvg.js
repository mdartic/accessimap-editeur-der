'use strict';

/**
 * @ngdoc service
 * @name accessimapEditeurDerApp.initSvg
 * @description
 * # initSvg
 * Service in the accessimapEditeurDerApp.
 */
angular.module('accessimapEditeurDerApp')
    .service('initSvg', function() {

        this.createSvg = function(id, width, height) {
            return d3.select(id).append('svg')
                .attr('width', width + 'mm')
                .attr('height', height + 'mm')
                .attr('viewBox', '0 0 ' + (width / 0.283) + ' ' + (height / 0.283));
        };

        this.createDetachedSvg = function(width, height) {
            return d3.select(document.createElementNS(d3.ns.prefix.svg, 'svg'))
                .attr('width', width + 'mm')
                .attr('height', height + 'mm')
                .attr('viewBox', '0 0 ' + (width / 0.283) + ' ' + (height / 0.283));
        };

        this.createMap = function(width, height) {
            return this.createSvg('#map', width, height);
        };

        this.createLegend = function(width, height) {
            return this.createSvg('#legend', width, height);
        };

        this.createLegendText = function(legendContainter, margin) {
            legendContainter.append('text')
                .attr('x', function() {
                        return margin;
                })
                .attr('y', function() {
                        return margin * 2;
                })
                .attr('class', 'braille')
                .attr('font-family', 'Braille_2007')
                .attr('font-size', '35px')
                .text(function() {
                        return 'Légende';
                });
        };

        this.createDefs = function(target) {
            var defs = target.append('defs');

            defs.append('marker')
                    .attr('id', 'arrowStartMarker')
                    .attr('refX', 5)
                    .attr('refY', 5)
                    .attr('markerWidth', 10)
                    .attr('markerHeight', 10)
                    .attr('orient', 'auto')
                .append('path')
                    .attr('d', 'M9,1 L5,5 9,9')
                    .attr('style', 'fill:none;stroke:#000000;stroke-opacity:1');

            defs.append('marker')
                    .attr('id', 'arrowStopMarker')
                    .attr('refX', 5)
                    .attr('refY', 5)
                    .attr('markerWidth', 10)
                    .attr('markerHeight', 10)
                    .attr('orient', 'auto')
                .append('path')
                    .attr('d', 'M1,1 L5,5 1,9')
                    .attr('style', 'fill:none;stroke:#000000;stroke-opacity:1');

            defs.append('marker')
                    .attr('id', 'straightMarker')
                    .attr('refX', 1)
                    .attr('refY', 5)
                    .attr('markerWidth', 2)
                    .attr('markerHeight', 10)
                    .attr('orient', 'auto')
                .append('path')
                    .attr('d', 'M1,1 L1,9')
                    .attr('style', 'fill:none;stroke:#000000;stroke-opacity:1');
        };

        this.createMargin = function(target, width, height) {
            var w40 = width - 40,
                h40 = height - 40;

            var marginGroup = target.append('g')
                .attr('id', 'margin-layer')
                .attr('width', width)
                .attr('height', height);

            marginGroup.append('path')
                .attr('d', function() {
                    var outer = 'M 0 0 L 0 ' + height + ' L ' + width + ' ' + height + ' L ' + width + ' 0 L 0 0 z ';
                    var inner = 'M 40 40 L ' + w40 + ' 40 L ' + w40 + ' ' + h40 + ' L 40 ' + h40 + ' L 40 40 z';
                    return outer + inner;
                })
                .attr('style', 'opacity:1;fill:#ffffff;fill-opacity:1')
                .attr('id', 'svgWhiteBorder')
                .classed('notDeletable', true);

        };

        this.createDrawing = function(target) {
            var drawingGroup = target.append('g')
                .attr('id', 'drawing-layer');
                //.classed('rotable', true);

            drawingGroup.append('g')
                .attr('id', 'polygons-layer');
            drawingGroup.append('g')
                .attr('id', 'lines-layer');
            drawingGroup.append('g')
                .attr('id', 'points-layer');
            drawingGroup.append('g')
                .attr('id', 'text-layer');
        };

        this.createFrame = function(target, width, height) {
            var w40 = width - 40,
                h40 = height - 40;

            var frameGroup = target.append('g')
                .attr('id', 'frame-layer');

            frameGroup.append('path')
                .attr('d', function() {
                    return 'M 40 40 L ' + w40 + ' 40 L ' + w40 + ' ' + h40 + ' L 40 ' + h40 + ' L 40 40 z';
                })
                .attr('fill', 'none')
                .attr('stroke', '#000000')
                .attr('stroke-width', '2.5px')
                .attr('stroke-opacity', '1')
                .attr('id', 'svgContainer')
                .classed('notDeletable', true);
        };

        this.createSource = function(target) {
            return target.append('g')
                .attr('id', 'source-layer')
                .classed('rotable', true);
        };

        this.createMapLayer = function(target, width, height) {
            return target.append('g')
                .attr('id', 'map-layer')
                .attr('width', width)
                .attr('height', height);
        };
    });
