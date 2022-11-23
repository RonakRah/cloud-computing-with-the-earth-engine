// removing the cloud and shadows from the image by using the median

var l8 = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA'); // importing the data
var landsat2016 = l8.filterDate('2016-01-01', '2016-12-31');// filtering for specific dates

// Steps:

// Get the median over time, in each band, in each pixel.
var median = landsat2016.median();

// choose a visualization parameters.
var visParams = {bands: ['B4', 'B3', 'B2'], max: 0.3};

// Display the median composite.
Map.addLayer(median, visParams, 'median');


//masking data to not to include water for ex
// Select the land/water mask.
var datamask = median.select('datamask');

// Create a binary mask.
var mask = datamask.eq(1);

// Update the composite mask with the water mask.
var maskedComposite = median.updateMask(mask);
Map.addLayer(maskedComposite, visParams, 'masked');
