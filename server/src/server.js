const express = require("express");
const cors = require("cors");
const http = require("http");
const socketio = require("socket.io");

const router = require("./router.js");

const Game = require("./game/game.js");

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);
app.use((req, res) => res.sendFile("../../client/html/index.html", { root: __dirname }));

const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
  socket.on("/addPlayer", (playerData) => {
    console.log("Adding player.");
    game.addPlayer(socket, playerData);
  });

  socket.on("/input", (inputData) => {
    game.input(socket, inputData);
  });

  socket.on("disconnect", () => {
    game.removePlayer(socket);
  });
});

const game = new Game();

const PORT = process.env.PORT || 4000;
server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
