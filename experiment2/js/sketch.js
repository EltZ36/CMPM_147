// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
const VALUE1 = 1;
const VALUE2 = 2;

// Globals
let myInstance;
let canvasContainer;
var centerHorz, centerVert;
const WIDTH = 800
const HEIGHT = 600

let x = 0;
let y = 0;
let z = 0;

let translationBounds = {
  x: -300,
  y: -270,
}

// mountains
let x1 = new Mountain(35, 0, -250, 35, undefined, [79, 64, 50])
let x2 = new Mountain(35, 0, -220, 35, undefined, [119, 98, 77])
let x3 = new perlinMountain(0)

//cacti
let c1 = new Cactus(200, 100, 25, 90, 1.0)
let c2 = new Cactus(200, 150, 25, 90, 1.0)
let c3 = new Cactus(200, 200, 25, 90, 1.0)

function resizeScreen() {
  centerHorz = WIDTH / 2; // Adjusted for drawing logic
  centerVert = HEIGHT / 2; // Adjusted for drawing logic
  console.log("Resizing...");
  resizeCanvas(WIDTH, HEIGHT);
  // redrawCanvas(); // Redraw everything based on new size
}

// setup() function is called once when the program starts
function setup() {
  // place our canvas, making it fit our container
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(WIDTH, HEIGHT, WEBGL);
  canvas.parent("canvas-container");
  // resize canvas is the page is resized

  $(window).resize(function() {
    resizeScreen();
  });
  resizeScreen();
  frameRate(60)
  background(199,179,191)
  x3.generatePerlinMountains()
}

function draw(){  
    
  //background color
  background(199,179,191)

  x += 2 //incrment x for translation of sphere
  //reset for the sphere 
  if (x > 920) { 
    x = -20
  }
  y = -height / 2 + 30 * sin(x / 400)

  // render the mountains
  x1.render()
  x2.render()
  x3.render()

  //set fill color for ground
  fill(227, 191, 144)
  rect(-(WIDTH/2), 0, 800, (HEIGHT/2))

  //render the cacti
  c1.show()
  c2.show()
  c3.show()

  //don't rotate and translate the other things 
  noStroke()
  push()
  fill(255, 255, 0); // Sphere color
  translate(x-500, y+10, 0) // Move the sphere to its position
  sphere(20, 15) // Draw the sphere
  pop()
}

//interactivity
function mousePressed(){
  x1.reset()
  x2.reset()
  x3.reset()
  x3.generatePerlinMountains(0)
  c1.generate()
  c2.generate()
  c3.generate()
}
