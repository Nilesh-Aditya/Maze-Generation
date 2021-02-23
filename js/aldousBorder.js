let grid = [];
let currentGrid;
let w = 40;
let rows, cols;
let stack = [];
let cnt = 0;
let remaining;

function setup() {
    createCanvas(800, 800);
    cols = width / w;
    rows = height / w;
    remaining = rows * cols - 1;

    for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
            let cell = new AldousBorder(i, j);
            grid.push(cell);
        }
    }

    frameRate(30);

    grid[0].visited = true;
    currentGrid = grid[0];
}




function draw() {
    background(51);

    for (let i = 0; i < grid.length; i++) {
        grid[i].show();
    }
    if (currentGrid) {
        currentGrid.highlight();
    }
    if (remaining > 0) {
        let rand = floor(random(0, grid.length));
        currentGrid = grid[rand];
        if(!currentGrid.visited)
        currentGrid.visited = true;
        let chosenGrid = currentGrid.checkNeighborElements();
        
        if (chosenGrid) {
            removeWall(currentGrid, chosenGrid);
            chosenGrid.visited = true;
            remaining -= 1;
        }
        
        currentGrid = chosenGrid;
    }

}


class AldousBorder{
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

        this.neighbors = 0;
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
            this.neighbors = neighbor.length;
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
    // console.log(current);
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