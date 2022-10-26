// How to find the elevations and show it on images
// 1- load the image
// 2-then applying the algorithm of elevation to the image to find the elevations
// 3- choosing your location on the map (coordinate system)
// 4- add the layer of slope to your map

// 1
var srtm = ee.Image('CGIAR/SRTM90_V4');

// 2
var slope = ee.Terrain.slope(srtm);

// 3
Map.setCenter(-112.8598, 36.2841, 9); // Center on the Grand Canyon.

// 4
Map.addLayer(slope, {min: 0, max :60}, 'slope');
