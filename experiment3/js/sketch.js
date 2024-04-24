// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file

//https://stackoverflow.com/questions/55879820/how-to-create-more-than-one-canvas-with-p5 and help from Cj
var sketch1 = new p5(function(sketch){

sketch.seed = 0;
sketch.tilesetImage;
sketch.currentGrid = [];
sketch.numRows
sketch.numCols;

sketch.resizeScreen = function(){
  centerHorz = canvasContainer.width();// Adjusted for drawing logic
  centerVert = canvasContainer.height(); // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(canvasContainer.width(), canvasContainer.height());
  // redrawCanvas(); // Redraw everything based on new size
}

sketch.preload  = function(){
  tilesetImage = sketch.loadImage(
    "https://cdn.glitch.com/25101045-29e2-407a-894c-e0243cd8c7c6%2FtilesetP8.png?v=1611654020438"
  );
}

// setup() function is called once when the program starts
sketch.setup = function(){
  // place our canvas, making it fit our container
  //numCols = select("#asciiBox").attribute("rows") | 0;
  //numRows = select("#asciiBox").attribute("cols") | 0;
  numCols = 20
  numRows = 20

  sketch.createCanvas(16 * numCols, 16 * numRows).parent("canvasContainer");
  //select("canvas").elt.getContext("2d").imageSmoothingEnabled = false;

  reseedButton = sketch.createButton('Reseed')
  reseedButton.position(100, 438)
  reseedButton.mousePressed(reseed)
  //select("#reseedButton").mousePressed(reseed);
  //select("#asciiBox").input(reparseGrid);
  reparseGrid();
  reseed(sketch);

  weatherButton = createButton('Change Weather')
  weatherButton.position(200,438)
  weatherButton.mousePressed(switchWeather);

  var weather = true 
  // resize canvas is the page is resized

  /*$(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();*/ 
}

// draw() function is called repeatedly, it's the main animation loop
sketch.draw = function(){
  randomSeed(seed)
  drawGrid(currentGrid, weather)
}

sketch.placeTile = function(i, j, ti, tj){
  image(tilesetImage, 16 * j, 16 * i, 16, 16, 8 * ti, 8 * tj, 8, 8);
}
})
