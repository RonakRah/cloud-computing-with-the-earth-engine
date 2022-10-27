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
var aspect = ee.Terrain.aspect(srtm); // with this aspect fucntion you will get the N S W E

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
        reducer : ee.Reducer.mean(),// the reducer parameter specifies the type of statistic to compute 
        geometry : polygon, // the geometry parameter specifies the region in which to compute the statistic
        scale : 90 ,//The scale parameter is the pixel size in meters to use "specify it from zoom level of the image"
        bestEffort : true // it make sure just the area of interest is calculated

    }
);
// note for discovering the native resolution of an image with:
var scale = srtm.projection().nominalScale();
print('SRTM scale in meters', scale);
//If you specify a scale smaller than the native resolution,
// Earth Engine will happily resample the input image using nearest neighbor,
// then include all those smaller pixels in the computation.
// If you set the scale to be larger,
// Earth Engine will use input pixels 
//from an aggregated version of the input (i.e. get pixels
// from a higher level of the image pyramid)

 //4
 var mean = meanDictionary.get("elevation"); // getting the mean value for variable elevation
 print("mean elevation" , mean);



// calculating min max and median individually//

//A) min with 80 resolution
var minDictionary = srtmImage.reduceRegion(
    {
      reducer : ee.Reducer.min(),// the reducer parameter specifies the type of statistic to compute 
        geometry : polygon, // the geometry parameter specifies the region in which to compute the statistic
        scale : 80 ,//The scale parameter is the pixel size in meters to use "specify it from zoom level of the image"
        bestEffort : true // it make sure just the area of interest is calculated

    }
)
 print("minDictionary" , minDictionary);
 var min = minDictionary.get("elevation"); // getting the mean value for variable elevation
 print("min elevation" , min);

//B) max in 60 resolution 
var maxDictionary = srtmImage.reduceRegion(
    {
      reducer : ee.Reducer.max(),// the reducer parameter specifies the type of statistic to compute 
        geometry : polygon, // the geometry parameter specifies the region in which to compute the statistic
        scale : 60 ,//The scale parameter is the pixel size in meters to use "specify it from zoom level of the image"
        bestEffort : true // it make sure just the area of interest is calculated

    }
)
 print("maxDictionary" , maxDictionary);
 var max = maxDictionary.get("elevation"); // getting the mean value for variable elevation
 print("max elevation" , max);


//c) median in 70 resolution
var medianDictionary = srtmImage.reduceRegion(
    {
      reducer : ee.Reducer.median(),// the reducer parameter specifies the type of statistic to compute 
        geometry : polygon, // the geometry parameter specifies the region in which to compute the statistic
        scale : 70 ,//The scale parameter is the pixel size in meters to use "specify it from zoom level of the image"
        bestEffort : true // it make sure just the area of interest is calculated

    }
)
 print("medianDictionary" , medianDictionary);

// calculating SD and mean in one go by combine function
// defining the reducers

var reducers = ee.Reducer.mean().combine({
  reducer2: ee.Reducer.stdDev(),
  sharedInputs: true,
  
});

// put the reducers inside the reduceRegion().
var meanStdDictionary = srtmImage.reduceRegion({
  reducer: reducers,
   scale : 50,
  bestEffort: true,
});

// Display the dictionary of band means and SDs.
print("meanStdDictionary",meanStdDictionary);





 // How to calculate aspect,slope and hillshade individually
//A) Calculate aspect. Units are degrees where 0=N, 90=E, 180=S, 270=W & display.
var aspect = ee.Terrain.aspect(srtmImage);
print("aspect of srtm image", aspect);
Map.addLayer(aspect, {min: 0, max: 359.99}, 'aspect');

//B) Calculate slope. Units are degrees, range is [0,90) & display.
var slopeSrtmImage = ee.Terrain.slope(srtmImage);
print("slope of srtm image",slopeSrtmImage);
Map.addLayer(slopeSrtmImage, {min: 0, max: 89.99}, 'slope');

//C) calculate hillshade of the mage
var elevation = srtmImage.select("elevation");
print("elevation of the image",elevation);

var exaggeration = 20;
var hillshade = ee.Terrain.hillshade(elevation.multiply(exaggeration));
print("hillshade of elevation of the image",hillshade);
Map.addLayer(hillshade, null, 'Hillshade individually');


// get slope ,aspect and hillshade of the image in one go
var terrain = ee.Terrain.products(srtmImage);
print("terrain of srtm image", terrain);
print('ee.Terrain.products bands', terrain.bandNames());
Map.addLayer(terrain.select('hillshade'), {min: 0, max: 255}, 'Hillshade');


