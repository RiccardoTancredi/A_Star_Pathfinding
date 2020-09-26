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
let start_button = 0;
let start = 0;
let end = 0;

function f_cost(end, x, y){
    // distance from ending point
    let distance_from_end = Math.sqrt((end[0] - x)**2 + (end[1] - y)**2);
    return distance_from_end;
}

function g_cost(start, x, y){ 
    // distance from starting point 
    let distance_from_start = Math.sqrt((start[0] - x)**2 + (start[1] - y)**2);
    return distance_from_start;
}

function a_star(grid, start, end){
    for (let i = start[0] - (start[0] % (start[0] - 1)); i <= start[0] + 1 - ((grid[0].length % start[0])) ; i++){
        // for (let j = start[1] - (start[1] % (start[1] - 1)); j < start[1] + Math.abs((start[1] + 1) % start[1]) ; j++){
            
        // }
    }
}



function setup(){
    createCanvas(500, 500);
    cols = width/resolution;
    rows = height/resolution;
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
            else if (grid[i][j] == 2){
                start = [i, j];
                fill(255, 0, 0);
                rect(x, y, resolution, resolution);
            }
            else if (grid[i][j] == 3){
                end = [i, j];
                fill('#008CBA');
                rect(x, y, resolution, resolution);
            }
            else if (grid[i][j] == 4){
                fill('green');
                rect(x, y, resolution, resolution);
            }
            else{
                fill(0);
                rect(x, y, resolution, resolution);                
            }
        }
    }
    if (start != 0 && end != 0 && start_button != 0){

    }
}

function mousePressed(){
    let x = floor(mouseX - (mouseX % 50));
    let y = floor(mouseY - (mouseY % 50));
    // console.log(mouseX, mouseY);
    if (x < width && y < height){
        if(grid[x/resolution][y/resolution] >= 0 && count_red == 1){
            grid[x/resolution][y/resolution] = 2;
            count_red = 10;
        }
        else if (grid[x/resolution][y/resolution] >= 0 && count_blue == 1){
            grid[x/resolution][y/resolution] = 3;
            count_blue = 10;
        }
        else if (grid[x/resolution][y/resolution] == 0){ // this means that when a white square is clicked it turns into a black one
            grid[x/resolution][y/resolution] = 1;
        }       
        else{
            grid[x/resolution][y/resolution] = 0;
        }
    }
    else if ((mouseX < 610 && mouseX > 500) && (mouseY > -210 && mouseY < -140) && count_red == 0){ // red botton pressed ---> now select the start red cell
        count_red++; 
    }
    else if ((mouseX < 610 && mouseX > 500) && (mouseY > -135 && mouseY < -70) && count_blue == 0){ // blue botton pressed ---> now select the start red cell
        count_blue++;
    }
    else if ((mouseX < 600 && mouseX > 499) && (mouseY > -57 && mouseY < -4) && start_button == 0 && count_red > 0 && count_blue > 0){
        start_button++;
    }
}