function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}


let grid;
let cols;
let rows;
let resolution = 20;
let fr = 30;


function setup() {
  createCanvas(windowWidth, 400);
  cols = width / resolution;
  rows = height / resolution;
  grid = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      grid[i][j] = floor(random(2));
    }
  }
}


function draw() {
  background(0);
  frameRate(fr);
 
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution;
      let y = j * resolution;
      if (grid[i][j] == 1) {
        switch(countNeighbors(grid, i, j)){
          case 0:
              fill('#FF4500');
              break;
          case 1:
              fill('#FF4500');
              break;
          case 2:
              fill('#FFD700');
              break;
          case 3:
              fill('#00FF00');
              break;
          case 4:
              fill('#00FFFF');
              break;
          case 5:
              fill('#0000FF');
              break;
          case 6:
              fill('#FF00FF');
              break;
          case 7:
              fill('#4B0082');
              break;
          case 8:
              fill('#0310ea');
              break;
        }
        stroke(0);
        rect(x, y, resolution - 1, resolution - 1);
      }
    }
  }


  let next = make2DArray(cols, rows);


  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let state = grid[i][j];
      let neighbors = countNeighbors(grid, i, j);

      if (state == 0 && neighbors == 3) {
        next[i][j] = 1;
      } else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
        next[i][j] = 0;
      } else {
        next[i][j] = state;
      }
    }
  }
  grid = next;
}


function countNeighbors(grid, x, y) {
  let sum = 0;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols;
      let row = (y + j + rows) % rows;
      sum += grid[col][row];
    }
  }
  sum -= grid[x][y];
  return sum;
}






