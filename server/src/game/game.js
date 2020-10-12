const Maze = require("./maze.js");
const Player = require("./player.js");
const Constants = require("../../../Constants/constantServer.js");
const Enemy = require("./enemy.js");
const { playerEnemyCollision } = require("./collisions");

class Game {
  constructor() {
    this.sockets = {};
    this.players = {};
    this.lastUpdateTime = Date.now();
    this.shouldSendUpdate = false

    this.maze = new Maze(Constants.NUM_TILES_WIDTH, Constants.NUM_TILES_HEIGHT);

    this.enemies = [];
    this.enemies.push(new Enemy(10, 9, this.maze.getMaze()));
    this.enemies.push(new Enemy(10, 10, this.maze.getMaze()));
    this.enemies.push(new Enemy(10, 11, this.maze.getMaze()));


    setInterval(this.update.bind(this), 1000 / 60);
  }

  addPlayer(socket) {
    this.sockets[socket.id] = socket;
    this.players[socket.id] = new Player(socket.id, 0, 0, this.maze.getMaze());
  }

  removePlayer(socket) {
    delete this.sockets[socket.id];
    delete this.players[socket.id];
  }

  input(socket, inputData) {
    this.players[socket.id].input(inputData);
  }

  update() {
    // Calculate time elapsed
    const now = Date.now();
    const dt = (now - this.lastUpdateTime) / 1000;
    this.lastUpdateTime = now;

    // Update each player
    Object.keys(this.sockets).forEach((playerID) => {
      const player = this.players[playerID];
      player.update(dt);
    });

    for (let i = 0; i < this.enemies.length; i++) {
      this.enemies[i].update();
    }

    if (this.shouldSendUpdate) {
      Object.keys(this.sockets).forEach((playerID) => {
        const socket = this.sockets[playerID];
        const player = this.players[playerID];
        socket.emit("/gameUpdate", this.sendUpdate(player));
      });
      this.shouldSendUpdate = false;
    } else {
      this.shouldSendUpdate = true;
    }

    //collisions
    playerEnemyCollision(Object.values(this.players), this.enemies);
  }

  sendUpdate(player) {
    let otherPlayers = Object.values(this.players).filter(p => p != player);

    return {
      t: Date.now(),
      maze: this.maze.getMaze(),
      enemies: this.enemies.map(e => e.serializeForUpdate()),
      player: player.serializeForUpdate(),
      otherPlayers: otherPlayers.map(p => p.serializeForUpdate()),
    }
  }
}

module.exports = Game;
