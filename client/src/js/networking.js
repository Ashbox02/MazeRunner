import { processGameUpdate } from "./gameUpdate.js";

const ENDPOINT = window.location.hostname + "/";
const socket = io(ENDPOINT);

const connectedPromise = new Promise((resolve => {
    socket.on("connect", () => {
        resolve();
    });
}));

export const connect = () => {
    connectedPromise.then(() => {
        socket.on("/gameUpdate", processGameUpdate);
    })
}

export const addPlayer = (playerData) => {
    console.log("add player reached");
    socket.emit("/addPlayer", playerData);
}

export const handleInput = (e) => {
    if (e.key === "ArrowLeft") socket.emit("/input", "left");
    if (e.key === "ArrowRight") socket.emit("/input", "right");
    if (e.key === "ArrowUp") socket.emit("/input", "up");
    if (e.key === "ArrowDown") socket.emit("/input", "down");
}
