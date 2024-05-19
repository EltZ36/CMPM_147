/* exported getInspirations, initDesign, renderDesign, mutateDesign */

//starting this from daniel shiffman example of ascii code: https://www.youtube.com/watch?v=55iwMYv8tGI
const density = "Ñ@#W$9876543210?!abc;:+=-,._ ";

function getInspirations() {
  return [
    {
      name: "seaweed",
      assetUrl:
        "https://cdn.glitch.global/f97d423e-2452-4ec5-a0c6-b04df385ddb3/seaweed.jpg?v=1715065244406",
      credit: "Seaweed found online",
    },
    {
      name: "tea",
      assetUrl:
        "https://cdn.glitch.global/f97d423e-2452-4ec5-a0c6-b04df385ddb3/tea_square_image.webp?v=1715065205235",
      credit: "found it online",
    },
    {
      name: "cpu",
      assetUrl:
        "https://cdn.glitch.global/f97d423e-2452-4ec5-a0c6-b04df385ddb3/cpu.jpg?v=1715065205027",
      credit: "from newegg and is a 3700x am4 platform cpu",
    },
    {
      name: "Hu Tao",
      assetUrl:
        "https://cdn.glitch.global/f97d423e-2452-4ec5-a0c6-b04df385ddb3/hu_tao_wallpapers_1.png?v=1715127571803",
      credit: "Found it online",
    },
  ];
}

function initDesign(inspiration) {
  //pulled from example solution
  //if()
    let canvasContainer = $('.image-container'); // Select the container using jQuery
  let canvasWidth = canvasContainer.width(); // Get the width of the container
  let aspectRatio = inspiration.image.height / inspiration.image.width;
  let canvasHeight = canvasWidth * aspectRatio; // Calculate the height based on the aspect ratio
  resizeCanvas(canvasWidth, canvasHeight);
  $(".caption").text(inspiration.credit); // Set the caption text

  // add the original image to #original
  const imgHTML = `<img src="${inspiration.assetUrl}" style="width:${canvasWidth}px;">`
  $('#original').empty();
  $('#original').append(imgHTML);
  
    let design = {
    bg: 0,
    fg: [],
  };
  //from gpt asking about droppers and finding the name
  let selectedOption = dropper.options[dropper.selectedIndex];
  if(selectedOption.innerHTML == "Hu Tao" && currentDesignType === "text"){
    resizeCanvas(inspiration.image.width / 16, inspiration.image.height / 16);
    for (let i = 0; i < 1500; i++) {
      // Randomly select position for the foreground box
      let coor_x = random(width);
      let coor_y = random(height);

      design.fg.push({
        x: coor_x,
        y: coor_y,
        w: random(width),
        h: random(height),
        text: random(2, 21),
      });
    }
  }
  if (currentDesignType === "text" && selectedOption.innerHTML != "Hu Tao") {
    resizeCanvas(inspiration.image.width, inspiration.image.height)
    for (let i = 0; i < 1500; i++) {
      // Randomly select position for the foreground box
      let coor_x = random(width);
      let coor_y = random(height);

      design.fg.push({
        x: coor_x,
        y: coor_y,
        w: random(width),
        h: random(height),
        text: random(2, 21),
      });
    }
  } 
  if(selectedOption.innerHTML == "Hu Tao"){
    resizeCanvas(inspiration.image.width / 8, inspiration.image.height / 8)
    for (let i = 0; i < 2000; i++) {
      // Randomly select position for the foreground box
      let x = random(width);
      let y = random(height);

      design.fg.push({
        x: x,
        y: y,
        w: random(width / 6),
        h: random(height / 6),
        text: random(0, 20),
      });
    }
  }
  else {
    resizeCanvas(inspiration.image.width, inspiration.image.height)
    for (let i = 0; i < 2500; i++) {
      // Randomly select position for the foreground box
      let x = random(width);
      let y = random(height);

      design.fg.push({
        x: x,
        y: y,
        w: random(width / 6),
        h: random(height / 6),
        text: random(0, 20),
      });
    }
  }
  return design;
}

function renderDesign(design, inspiration) {
  background(design.bg);
  noStroke();
  inspiration.image.loadPixels();
  for (let box of design.fg) {
    //asking gpt to find the color in renderDesign and found this out by looking at code of Frank Shi. Repo: https://github.com/frshi19/cmpm147 lines 41 to 58
    //Find corresponding position in inspiration image
    let imgX = floor(map(box.x, 0, width, 0, inspiration.image.width));
    let imgY = floor(map(box.y, 0, height, 0, inspiration.image.height));

    // Get color of the inspiration image at the corresponding position
    let pixelIndex = (imgY * inspiration.image.width + imgX) * 4;
    let r = inspiration.image.pixels[pixelIndex];
    let g = inspiration.image.pixels[pixelIndex + 1];
    let b = inspiration.image.pixels[pixelIndex + 2];
    //fill(avg)
    //if statements from gpt 
    if(currentDesignType === "text"){
      //snippet from daniel shiffman. Source: https://editor.p5js.org/codingtrain/sketches/r4ApYWpH_ lines 36 to 43
      let avg = (r + g + b) / 3;
      //fill(avg)
      //text
      fill(r, g, b);
      stroke(r, g, b);
      textSize(box.text)
      const len = density.length;
      const charIndex = floor(map(avg, 0, 255, len, 0));
      text(density.charAt(charIndex), box.x, box.y);
    }
    if(currentDesignType === "polygon"){
      fill(r,g,b, random(10, 255))
      polygon(box.x, box.y, box.w/3, random(5, 12))
    }
    if(currentDesignType === "square"){
      fill(r,g,b, random(10, 255))
      rect(box.x, box.y, box.w, box.h);
    }
  }
}

function mutateDesign(design, inspiration, rate) {
  let selectedOption = dropper.options[dropper.selectedIndex];
  if(selectedOption.innerHTML == "Hu Tao"){
  design.bg = mut(design.bg, 0, 50, rate);
  for (let box of design.fg) {
    //box.fill = mut(box.fill, 0, 255, rate);
    box.x = mut(box.x, 0, width, rate);
    box.y = mut(box.y, 0, height, rate);
    box.w = mut(box.w, 0, width / 4, rate);
    box.h = mut(box.h, 0, height / 4, rate);
  }
  }
  else{
      design.bg = mut(design.bg, 250, 255, rate);
      for (let box of design.fg) {
        //box.fill = mut(box.fill, 0, 255, rate);
        box.x = mut(box.x, 0, width, rate);
        box.y = mut(box.y, 0, height, rate);
        box.w = mut(box.w, 0, width / 4, rate);
        box.h = mut(box.h, 0, height / 4, rate);
    } 
  }
}

function mut(num, min, max, rate) {
  return constrain(randomGaussian(num, (rate * (max - min)) / 10), min, max);
}

//pulled from p5.js examples: https://p5js.org/examples/form-regular-polygon.html
function polygon(x, y, radius, npoints) {
  let angle = TWO_PI / npoints;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
