                     //*********************** notes ***********************


//images                    
//***********/ the ways for importng an image
// 1 creating an image with pasting its id
var Image = ee.Image("CGIAR/SRTM90_V4");


// 2 creating an image by importing it
// it will be in import part in your script also it will give you all the infirmation about
// the image.


//maps
//*************** having the map on your screen
// Zoom to a location.
Map.setCenter(-112.8598, 36.2841, 9); // Center on the Grand Canyon.
//longitude, 
//latitude 
//(in decimal degrees)
// zoom degree 1 is less zoom and more is more zoom


//****************// Display the image on the map.
Map.addLayer(image);
//addLayer() method to add an image to the map display in the Code Editor on top of your map.

//seeing the features of the image
print("SRTM image" , image)


// costomizing the layers
// streatching and costemizing the layers
Map.addLayer(image, {min: -32768, max: 32767}, 'custom visualization');

// adding colors to costumized layer
Map.addLayer(image, {min: 0, max: 32767,palette: ['blue', 'green', 'red']}, 'custom visualization');



//////// important steps
//1 importing the image by ee.image(id)
//2 checking the features of the image print('title u choose' , name of the image)
//3 choosing the location on map by Map.setCenter(lon,lat,zoom)
//4 adding the layer of image to the map by Map.addLayer(name of image)
//5 costemizing the colors by map.addLayer(name of image,{min,max,palette:[]},name for the costomize layer)