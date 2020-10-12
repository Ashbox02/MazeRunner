const GameObject = require("./gameObject.js");
const Constants = require("../../../Constants/constantServer.js");

class Player extends GameObject {
    constructor(socket, row, col, maze) {
        super(socket, row, col);
        this.colors = ["blue", "green", "cyan", "purple", "pink"];
        this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
        this.maze = maze;
    }

    input(inputData) {
        if (inputData === "left" && this.col - 1 >= 0 && !this.maze[this.row][this.col - 1].right) this.col--;
        if (inputData === "right" && this.col + 1 < Constants.NUM_TILES_WIDTH && !this.maze[this.row][this.col + 1].left) this.col++;
        if (inputData === "up" && this.row - 1 >= 0 && !this.maze[this.row - 1][this.col].bottom) this.row--;
        if (inputData === "down" && this.row + 1 < Constants.NUM_TILES_HEIGHT && !this.maze[this.row + 1][this.col].top) this.row++;
    }

    update() {

    }

    enemyCollision() {
        this.color = "RED";
    }

    serializeForUpdate() {
        return {
            row: this.row,
            col: this.col,
            color: this.color,
        }
    }
}

module.exports = Player;