// how to import image collection
//1 you need to use ee.ImageCollection("id of image collection")
var l8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA');

// how to filter image collection to specific points and dates
// 1- filtering the image collection to specific point by .filterBounds()
var spatialFiltered = l8.filterBounds(point);
print('spatialFiltered', spatialFiltered);

// 2- filtering the image collection to specific date by .filterDate()
var temporalFiltered = spatialFiltered.filterDate('2015-01-01', '2015-12-31');
print('temporalFiltered', temporalFiltered);

// how to get the least or most value of a property of image collection
// example:  get the least cloudy image in 2015 in your area of interest
// 1- This will sort from least to most cloudy.
var sorted = temporalFiltered.sort('CLOUD_COVER');
// 2- Get the first (least cloudy) image.
var scene = sorted.first();

// how to add layer of landsat images in true color in map
// 1- first you need to choose bands [B4,B3 and B2]
// 2- then use it as visparam
// note: 'B5', 'B4', and 'B3' which is called a false-color composite.
var visParams = {bands: ['B4', 'B3', 'B2'], max: 0.3};
Map.addLayer(scene, visParams, 'true-color composite');

// how to get all image collection on the map
// 1- import the image collection
// 2- filter the spcific place or date
// 3- add the layer to the map
var l8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA');
var landsat2016 = l8.filterDate('2016-01-01', '2016-12-31');
Map.addLayer(landsat2016, visParams, 'l8 collection');