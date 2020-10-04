// let a = [
//   [0, 1, 2, 3, 4, 5],
//   [6, 7, 8, 9, 10, 11],
// ];
// let b = [];
// b.push(Array.from(a[0]));
// b.push(Array.from(a[1]));
// console.log("a vale ", a);
// console.log("b vale ", b);
// let i = 0;
// while (i < a[0].length) {
//   a[0][i] += 1;
//   a[1][i] += 1;
//   i++;
// }
// b.push(Array.from(a[0]));
// b.push(Array.from(a[1]));
// console.log(b.length);

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
      grid[i][j] = Math.floor(Math.random(2));
      if (grid[i][j] == 1) {
        number += 1;
      }
      if (number == Math.floor(cols / 2)) {
        for (let k = i; k < grid[j].length; k++) {
          grid[k][j] = 0;
        }
        break;
      }
    }
  }
  return grid;
}
let cols = 10;
let rows = 10;
let grid = black_or_white(make2DArray(rows, cols), cols);
const copyWithAssign = make2DArray(rows, cols); // Changes to array will not change copyWithAssign
for (let i = 0; i < grid.length; i++) {
  Object.assign(copyWithAssign[i], grid[i]); // Object.assign(target, source)
}
console.log(grid);
let b = [];
b.push(Array.from(copyWithAssign));
console.log(b);
for (let j = 0; j < grid.length; j++) {
  for (let i = 0; i < grid[j].length; i++) {
    grid[i][j] = 3;
  }
}
b.push(Array.from(grid));
console.log("This is b: ", b);

// YES
