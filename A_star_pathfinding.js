function make2DArray(rows, cols){
    let arr = new Array(cols);
    for (let k = 0; k < rows; k++){
        arr[k] = new Array(rows);
    }
    return arr;
}


function black_or_white(grid, cols){
    let number;
    for (let j = 0; j < grid.length; j ++){
        number = 0;
        for (let i = 0; i < grid[j].length; i++){
            grid[i][j] = floor(random(2));
            if (grid[i][j] == 1){
                number += 1;
            }
            if (number == floor(cols/5)){
                for (let k = i; k < grid[j].length; k++){
                    grid[j][k] = 0;
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

function setup(){
    createCanvas(500, 500);
    cols = width/resolution
    rows = height/resolution
    grid = black_or_white(make2DArray(rows, cols), cols);
}

function draw(){
    background(0);
    // rectMode(RADIUS);
    for (let i = 0; i < rows; i ++){
        for (let j = 0; j < cols; j++){
            let x = i * resolution;
            let y = j * resolution;
            if (grid[i][j] == 0){
                fill(255);
                rect(x, y, resolution, resolution);
            }
            else if (grid[i][j] == 3){
                fill(0, 0, 255);
                rect(x, y, resolution, resolution);
            }
            else if (grid[i][j] == 2){
                fill(255, 0, 0);
                rect(x, y, resolution, resolution);
            }
            else{
                fill(0);
                rect(x, y, resolution, resolution);                
            }
        }
    }
}

function mousePressed(){
    let x = floor(mouseX - (mouseX % 50));
    let y = floor(mouseY - (mouseY % 50));
    console.log(mouseX,mouseY);
    if (x < width && y < height){
        if (grid[x/resolution][y/resolution] == 0 && count_red == 0){ // this means that when a white square is clicked it turns into a black one
            grid[x/resolution][y/resolution] = 1;
        }
        
        else if(grid[x/resolution][y/resolution] >= 0 && count_red > 0){
            grid[x/resolution][y/resolution] = 2;
            count_red = 0;
        }
        else if (grid[x/resolution][y/resolution] > 0 && count_blue > 0){
            grid[x/resolution][y/resolution] = 3;
            count_blue = 0;
        }
        else{
            grid[x/resolution][y/resolution] = 0;
        }
    }
    else if ((mouseX < 635 || mouseX > 500) && (y > -55 || y < -6) && count_red == 0){ // red botton pressed ---> now select the start red cell
        count_red++;       
    }
    else if ((mouseX < 637 || mouseX > 500) && (y > -114 || y < -70) && count_blue == 0){ // red botton pressed ---> now select the start red cell
        count_blue++;       
    }
}
