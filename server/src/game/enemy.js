const Constants = require("../../../Constants/constantServer.js");

class Enemy {
    constructor(row, col, maze) {
        this.row = row;
        this.col = col;
        this.maze = maze;
        this.currentDirection = "left";
        this.moveCooldown = 0;

        this.visited = new Array(Constants.NUM_TILES_HEIGHT);
        for (let i = 0; i < this.maze.length; i++) {
            this.visited[i] = new Array(Constants.NUM_TILES_WIDTH).fill(false);
        }
    }

    update() {
        //Move in random valid direction. Direction is valid if not already been visited.
        if (this.moveCooldown % 10 == 0) {
            this.visited[this.row][this.col] = true;

            this.currentDirection = this.randomValidDirection(this.row, this.col);
            if (this.currentDirection === "left") this.col--;
            if (this.currentDirection === "right") this.col++;
            if (this.currentDirection === "up") this.row--;
            if (this.currentDirection === "down") this.row++;
        }

        this.moveCooldown++;
    }

    randomValidDirection(row, col) {
        let validNeighbors = [];
        if (col - 1 >= 0 && !this.maze[this.row][this.col - 1].right && !this.visited[this.row][this.col - 1]) validNeighbors.push("left");
        if (col + 1 < Constants.NUM_TILES_WIDTH && !this.maze[this.row][this.col + 1].left && !this.visited[this.row][this.col + 1]) validNeighbors.push("right");
        if (row - 1 >= 0 && !this.maze[this.row - 1][this.col].bottom && !this.visited[this.row - 1][this.col]) validNeighbors.push("up");
        if (row + 1 < Constants.NUM_TILES_HEIGHT && !this.maze[this.row + 1][this.col].top && !this.visited[this.row + 1][this.col]) validNeighbors.push("down");

        if (validNeighbors.length === 0) {
            //if no valid neighbors, clear visited and call function again
            for (let i = 0; i < this.maze.length; i++) {
                this.visited[i] = new Array(Constants.NUM_TILES_WIDTH).fill(false);
            }

            return this.randomValidDirection(this.row, this.col);
        } else {
            return this.currentDirection = validNeighbors[Math.floor(Math.random() * validNeighbors.length)];
        }
    }

    serializeForUpdate() {
        return {
            row: this.row,
            col: this.col,
        }
    }
}

module.exports = Enemy;