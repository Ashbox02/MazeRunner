import { getCurrentState } from "./gameUpdate.js";
import { NUM_TILES_WIDTH, NUM_TILES_HEIGHT } from "../../../Constants/constantClient.js";

const canvas = document.getElementById("display");
const ctx = canvas.getContext("2d");

let tileWidth, tileHeight;
let map;

initMapVars();
window.onresize = () => {
    initMapVars();
}

function initMapVars() {
    canvas.width = window.innerWidth - 2;
    canvas.height = window.innerHeight - 2;
    tileWidth = (canvas.width - 2) / NUM_TILES_WIDTH;
    tileHeight = (canvas.height - 2) / NUM_TILES_HEIGHT;
}

export function startRender() {
    setInterval(render, 1000 / 60);
}

function render() {
    const { maze, enemies, player, otherPlayers } = getCurrentState();
    if (!player) return;

    console.log(getCurrentState());

    ctx.fillStyle = "WHITE";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    renderGrid(maze);
    renderPlayers(player, otherPlayers);
    renderEnemies(enemies);
}

function renderGrid(maze) {
    //draw each cell
    for (let i = 0; i < NUM_TILES_HEIGHT; i++) {
        for (let j = 0; j < NUM_TILES_WIDTH; j++) {
            //check each wall, and draw
            if (maze[i][j].left) {
                ctx.beginPath();
                ctx.moveTo(j * tileWidth + 2, i * tileHeight + 2);
                ctx.lineTo(j * tileWidth + 2, i * tileHeight + tileHeight + 2);
                //g.drawLine(j * tileWidth + 1, i * tileHeight + 1, j * tileWidth + 1, i * tileHeight + tileHeight + 1);
                ctx.stroke();
            }

            if (maze[i][j].right) {
                ctx.beginPath();
                ctx.moveTo(j * tileWidth + tileWidth + 2, i * tileHeight + 2);
                ctx.lineTo(j * tileWidth + tileWidth + 2, i * tileHeight + tileHeight + 2);
                //g.drawLine(j * tileWidth + tileWidth + 1, i * tileHeight + 1, j * tileWidth + tileWidth + 1, i * tileHeight + tileHeight + 1);
                ctx.stroke();
            }

            if (maze[i][j].top) {
                ctx.beginPath();
                ctx.moveTo(j * tileWidth + 2, i * tileHeight + 2);
                ctx.lineTo(j * tileWidth + tileWidth + 2, i * tileHeight + 2);
                ctx.stroke();
                //g.drawLine(j * tileWidth + 1, i * tileHeight + 1, j * tileWidth + tileWidth + 1, i * tileHeight + 1);
            }

            if (maze[i][j].bottom) {
                ctx.beginPath();
                ctx.moveTo(j * tileWidth + 2, i * tileHeight + tileHeight + 2);
                ctx.lineTo(j * tileWidth + tileWidth + 2, i * tileHeight + tileHeight + 2);
                ctx.stroke();
                //g.drawLine(j * tileWidth + 1, i * tileHeight + tileHeight + 1, j * tileWidth + tileWidth + 1, i * tileHeight + tileHeight + 1);
            }
        }

    }
}


function renderPlayers(player, otherPlayers) {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.col * tileWidth + 4, player.row * tileHeight + 4, tileWidth - 4, tileHeight - 4);

    otherPlayers.forEach(player => {
        ctx.fillStyle = player.color;
        ctx.fillRect(player.col * tileWidth + 4, player.row * tileHeight + 4, tileWidth - 4, tileHeight - 4);
    })
}

function renderEnemies(enemies) {
    ctx.fillStyle = "RED";

    enemies.forEach(enemy => {
        ctx.fillRect(enemy.col * tileWidth + 4, enemy.row * tileHeight + 4, tileWidth - 4, tileHeight - 4);
    });

}