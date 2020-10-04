function make2DArray(rows, cols) {
  let arr = new Array(cols);
  for (let k = 0; k < rows; k++) {
    arr[k] = new Array(rows);
  }
  return arr;
}

function black_or_white(grid, cols) {
  let number;
  for (let j = 0; j < grid.length; j++) {
    number = 0;
    for (let i = 0; i < grid[j].length; i++) {
      grid[i][j] = floor(random(2));
      if (grid[i][j] == 1) {
        number += 1;
      }
      if (number == floor(cols / 2)) {
        for (let k = i; k < grid[j].length; k++) {
          grid[k][j] = 0;
        }
        break;
      }
    }
  }
  return grid;
}

let resolution = 50;
let cols;
let rows;
let grid;
let count_red = 0;
let count_blue = 0;
let start_button = 0;
let start = 0;
let end = 0;

function h_cost(end, x, y) {
  // distance from ending point
  let distance_from_end = Math.sqrt((end[0] - x) ** 2 + (end[1] - y) ** 2);
  return distance_from_end;
}

function g_cost(start, x, y) {
  // distance from starting point
  let distance_from_start = Math.sqrt(
    (start[0] - x) ** 2 + (start[1] - y) ** 2
  );
  return distance_from_start;
}

let number_of_patterns_found = 0;

function a_star(grid, start, end, collection_of_grids = []) {
  /*
  I have a new idea: instead of doing what the program is actually doing, I was thinking to let the programm randomly decide a free cell, and then try all the possibility.
  It will eventually arrive at the end cell. When this appens it starts again. The final grid will be the one with less green cells
  */

  try {
    if (start[0] == end[0] && start[1] == end[1]) {
      grid[end[0]][end[1]] = 3;
      console.log("A pattern has been found!");
      number_of_patterns_found += 1;
      const copyWithAssign = make2DArray(rows, cols); // Changes to array will not change copyWithAssign
      for (let i = 0; i < grid.length; i++) {
        Object.assign(copyWithAssign[i], grid[i]); // Object.assign(target, source)
      }
      collection_of_grids.push(copyWithAssign);
      // var temp_grid = Array.from(grid);
      // collection_of_grids[number_of_patterns_found].push(Array.from(grid[0]));
      // collection_of_grids[number_of_patterns_found].push(Array.from(grid[1]));
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          if (grid[i][j] == 2) {
            start = [i, j];
          }
          if (grid[i][j] == 4) {
            grid[i][j] = 5; // change green to other in order to not be analyzed again later
          }
        }
      }
      // console.log(grid);
      // console.log(collection_of_grids);
      return a_star(grid, start, end, collection_of_grids);
      // return grid;
    }
    // console.log("Lo start è", start);
    // console.log("L'end è", end);
    let next_grid = [[], []];
    for (
      let i = Math.abs(start[0] - 1) % (start[0] + 1);
      i <= start[0] + ((start[0] + 1) % grid.length) / (start[0] + 1);
      i++
    ) {
      /* 
          Here next_grid is a 2D array in which are stored in the first array the value of the f_cost function (f = g+h), and the second array 
          a tuple which contains the coordinates of the cells evalueted.
          The goal here is to store all of these values, then find the shortest f_cost value so move to that cell
          #ToDo: what to do if there are cells with the same f_cost?
          Then the new cell will be the new start and it will loop again until the cell becomes the end cell then noLoop()
          */
      for (
        let j = Math.abs(start[1] - 1) % (start[1] + 1);
        j <= start[1] + ((start[1] + 1) % grid.length) / (start[1] + 1);
        j++
      ) {
        if (grid[i][j] == 0 || grid[i][j] == 3) {
          // || grid[i][j] == 3
          let g = g_cost(start, i, j);
          let h = h_cost(end, i, j);
          let f = g + h;
          next_grid[0].push(f);
          next_grid[1].push([i, j]);
        }
        /*
        The idea here is to make the program analyze the already green cell if there are not others available
        */
        // else if (grid[i][j] == 4) {
        //   let g = g_cost(start, i, j);
        //   let h = h_cost(end, i, j);
        //   let f = g + h;
        //   next_grid[0].push(f);
        //   next_grid[1].push([i, j]);
        // }
      }
    }
    // console.log(next_grid);
    let min_f = Math.min.apply(null, next_grid[0]);
    // console.log("Il minimo vale", min_f);
    let temp = next_grid[0];
    let temp_index = temp.indexOf(min_f);
    // console.log("L'indice del minimo vale", temp_index);
    index_of_new_start = next_grid[1][temp_index];
    start = index_of_new_start;
    grid[start[0]][start[1]] = 4;
    return a_star(grid, start, end, collection_of_grids);
  } catch {
    console.log("I'm here in catch");
    if (collection_of_grids.length >= 1) {
      let patterns = [];
      for (let k = 0; k < collection_of_grids.length; k++) {
        let number_of_green_cells = 0;
        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < cols; j++) {
            if (collection_of_grids[k][i][j] == 4) {
              number_of_green_cells += 1;
            }
          }
        }
        patterns.push(number_of_green_cells);
      }
      console.log("Patterns = ", patterns);
      let least_number_of_green_cells = Math.min.apply(null, patterns);
      grid = collection_of_grids[patterns.indexOf(least_number_of_green_cells)]; //final grid
      console.log("Collection of Grids = ", collection_of_grids);
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          if (grid[i][j] == 4) {
            grid[i][j] = 0;
          }
          if (grid[i][j] == 5) {
            grid[i][j] = 4;
          }
        }
      }
      console.log("DONE!");
      return grid;
    }
  }
  if (collection_of_grids.length === 0) {
    throw "There is No Other Pattern Available";
  } else {
    throw "The Best Pattern Has Been Found";
  }
}

function setup() {
  createCanvas(500, 500);
  cols = width / resolution;
  rows = height / resolution;
  grid = black_or_white(make2DArray(rows, cols), cols);
}

function draw() {
  background(0);
  // rectMode(RADIUS);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let x = i * resolution;
      let y = j * resolution;
      if (grid[i][j] == 0) {
        fill(255);
        rect(x, y, resolution, resolution);
      } else if (grid[i][j] == 2) {
        start = [i, j];
        fill(255, 0, 0);
        rect(x, y, resolution, resolution);
      } else if (grid[i][j] == 3) {
        end = [i, j];
        fill("#008CBA");
        rect(x, y, resolution, resolution);
      } else if (grid[i][j] == 4) {
        fill(28, 216, 11);
        rect(x, y, resolution, resolution);
      } else {
        fill(0);
        rect(x, y, resolution, resolution);
      }
    }
  }
  if (start != 0 && end != 0 && start_button != 0) {
    grid = a_star(grid, start, end, []);
    start_button = 0;
  }
}

function mousePressed() {
  let x = floor(mouseX - (mouseX % 50));
  let y = floor(mouseY - (mouseY % 50));
  // console.log(mouseX, mouseY);
  if (x < width && y < height) {
    if (grid[x / resolution][y / resolution] >= 0 && count_red == 1) {
      grid[x / resolution][y / resolution] = 2;
      count_red = 10;
    } else if (grid[x / resolution][y / resolution] >= 0 && count_blue == 1) {
      grid[x / resolution][y / resolution] = 3;
      count_blue = 10;
    } else if (grid[x / resolution][y / resolution] == 0) {
      // this means that when a white square is clicked it turns into a black one
      grid[x / resolution][y / resolution] = 1;
    } else {
      grid[x / resolution][y / resolution] = 0;
    }
  } else if (
    mouseX < 610 &&
    mouseX > 500 &&
    mouseY > -210 &&
    mouseY < -140 &&
    count_red == 0
  ) {
    // red botton pressed ---> now select the start red cell
    count_red++;
  } else if (
    mouseX < 610 &&
    mouseX > 500 &&
    mouseY > -135 &&
    mouseY < -70 &&
    count_blue == 0
  ) {
    // blue botton pressed ---> now select the start red cell
    count_blue++;
  } else if (
    mouseX < 600 &&
    mouseX > 499 &&
    mouseY > -57 &&
    mouseY < -4 &&
    start_button == 0 &&
    count_red > 0 &&
    count_blue > 0
  ) {
    start_button++;
  }
}
