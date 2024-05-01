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
let waterFlag, dirtFlag, flowerFlag;
let creatureLocation = { i: 0, j: 0 };
let fireLocation = { position: [] };

let fire, carpet, stone;

//asked gpt for colors 
const carpetColor = [
  [220, 20, 60],
  [224, 17, 95],
  [128, 0, 32],
  [128, 0, 0],
  [255, 36, 0],
  [222, 49, 99],
  [150, 0, 24],
  [115, 54, 53],
];

const stoneColor = [[192, 64, 0],
[111, 78, 55],
[85, 93, 80],
[101, 0, 11],
[160, 82, 45],
[117, 77, 61],
[139, 69, 19],
[160, 82, 45],
[113, 58, 29],
[205, 92, 92],
[100, 84, 82],
[174, 64, 0],]

let xoff = 0;
let yoff = 0;
let amplitude = 5;
let walkFire = false;

function p3_preload() {}

function p3_setup() {}

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
  //logic from gpt asking about how to make sure you can't click on the fire
  let isOnFire = false;
  for (let x = 0; x < fireLocation.position.length; x++) {
    if (
      fireLocation.position[x][0] === key[0] &&
      fireLocation.position[x][1] === key[1]
    ) {
      isOnFire = true;
      break;
    }
  }
  if (!isOnFire) {
    clicks[key] = 1 + (clicks[key] | 0);
    creatureLocation.i = i;
    creatureLocation.j = j;
  }
}

function p3_drawBefore() {}

function p3_drawTile(i, j) {
  noStroke();
  if (XXH.h32("tile:" + [i, j], worldSeed) % 4 == 0) {
    stone = getNoiseColor(i, j,stoneColor)
    fill(stone)
  } else { 
    carpet = getNoiseColor(i, j, carpetColor)
    fill(carpet)
      stroke("#FFD700");
  strokeWeight(0.5);
  line(-32, -tw, 22, -32);
  }
  
  
  if (XXH.h32("tile:" + [i, j], worldSeed) % 29 == 0) {
    drawSpear(i, j)
    fill(255)
  }
  push();

  beginShape();
  vertex(-tw, 0);
  vertex(0, th);
  vertex(tw, 0);
  vertex(0, -th);
  endShape(CLOSE);

  let n = clicks[[i, j]] | 0;

  if (n % 2 == 1) {
    fill(0, 0, 0, 32);
    ellipse(0, 0, 10, 5);
    translate(0, -10);
    fill(255, 255, 100, 128);
    ellipse(0, 0, 10, 10);
  }
  pop();

  if (i == creatureLocation.i && j == creatureLocation.j) {
    drawCreature(i, j);
  }
  if (XXH.h32("tile:" + [i, j], worldSeed) % 7 == 0) {
    noStroke()
    drawFire(i, j);
    fireLocation.position.push([i, j]);
    noFill();
  }
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

function keyPressed() {}

function drawCreature() {
  fill(168, 169, 173);
  push();
  translate(-30, -50);
  ellipse(tw, th, 30, 30);
  stroke(168, 169, 173);
  strokeWeight(3);
  point(tw, th);
  point(tw + 15, th);
  point(tw - 15, th);
  point(tw + 10, th + 20);
  point(tw - 10, th + 20);
  point(tw, th + 30);
  fill(0);
  triangle(tw - 15, th, tw, th, tw - 10, th + 20);
  triangle(tw + 15, th, tw, th, tw + 10, th + 20);
  fill(255);
  triangle(tw - 10, th + 20, tw, th + 30, tw + 10, th + 20);
  pop();
}

function drawFire(i, j) {
  //asked gpt on how to make an object hover and it gave me this
  let x1 = 0 + sin(xoff) * amplitude;
  let x3 = 0 + sin(xoff) * 0.8;
  xoff += 0.001;
  let y = 0 + cos(yoff) * amplitude;
  yoff += 0.001;

  let x2 = floor(random(0, 5));
  x1 = floor(random(-2, 10));

  fill(255, 165, 10);
  push();
  translate(-30, -30);
  ellipse(tw + x2, th, 40, 40);
  fill(239, 204, 0);
  ellipse(tw + x3, th + 10, 20, 30);
  fill(255, 165, 10);
  //rect(tw, th - 40, 20, 10)
  rect(tw - 20 + x1, th - 40 + y, 5, 5);
  rect(tw + x1, th - 35, 5, 5);
  rect(tw - 10 + x1, th - 25 + y, 5, 5);
  rect(tw + 10 + x1, th - 25 + y, 5, 5);
  pop();
  //if the offset goes too high, 40, then reset it down or something
}

function drawSpear() {
  push()
  translate(0, -30);
  fill("#aaa9ad");
  triangle(tw, 0, tw + 30, -10, tw, -10);
  stroke("#966F33");
  strokeWeight(2);
  line(tw, 0, -tw, 16);
  pop()
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
