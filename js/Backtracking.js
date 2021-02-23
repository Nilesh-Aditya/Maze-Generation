let cols, rows;
let w = 40;
let grid = [];
let currentGrid;
let stack = [];


function setup() {
    createCanvas(800, 800);

    cols = width / w;
    rows = height / w;

    for (let j = 0; j < rows; j++){
        for (let i = 0; i < cols; i++){
            let cell = new Backtracking(i, j);
            grid.push(cell);
        }
    }
    frameRate(30);
    currentGrid = grid[0];
    currentGrid.visited = true;

    // const btn = document.querySelector('button').addEventListener('click', (e) => {
    //     hello(currentGrid);
    // });
    stack.push(grid[0]);
}

// function hello(currentGrid) {
//     console.log(12);
//     background(51);
//     // currentGrid.highlight();
//     currentGrid.visited = true;
//     for (let i = 0; i < grid.length; i++){
//         grid[i].show();
//         // if (stack.includes(grid[i])) {
//         //     grid[i].stackhighlight();
//         // }
//     }
//     let chosenGrid;
//     chosenGrid = currentGrid.checkNeighborElements();
//     if (chosenGrid) {
//         currentGrid = chosenGrid;
//     }
//     else {
//         // return currentGrid;
//     }
//     removeWall(currentGrid, chosenGrid);
//     // chosenGrid.visited = true;
//     currentGrid = chosenGrid;
//     hello(currentGrid);
// }

// iterative stack method DFS backtracking

function draw(){
    background(51);
    
    
    for (let i = 0; i < grid.length; i++){
        grid[i].show();
        if (stack.includes(grid[i])) {
            grid[i].stackhighlight();
        }
    }

    currentGrid.highlight();
 
    if (stack.length > 0) {
        currentGrid = stack.pop();
        let chosenGrid = currentGrid.checkNeighborElements();
    
        if (chosenGrid) {
            stack.push(currentGrid);
            stack.push(chosenGrid);
            chosenGrid.visited = true;
            removeWall(currentGrid, chosenGrid);
            currentGrid = chosenGrid;
        }
    }

}

class Backtracking{
    constructor(i, j) {
        this.i = i;
        this.j = j;
        this.visited = false;
        this.walls = {
            right: true,
            left: true,
            bottom: true,
            top: true
        };
    }

    show() {
        let x = this.i * w;
        let y = this.j * w;
        
        stroke(255);
        if (this.walls["top"]) {
            line(x, y, x + w, y);
        }
        if (this.walls["right"]) {
            line(x + w, y, x + w, y + w);
        }
        if (this.walls["bottom"]) {
            line(x + w, y + w, x, y + w);
        }
        if (this.walls["left"]) {
            line(x, y + w, x, y);
        }

        if (this.visited) {
            noStroke();
            fill('purple');
            rect(x, y, w, w);
        }
    }

    highlight() {
        let x = this.i * w;
        let y = this.j * w;
        noStroke();
        fill(0, 0, 255, 100);
        rect(x, y, w, w);
    }

    stackhighlight() {
        let x = this.i * w;
        let y = this.j * w;
        noStroke();
        fill(0, 0, 125, 100);
        rect(x, y, w, w);
    }

    checkNeighborElements() {
        let neighbor = [];

        let top = grid[checkIndex(this.i, this.j - 1)];
        let bottom = grid[checkIndex(this.i, this.j + 1)];
        let left = grid[checkIndex(this.i - 1, this.j)];
        let right = grid[checkIndex(this.i + 1, this.j)];

        if (top && !top.visited) {
            neighbor.push(top);
        }
        if (right && !right.visited) {
            neighbor.push(right);
        }
        if (bottom && !bottom.visited) {
            neighbor.push(bottom);
        }
        if (left && !left.visited) {
            neighbor.push(left);
        }
        
        if (neighbor.length > 0) {
            let r = floor(random(0, neighbor.length));
            return neighbor[r];
        }
        else {
            return undefined;
        }
    }
}



function checkIndex(i, j) {
    if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
        return -1;
    }
    return i + j*cols;
}

function removeWall(current, chosen) {
    console.log(current);
    if (current.i - chosen.i === -1) {
        current.walls["right"] = false;
        chosen.walls["left"] = false;
    }
    if (current.i - chosen.i === 1) {
        current.walls["left"] = false;
        chosen.walls["right"] = false;
    }
    if (current.j - chosen.j === -1) {
        current.walls["bottom"] = false;
        chosen.walls["top"] = false;
    }
    if (current.j - chosen.j === 1) {
        chosen.walls["bottom"] = false;
        current.walls["top"] = false;
    }
}