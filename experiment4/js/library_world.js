"use strict";

/* global XXH */
/* exported --
    p3_preload
    p3_setup
    p3_worldKeyChanged
    p3_tileWidth
    p3_tileHeight
    p3_tileClicked
    p3_drawBefore
    p3_drawTile
    p3_drawSelectedTile
    p3_drawAfter
*/

//got this idea by looking at the code from Garrett Blake
var book_arr = { position: [], open: [], link: [], color: [] };
var shapeoffset = 0;
var book_link;
//from gpt asking about hovering books 
let yOffset = -20;
let yOffsetSpeed = 0.08;
let yOffsetMagnitude = 2;
let yOffsetSmooth = 0.01; 
//noise for wood based on land of lakes by Wes Modes 
let lightWood = [[249, 234, 212], [	230, 202, 166], [	235, 211, 181], [	243, 230, 212], [	249, 234, 212], [	225, 201, 166], [	228, 207, 186]]
let darkWood = [[	108, 76, 47], [	222, 184, 135], [178, 140, 108], [200, 167, 129], [179, 148, 109], [177, 142, 99], [218, 190, 156]]
let lightColor
let darkColor
let noiseScale = 0.5
let yoff =  0
let amplitude = 5

function p3_preload() {
  book_link = loadStrings("./txt/books.txt");
}

function p3_setup() {
  shapeoffset = floor(random(5, 11));
}

let worldSeed;

function p3_worldKeyChanged(key) {
  worldSeed = XXH.h32(key, 0);
  noiseSeed(worldSeed);
  randomSeed(worldSeed);
}

function p3_tileWidth() {
  return 32;
}
function p3_tileHeight() {
  return 16;
}

let [tw, th] = [p3_tileWidth(), p3_tileHeight()];

let clicks = {};

function p3_tileClicked(i, j) {
  let key = [i, j];
  clicks[key] = 1 + (clicks[key] | 0);
  for (let x = 0; x < book_arr.position.length; x++) {
    if (
      book_arr.position[x][0] == key[0] &&
      book_arr.position[x][1] == key[1]
    ) {
      book_arr.open[x] = true;
      //break;
    }
    //https://stackoverflow.com/questions/7077770/window-location-href-and-window-open-methods-in-javascript
    if (
      book_arr.open[x] == true &&
      book_arr.position[x][0] == key[0] &&
      book_arr.position[x][1] == key[1]
    ) {
      //window.open('http://www.google.com')
      //if (window.confirm("Redirecting to book link. Press ok to continue.") || warning_flag == true) {
        window.open(book_arr.link[x]);
        //warning_flag = true 
      //} else {
        //break;
      }
    }
  }
//}

function p3_drawBefore() {}

function p3_drawTile(i, j) {
  //adjust the color of these tiles
  if (XXH.h32("book:" + [i, j], worldSeed) % 50 == 1) {
    book_arr.position.push([i, j]);
    book_arr.open.push(false);
    book_arr.link.push(random(book_link));
    book_arr.color.push([
      floor(random(0, 256)),
      random(0, 256),
      random(0, 256),
    ]);
    drawBook(i, j, 5);
  }
  if (XXH.h32("tile:" + [i, j], worldSeed) % 70 == 0){
    drawTable(i, j)
  }
  if (XXH.h32("tile:" + [i, j], worldSeed) % 110 == 1){
    drawShelf(i, j)
  }
  if (XXH.h32("tile:" + [i, j], worldSeed) % 3 == 1) {
    lightColor = getNoiseColor(i, j, lightWood)
    strokeWeight(0.5)
    fill(lightColor);
    line(-tw, -30, -tw + 40, -10)
  } 
  else {
    darkColor = getNoiseColor(i, j, darkWood)
    fill(darkColor);
    strokeWeight(0.1)
    //stroke(0, 255, 0)
    line(-32, -tw, 32, -32)
    line(32, -32, tw, 32)
    stroke(0)
  }
  beginShape();
  vertex(-tw, 0);
  vertex(0, th);
  vertex(tw, 0);
  vertex(0, -th);
  endShape(CLOSE);

  let n = clicks[[i, j]] | 0;
  /*if (n % 2 == 1) {
    fill(0, 0, 0, 32);
    ellipse(0, 0, 10, 5);
    translate(0, -10);
    fill(255, 255, 100, 128);
    ellipse(0, 0, 10, 10);
  }*/ 
}

function p3_drawSelectedTile(i, j) {
  noFill();
  stroke(0, 255, 0, 128);

  beginShape();
  vertex(-tw, 0);
  vertex(0, th);
  vertex(tw, 0);
  vertex(0, -th);
  endShape(CLOSE);

  noStroke();
  fill(0);
  text("tile " + [i, j], 0, 0);
}

function p3_drawAfter() {}

function drawBook(i, j) {
  stroke(0);
  let bookIndex = -1;

  /*asked gpt on how to make sure that the book would change states when clicked. I gave the code and the lines: 
  i want to make it so that when I click on the tile with p3_tileClicked(i,j), drawBook(i, j, shapeOffset) will change its state and draw something else. 
  This something else will cover up the previous drawing but not the tiles. Any tips on how to do this?"
  "*/
  // Find the index of the book at position (i, j) in the book_arr array
  for (let x = 0; x < book_arr.position.length; x++) {
    if (book_arr.position[x][0] === i && book_arr.position[x][1] === j) {
      bookIndex = x;
      break;
    }
  }
  //pulled from gpt asking about how to make a book hover with noise 
  //now modified to give the books more random positions
  let yNoise = noise(i * noiseScale, j * noiseScale)
  let yOffset = map(yNoise, 0, 2, -40, 0);
  //asked gpt on how to make an object hover and it gave me this 
  let y = -20 + sin(yoff) * amplitude;
  yoff += 0.001
  //y = random(0, 1)
  
  if (bookIndex !== -1 && book_arr.open[bookIndex]) {
    fill(
      book_arr.color[bookIndex][0],
      book_arr.color[bookIndex][1],
      book_arr.color[bookIndex][2]
    );
    beginShape();
    //vertex(-this.tileWidth, 0);
    //vertex(0, this.tileHeight);
    vertex(-tw + 10, -10);
    vertex(-tw + 10, -50);
    vertex(0, th - 80);
    vertex(tw - 10, -50);
    vertex(tw - 10, -10);
    vertex(0, th - 40);
    vertex(-tw + 10, th - 26);
    endShape();
    fill(255);
    //contents of the book
    beginShape();
    vertex(-tw + 15, -50);
    vertex(0, th - 80);
    vertex(tw - 15, -50);
    vertex(tw - 15, -10);
    vertex(0, th - 40);
    vertex(-tw + 15, th - 26);
    endShape();
    beginShape();
    vertex(-tw + 20, -10);
    vertex(-tw + 20, -50);
    vertex(0, th - 80);
    vertex(tw - 20, -50);
    vertex(tw - 20, -10);
    vertex(0, th - 40);
    vertex(-tw + 20, th - 26);
    endShape();
    beginShape();
    vertex(-tw + 25, -10);
    vertex(-tw + 25, -50);
    vertex(0, th - 80);
    vertex(tw - 25, -50);
    vertex(tw - 25, -10);
    vertex(0, th - 40);
    vertex(-tw + 25, th - 26);
    endShape();
    //the spine of it
    beginShape();
    vertex(0, th - 80);
    vertex(0, th - 40);
    endShape();
  } else {
    fill(
      book_arr.color[bookIndex][0],
      book_arr.color[bookIndex][1],
      book_arr.color[bookIndex][2]
    );
    push();
    translate(0, -70)
    
    rect(tw - 52, yOffset - y, 40, 45);
    //rect(tw - 52, y, 40, 45);
    fill(255);
    rect(tw - 44, yOffset - y + 10, 25, 15);
    pop();
  }
}

function drawTable(i, j) {
  //noFill();
  /*  beginShape();
  vertex(-tw, 0);
  vertex(0, th);
  vertex(tw, 0);
  vertex(0, -th);
  endShape(CLOSE); */ 
  fill(255)  
  noStroke()
  push()
  translate(15, -18)
  ellipse(th + 1.2, tw - 28, 32, 16)
  pop()
  stroke("#d5d5d7")
  strokeWeight(5)
  line(tw, th - 28, tw, th - 45)
  strokeWeight(0.5)
  fill(0)
  push()
  translate(15, -50)
  ellipse(th + 1.2, tw - 20, 60, 25)
  pop()
  //reset the stroke afterwards 
  stroke(0)
  strokeWeight(1)
}

function drawShelf(i, j) {
  fill(0, 0, 255)
  stroke(0, 0, 255)
  //point(0, th - 45);
  fill(255)
  strokeWeight(1)
  stroke(0)
  line(-tw, th - th, -tw, tw - 50)
  line(tw, th - th, tw, -20)
  beginShape()
  vertex(tw, -20)
  vertex(th - th, -th - 20)
  vertex(-tw, -20)
  endShape()
  //2nd stack 
  fill(0, 0, 255)
  stroke(0, 0, 255)
  //point(0, th - 45);
  fill(255)
  strokeWeight(1)
  stroke(0)
  line(-tw, -20, -tw, tw - 70)
  line(tw, -20, tw, -40)
  beginShape()
  vertex(tw, -40)
  vertex(-20, -th - 40)
  vertex(-tw, -40)
  endShape()
  //3rd stack: 
  fill(255)
  strokeWeight(1)
  stroke(0)
  line(-tw, -40, -tw, tw - 90)
  line(tw, -40, tw, -60)
  beginShape()
  vertex(tw, -60)
  vertex(-20, -th - 60)
  vertex(-tw, -60)
  endShape()
  //point(0, -th - 20);
}

//pulled from Wes' example of land of lakes 
function getNoiseColor(x, y, colorArray) {
  // Generate a noise value based on x and y
  let noiseValue = noise(x * 0.5, y * 0.5); 

  // Map the noise value to an index in the color array
  let index = floor(map(noiseValue, 0, 2, 0, colorArray.length));

  // Retrieve and return the selected color from the array
  return colorArray[index];
}
