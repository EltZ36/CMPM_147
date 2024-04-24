/* exported generateGrid, drawGrid */
/* global placeTile */

let seed = 0;
let tilesetImage;
let currentGrid = [];
let numRows, numCols;

function generateGrid(numCols, numRows) {
    let grid = [];
    //i goes down while j goes straight
    //400 characters
    for (let i = 0; i < numCols; i++) {
      let row = [];
      for (let j = 0; j < numRows; j++) {
        row.push("_");
      }
      grid.push(row);
    }
    
    let dirtX = floor(random(0,15));
    let dirtY = floor(random(0,15));
    
    
    //let room1_col = floor(random(7, 9));
    //let room1_row = floor(random(10, 15));
    for (let i = dirtX; i < numCols; i++) {
      for (let j = dirtY; j < numRows; j++) {
        grid[i][j] = ".";
      }
    }
    generateTree(grid)
    generateRiver(grid, 2, 5, 3, 90, 98);
    return grid;
    //if water touches a chest == chest sinks and turns into water a couple frames later
  }
  
  var timer = 2000
  var nextChange = 0
  var changeWater = false 
  var weather = true 
  
  function changeFlag(){
    changeWater = !changeWater
  }

  function switchWeather() {
    weather = !weather
  }
            
  function drawGrid(grid, weather) {
    background(128);
  
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (weather == true) {
          if (grid[i][j] == "_") {
            placeTile(i, j, floor(random(0, 4)), 0);
            //placeTile(i, j, 20, 12);
            drawContext(grid, i, j, "_", 2, 0, weather);
            //drawContext(grid, i, j, "_", 20, 12);
          }
          if (grid[i][j] == ".") {
            placeTile(i, j, floor(random(0, 4)), 3);
            //drawContext(grid, i, j, ".", 0, 12);
            drawContext(grid, i, j, ".", 0, 3, weather);
          }
          if (grid[i][j] == "r") {
            //var cycle = floor(random(0, 4))
            if((millis() - nextChange >= timer)){
              changeFlag()
              nextChange = millis()
            }
            if(changeWater == true){
              placeTile(i, j, floor(random(1,3)), 14)
              drawContext(grid, i, j, "r", 14, 1, weather);
            }
            if(changeWater == false){
              changeWater = false
              placeTile(i, j, 0, 14)
              drawContext(grid, i, j, "r", 14, 1, weather);  
            }
          }
          if(grid[i][j] == "m"){
            placeTile(i, j, 16, floor(random(10, 12)));
          }
          if(grid[i][j] == "t"){
            placeTile(i, j, 16, floor(random(0,2)));
          }
        } 
        else {
          if (grid[i][j] == "_") {
            placeTile(i, j, floor(random(0, 4)), 12);
            //placeTile(i, j, 2, 0);
            drawContext(grid, i, j, "_", 2, 12);
          }
          if (grid[i][j] == ".") {
            placeTile(i, j, floor(random(0, 4)), 3);
            drawContext(grid, i, j, ".", 0, 3);
          }
          if (grid[i][j] == "r") {
            //var cycle = floor(random(0, 4))
            if((millis() - nextChange >= timer)){
              changeFlag()
              nextChange = millis()
            }
            if(changeWater == true){
              placeTile(i, j, floor(random(1,3)), 14)
              drawContext(grid, i, j, "r", 14, 1);
            }
            if(changeWater == false){
              changeWater = false
              placeTile(i, j, 0, 14)
              drawContext(grid, i, j, "r", 14, 1);  
            }
          }
          if(grid[i][j] == "m"){
            placeTile(i, j, 22, floor(random(10,12)))
          }
          if(grid[i][j] == "t"){
            placeTile(i, j, 16, floor(random(12,14)));
          }
        }
      }
    }
  }
  
  function gridCheck(grid, i, j, target) {
    // TODO
    if (i >= 0 && i < grid.length && j >= 0 && j < grid.length) {
      if (grid[i][j] == target) {
        return true;
      } else {
        return false;
      }
    }
  }
  
  function gridCode(grid, i, j, target) {
    var northBit = gridCheck(grid, i - 1, j, target);
    var southBit = gridCheck(grid, i + 1, j, target);
    var eastBit = gridCheck(grid, i, j + 1, target);
    var westBit = gridCheck(grid, i, j - 1, target);
    //four bit mask pulled from the article provided by the slides
    return northBit * 1 + westBit * 2 + eastBit * 4 + southBit * 8;
  }
  
  //(-1, -1) = left corner (1, -1) right corner
  //top middle part = 0 , - 1
  //bottom middle part: 0 , 2
  //middle (left): 1, 1
  //middle (right): -1,1
  //southeast: (1,2)
  //southwest: (-1,2)
  //help from CJ Moshy on tile
  
  /*const dirtTilesRiver = [
    /*  0000 (0)
  0001 (1)
  0010 (2)
  0011 (3)
  0100 (4)
  0101 (5)
  0110 (6)
  0111 (7)
  1000 (8)
  1001 (9)
  1010 (10)
  1011 (11)
  1100 (12)
  1101 (13)
  1110 (14)
  1111 (15)
    //0
    [14, 1],
    //1
    [14, 1],
    //2
    [14, 1],
    //3
    [11, 5],
    //4
    [14, 1],
    //5
    [9, 5],
    //6
    [14, 1],
    //7
    [10, 5],
    //8
    [14, 1],
    //9
    [14, 1],
    //10
    [11, 3],
    //11
    [11, 4],
    //12
    [9, 3],
    //13
    [9, 4],
    //14
    [10, 3],
    //15
    [14, 1],
  ]; */
  
  const dirtOffsetRiver = [
    //0
    [0, 0],
    //1
    [0, 0],
    //2
    [0, 0],
    //3
    [-3, 4],
    //4
    [-5, 2],
    //5
    [-5, 4],
    //6
    [-4, 2],
    //7
    [-4, 4],
    //8
    [0, 0],
    //9
    [0, 0],
    //10
    [-3, 2],
    //11
    [-3, 3],
    //12
    [-5, 2],
    //13
    [-5, 3],
    //14
    [-4, 2],
    //15
    [0, 0],
  ];
  
  /*const dirtTiles = [
    //0
    [0, 3],
    //1
    [0, 3],
    //2
    [0, 3],
    //3
    [6, 5],
    //4
    [0, 3],
    //5
    [4, 5],
    //6
    [0, 3],
    //7
    [5, 5],
    //8
    [0, 3],
    //9
    [0, 3],
    //10
    [6, 3],
    //11
    [6, 4],
    //12
    [4, 3],
    //13
    [4, 4],
    //14
    [5, 3],
    //15
    [0, 3],
  ]; */
  
  const dirtOffsets = [
    //0
    [0, 0],
    //1
    [0, 0],
    //2
    [0, 0],
    //3
    [6, 2],
    //4
    [0, 0],
    //5
    [4, 2],
    //6
    [0, 0],
    //7
    [5, 2],
    //8
    [0, 0],
    //9
    [0, 0],
    //10
    [6, 0],
    //11
    [6, 1],
    //12
    [4, 0],
    //13
    [4, 1],
    //14
    [5, 0],
    //15
    [0, 0],
  ];
  
  /*const grassTiles = [
    //0
    [2, 0],
    //1
    [2, 0],
    //2
    [2, 0],
    //3
    [6, 2],
    //4
    [2, 0],
    //5
    [4, 2],
    //6
    [2, 0],
    //7
    [5, 2],
    //8
    [2, 0],
    //9
    [2, 0],
    //10
    [6, 0],
    //11
    [6, 1],
    //12
    [4, 0],
    //13
    [4, 1],
    //14
    [5, 0],
    //15
    [2, 0],
  ]*/
  
  const grassOffsets = [
    //0
    [0, 0],
    //1
    [0, 0],
    //2
    [0, 0],
    //3
    [4, 2],
    //4
    [0, 0],
    //5
    [2, 2],
    //6
    [0, 0],
    //7
    [3, 2],
    //8
    [0, 0],
    //9
    [0, 0],
    //10
    [4, 0],
    //11
    [4, 1],
    //12
    [2, 0],
    //13
    [2, 1],
    //14
    [3, 0],
    //15
    [0, 0],
  ];
  
  //[14, 1]
 /* const snowWaterTiles = [
    //0
//0
[14, 1],
//1
[14, 1],
//2
[14, 1],
//3
[11, 14],
//4
[14, 1],
//5
[9, 14],
//6
[14, 1],
//7
[10, 14],
//8
[14, 1],
//9
[14, 1],
//10
[11, 12],
//11
[11, 13],
//12
[9, 12],
//13
[9, 13],
//14
[10, 12],
//15
[14, 1], 
  ] */

  const snowWaterOffsets = [
    //0
    [0,0],
    //1
    [0,0],
    //2
    [0,0],
    //3
    [-3, 13],
    //4 
    [0,0],
    //5
    [-5, 13],
    //6
    [0,0],
    //7
    [-4, 13],
    //8
    [0, 0],
    //9
    [0, 0],
    //10
    [-3, 11],
    //11
    [-3, 12],
    //12
    [-5, 11],
    //13
    [-5, 12],
    //14
    [-4, 11],
    //15
    [0, 0],
  ];
  
  //ask question on how to make sure autotilling works as this one is each line instead of the other way
  
  //changed the function with CJ's advice
  function drawContext(grid, i, j, target, ti, tj) {
    // TODO
    var code = gridCode(grid, i, j, target);
    if(weather == true){
    if (isNaN(code) == false && target == "r") {
      //const [tiX, tjY] = dirtTilesRiver[code];
      const [tiOffset, tjOffset] = dirtOffsetRiver[code];
      placeTile(i, j, ti + tiOffset, tj + tjOffset);
    } else if (isNaN(code) == false && target == ".") {
      //const [tiX, tjY] = dirtTiles[code];
      const [tiOffset, tjOffset] = dirtOffsets[code];
      placeTile(i, j, ti + tiOffset, tj + tjOffset);
    } else if (isNaN(code) == false && target == "_") {
      //const [tiX, tjY] = grassTiles[code];
      const [tiOffset, tjOffset] = grassOffsets[code];
      placeTile(i, j, ti + tiOffset, tj + tjOffset);
    }
    }
    else{
        if(isNaN(code) == false && target == "r"){
            const [tiOffset, tjOffset] = snowWaterOffsets[code];
            placeTile(i, j, ti + tiOffset, tj + tjOffset);
        }
        else if (isNaN(code) == false && target == ".") {
            //const [tiX, tjY] = dirtTiles[code];
            const [tiOffset, tjOffset] = dirtOffsets[code];
            placeTile(i, j, ti + tiOffset, tj + tjOffset);
          } else if (isNaN(code) == false && target == "_") {
            //const [tiX, tjY] = grassTiles[code];
            const [tiOffset, tjOffset] = grassOffsets[code];
            placeTile(i, j, ti + tiOffset, tj + tjOffset);
        }
    }   
  }
  
  //code snippet taken from https://blog.unity.com/engine-platform/procedural-patterns-to-use-with-tilemaps-part-2
  function generateRiver(
    grid,
    minPathWidth,
    maxPathWidth,
    maxPathChange,
    roughness,
    curvyness
  ) {
    //This value goes from its minus counterpart to its positive value, in this case with a width value of 1, the width of the tunnel is 3
    var tunnelWidth = 1;
    //Set the start X position to the center of the tunnel
    var x = floor(random(5, 15));
    //System.Random rand = new System.Random(Time.time.GetHashCode());
  
    //Create the first part of the tunnel
    for (let i = -tunnelWidth; i <= tunnelWidth; i++) {
      grid[x+i][0] = "r";
    }
    //Cycle through the array
    for (let y = 1; y < grid.length; y++) {
      //Check if we can change the roughness
      if (random(0, 100) > roughness) {
        //Get the amount we will change for the width
        var widthChange = floor(random(-maxPathWidth, maxPathWidth + 1));
        //Add it to our tunnel width value
        tunnelWidth += widthChange;
        //Check to see we arent making the path too small
        if (tunnelWidth < minPathWidth) {
          tunnelWidth = minPathWidth;
        }
        //Check that the path width isnt over our maximum
        if (tunnelWidth > maxPathWidth) {
          tunnelWidth = maxPathWidth;
        }
      }
  
      //Check if we can change the curve
      if (random(0, 100) > curvyness) {
        //Get the amount we will change for the x position
        var xChange = floor(random(-maxPathChange, maxPathChange));
        //Add it to our x value
        x += xChange;
        //Check we arent too close to the left side of the map
        if (x < maxPathWidth) {
          x = maxPathWidth;
        }
        //Check we arent too close to the right side of the map
        if (x > grid.length - maxPathWidth) {
          x = grid.length - maxPathWidth;
        }
      }
  
      //Work through the width of the tunnel
      for (let i = -tunnelWidth; i <= tunnelWidth; i++) {
        let result = x + i
        grid[result][y] = "r";
      }
    }
    //console.log(grid)
    return grid;
  }
  
  function generateTree(grid){
    for(let i = 0; i < grid.length; i++){
      for(let j = 0; j < grid.length; j++){
        let chance = (random(0 , 1))
        if(grid[i][j] != "r" && grid[i][j] == "_"){
          if(chance <= 0.01 && chance < 0.03){
            grid[i][j] = "m"
          }
          if(chance > 0.03 && chance < 0.05){
            grid[i][j] = "t"
          }
        }
      }
    }
  }

  function reseed(p5){
    seed = (seed | 0) + 1109;
    p5.randomSeed(seed);
    p5.noiseSeed(seed);
    //another gpt conversion 
    var seedReport = document.querySelector("#seedReport");
    seedReport.innerHTML = "seed" + seed;
    regenerateGrid();
  }
  
 function regenerateGrid(){
    var asciiBox = document.querySelector('#asciiBox')
    asciiBox.value = gridToString(numCols, numRows)
    var currentGrid = gridToString(generateGrid(asciiBox.value))
    //select("#asciiBox").value(gridToString(generateGrid(numCols, numRows)));
    reparseGrid();
  }
  
  function reparseGrid(){
    //from gpt and I asked how to convert jquery into regular javascript 
    var asciiBox = document.querySelector('#asciiBox');
    var asciiValue = asciiBox.value
    var currentGrid = stringToGrid(asciiValue);
  }
  
  function gridToString(grid){
    let rows = [];
    for (let i = 0; i < grid.length; i++) {
      rows.push(grid[i].join(""));
    }
    return rows.join("\n");
  }
  
  function stringToGrid(str){ 
    let grid = [];
    let lines = str.split("\n");
    for (let i = 0; i < lines.length; i++) {
      let row = [];
      let chars = lines[i].split("");
      for (let j = 0; j < chars.length; j++) {
        row.push(chars[j]);
      }
      grid.push(row);
    }
    return grid;
  }
