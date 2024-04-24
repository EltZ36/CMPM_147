/* exported generateGrid, drawGrid */
/* global placeTile */

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
    generateRiver(grid, 1, 8, 5, 50, 80)
    generateLoot(grid);
    return grid;
    //if water touches a chest == chest sinks and turns into water a couple frames later
  }
  
  var timer = 2000;
  var nextChange = 0;
  var changeWater = true;
  
  function changeFlag() {
    changeWater = !changeWater;
  }
  
  function drawGrid(grid) {
    background(128);
  
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        //timer logic from gpt and asking how to make a timer that triggers every 2 seconds 
        if((millis() - nextChange >= timer)){
              changeFlag()
              nextChange = millis()
        }
        if (grid[i][j] == "_") {
          //placeTile(i, j, floor(random(0, 4)), 21);
          placeTile(i, j, floor(random(1, 3)), 21)
          drawContext(grid, i, j, "_", 1, 21);
          //drawContext(grid, i, j, "_", 20, 12);
        }
        if (grid[i][j] == ".") {
          placeTile(i, j, floor(random(0, 4)), 15);
          //drawContext(grid, i, j, ".", 0, 12);
          drawContext(grid, i, j, ".", 0, 15);
        }
        if (grid[i][j] == "w") {
          if(changeWater == false){
            placeTile(i, j, floor(random(0,4)), 14);
          }
          else{
            placeTile(i, j, floor(random(12,14)), 20)
          }
        }
        if (grid[i][j] == "c") {
          placeTile(i, j, floor(random(0,6)), 28);
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
  
  
  const snowDirtOffsets = [];
  
  const snowGrassOffsets = [];
  
  //ask question on how to make sure autotilling works as this one is each line instead of the other way
  
  //changed the function with CJ's advice
  function drawContext(grid, i, j, target, ti, tj) {
    // TODO
    var code = gridCode(grid, i, j, target);
    if (isNaN(code) == false && target == ".") {
      //const [tiX, tjY] = dirtTiles[code];
      const [tiOffset, tjOffset] = dirtOffsets[code];
      placeTile(i, j, ti + tiOffset, tj + tjOffset);
    } else if (isNaN(code) == false && target == "_") {
      //const [tiX, tjY] = grassTiles[code];
      const [tiOffset, tjOffset] = grassOffsets[code];
      placeTile(i, j, ti + tiOffset, tj + tjOffset);
    }}
  
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
    var tunnelWidth = 2;
    //Set the start X position to the center of the tunnel
    var x = floor(random(5, 15));
    //System.Random rand = new System.Random(Time.time.GetHashCode());
  
    //Create the first part of the tunnel
    for (let i = -tunnelWidth; i <= tunnelWidth; i++) {
      grid[0][x+i] = ".";
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
        let result = x + i;
        grid[y][result] = ".";
      }
    }
    //console.log(grid)
    return grid;
  }
  
  function generateLoot(grid) {
    for (let i = 0; i < grid.length - 1; i++) {
      for (let j = 0; j < grid.length - 1; j++) {
        let chance = random(0, 1);
        if (grid[i][j] == "." && grid[i + 1][j + 1] == "." && (grid[i][j + 1] == ".")){
          if (chance <= 0.01 && chance < 0.03) {
            grid[i][j] = "c";
          }
          if (chance > 0.03 && chance < 0.05) {
            grid[i][j] = "w";
          }
        }
      }
    }
  }
  