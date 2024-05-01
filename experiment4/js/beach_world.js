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

//colors pulled from gpt
const sand = [
  [0, 191, 255],
  [51, 153, 255],
  [102, 204, 255],
  [153, 204, 255],
  [51, 153, 255],
  [51, 102, 255],
  [102, 204, 255],
  [0, 153, 255],
];
const sea = [
  [244, 164, 96],
  [218, 165, 32],
  [210, 180, 140],
  [222, 184, 135],
  [210, 180, 140],
  [139, 69, 19],
  [244, 164, 96],
  [210, 180, 140],
];

const bones = [
[255, 255, 224],
[255, 255, 204],
[250, 250, 210],
[255, 255, 192],
[255, 255, 178],
[255, 255, 160],
];

let seaColor, sandColor, boneColor;
let y = 0;
let yoff = 0.01;
let amplitude = 5;
let crunchSound;
let reverb;

function p3_preload() {
  crunchSound = loadSound(
    "https://cdn.glitch.global/4a3c20e4-a5eb-4fd1-932c-f52f01a8ee1d/eating.mp3?v=1714521463822"
  );
}

function p3_setup() {
  reverb = new p5.Reverb();
}

let worldSeed;
let playerLocation = { i: 0, j: 0 };
let boneLocation = { position: [], eaten: [] };
let rockLocation = { position: [], noiseArr: [] };

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
  playerLocation.i = i;
  playerLocation.j = j;
  //from gpt on how to do reverb as well as p5.js example documentation
  let choice = floor(random(0, 2));
  if (choice == 0) {
    reverb.drywet(random(0, 1.1));
  } else {
    reverb.set(random(5, 20), random(10, 2000));
  }
  // Play the sound file with reverb
  for (let x = 0; x < boneLocation.position.length; x++) {
    if (
      boneLocation.position[x][0] == key[0] &&
      boneLocation.position[x][1] == key[1]
    ) {
      boneLocation.eaten[x] = true;
      if (crunchSound.isPlaying() != true) {
        crunchSound.disconnect();
        reverb.process(crunchSound);
        crunchSound.rate(random(0.2, 2.1));
        crunchSound.play();
      }
    }
  }
}

function p3_drawBefore() {}

function p3_drawTile(i, j) {
  noStroke();

  if (XXH.h32("tile:" + [i, j], worldSeed) % 8 == 1) {
    let sandColor = getNoiseColor(i, j, sand);
    fill(sandColor);
  } else {
    let seaColor = getNoiseColor(i, j, sea);
    fill(seaColor);
  }
  push();

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

  if (playerLocation.i == i && playerLocation.j == j) {
    drawCrab(i, j);
    noFill();
    /*stroke(255, 255, 100, 128);

    beginShape();
    vertex(-tw, 0);
    vertex(0, th);
    vertex(tw, 0); */
    //vertex(0, -th);
    endShape();
  }
  if (XXH.h32("tile:" + [i, j], worldSeed) % 20 == 0) {
    drawBone(i, j);
    boneLocation.position.push([i, j]);
    boneLocation.eaten.push(false);
  }
  if (XXH.h32("tile:" + [i, j], worldSeed) % 23 == 1) {
    addRocks(i, j);
    let noiseGen = noise(tw, th);
    let noiseIndex = floor(map(noiseGen, 0, 2, 0, 10));
    rockLocation.position.push([i, j]);
    rockLocation.noiseArr.push(noiseIndex);
  }

  pop();
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

function drawCrab(i, j) {
  fill(255, 0, 0);
  push();
  rotate(radians(-180));
  ellipse(0, th - 10, 30, 20);
  //fill(255)
  //ellipse(0, th -10 , 20, 10)
  //the legs
  pop();
  stroke("#FF7377");
  strokeWeight(3);
  line(th - 1.5, 0, th, 0);
  line(th, 0, th, 8);
  line(-th, 0, -th, 8);
  line(-th, 0, -th + 2, 0);
  strokeWeight(2);
  //connections to eyes
  stroke(255);
  line(10, th - 32, 10, th - 37);
  line(-10, th - 32, -10, th - 37);
  stroke(0);
  //arm claws
  //left
  strokeWeight(3);
  beginShape();
  vertex(-25, th - 36);
  vertex(-25, th - 38);
  vertex(-29, th - 33);
  //vertex(-25, th - 27)
  vertex(-35, th - 33);
  vertex(-29, th - 28);
  endShape();
  //right
  beginShape();
  vertex(25, th - 36);
  vertex(25, th - 38);
  vertex(29, th - 33);
  //vertex(-25, th - 27)
  vertex(35, th - 33);
  vertex(29, th - 28);
  endShape();
  //point(-25, th - 38)
  point(-35, th - 33);
  //point(-29, th - 33)
  //point(-25, th - 27)
  //eyes
  strokeWeight(3);
  point(10, th - 37);
  point(-10, th - 37);
  //arm line
  stroke("#E6676B");
  line(-13, th - 25, -25, th - 30);
  line(13, th - 25, 25, th - 30);
  noStroke();
  //arm circle
  fill(255);
  ellipse(-25, th - 30, 10, 10);
  ellipse(25, th - 30, 10, 10);
  fill(255, 0, 0);
  ellipse(-23, th - 30, 8, 8);
  ellipse(23, th - 30, 8, 8);
}

function drawBone(i, j) {
  let boneColor = getNoiseColor(i, j, bones);
  fill(boneColor);
  let boneIndex = -1;
  //ellipse(tw, th - 30, 20, 20)
  for (let x = 0; x < boneLocation.position.length; x++) {
    if (
      boneLocation.position[x][0] === i &&
      boneLocation.position[x][1] === j
    ) {
      boneIndex = x;
      break;
    }
  }
  if (boneIndex !== -1 && boneLocation.eaten[boneIndex] == false) {
    let y = -9 + sin(yoff) * amplitude;
    yoff += 0.001;
    beginShape();
    vertex(30, -8 + y);
    vertex(-12, 5 + y);
    vertex(-20, 12 + y);
    vertex(5, 4 + y);
    vertex(18, 9 + y);
    vertex(-28, -14 + y);
    vertex(25, 2 + y);
    vertex(-15, -5 + y);
    vertex(10, -3 + y);
    vertex(0, 15 + y);
    endShape();
  } else {
    return;
  }
}

function addRocks(i, j) {
  //for(let i = 0; i < 5; i++){
  //let noiseValue = noise(tw * 0.5, th * 0.5)
  //console.log(noiseValue)\
  fill("#B4B0A1");
  let rockIndex = -1;
  for (let x = 0; x < rockLocation.position.length; x++) {
    if (
      rockLocation.position[x][0] === i &&
      rockLocation.position[x][1] === j
    ) {
      rockIndex = x;
      break;
    }
  }
  if (rockIndex != -1) {
    let rockNoise = rockLocation.noiseArr[rockIndex];
    ellipse(tw + rockNoise, -th - 30 + rockNoise, 10, 10);
    ellipse(tw + rockNoise - 15, -th - 30 + rockNoise - 10, 15, 15);
    ellipse(tw + rockNoise + 15, -th - 40 + rockNoise, 10, 8);
  }
  //}
}

//pulled from Wes' example of land of lakes
function getNoiseColor(x, y, colorArray) {
  // Generate a noise value based on x and y
  let noiseValue = noise(x * 0.8, y * 10);

  // Map the noise value to an index in the color array
  let index = floor(map(noiseValue, 0, 1, 0, colorArray.length));

  // Retrieve and return the selected color from the array
  return colorArray[index];
}
