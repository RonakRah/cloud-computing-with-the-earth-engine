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


// How to do trigonometric operations on your image?
// 1- first get the aspects of image which is in degree
// 2- Convert to radians, and  compute the sin of the aspect.
// 3-  display the result by add layer 

// 1
var aspect = ee.Terrain.aspect(srtm);

// 2
var sinImage = aspect.divide(180).multiply(Math.PI).sin();

// 3
Map.addLayer(sinImage, {min: -1, max: 1}, 'sin');

// How to get the statistics of an image etc:mean of the pixcells ?
// 1- creat a polygon by drawing
// 2- creat a dictionary var by using reduceRegion()
// 3- define what this reduceRegion should do
// show the result

// 1 this step is done on google earth engine

// 2
var meanDictionary = strm.reduceRegion(
    {

    }
)

// 3
var meanDictionary = strm.reduceRegion(
    {
        reducer : ee.Reducer.mean(),
        geometry : polygon,
        scale : 90

    }
);

 //4
 var mean = meanDictionary.get("elevation"); // getting the mean value for variable elevation
 print("mean elevation" , mean);

