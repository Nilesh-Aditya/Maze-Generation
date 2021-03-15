let grid = [];
let cols, rows;
let currentGrid;
let w = 40;


function setup() {
    createCanvas(800, 800);

    cols = width / w;
    rows = height / w;

    for (let j = 0; j < rows; j++){
        for (let i = 0; i < cols; i++){
            let cell = new Krushkal(i, j);
            grid.push(cell);
        }
    }
    frameRate(30);
}

function draw() {
    background(51);
}

class Krushkal{
    constructor(i, j) {
        this.i = i;
        this.j = j;
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
}