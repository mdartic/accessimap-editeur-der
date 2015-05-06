=========
CHANGELOG
=========

0.3
-------------------

**New features**

* Circle drawing
* Parallel ways drawing

**Minor changes**

* Add zebra crossings from OSM as points
* Add partners logos tothe footer

0.2
-------------------

**New features**

* Polygon styles (textures.js)
* POI styles
* Preview feature style in dropdown list
* Local map rotation
* Map and legend are now on 2 separate SVG files
* Download map, legend and comment in a single zip file
* Map and legend orientation (portrait or landscape)
* Local map layers edition : change the style and remove a feature
* Local map: feature geometric simplification
* Upload a custom SVG file
* Add custom tags with feature properties in the svg file

**Bug fixes**

* Prevent map panning on common map
* An already selected layer cannot be added again to the local 
* Better handle the polygons and multipolygons

**Minor changes**

* More line styles
* Add a polygon query: buildings
* OSM attribution
* Add a comment
* Keep OSM tiles on common map view
* Add icons in the features list

**Internal features**
* New svgicon service
* Setup tests
* Move fonts to proper folder

0.1 (2015-03-26)
-------------------

**New features**

* Local map: download pre-configured data from OSM and display it
* Local map: dynamically drawn legend
* Global map: load a SVG file
* Common map: draw, write and delete features on the drawing
* Common map: export the drawing as SVG
