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

