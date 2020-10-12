import { connect, addPlayer } from "./networking.js";
import { startCaptureInput } from "./input.js"
import { startRender } from "./render.js";

Promise.all([connect()]).then(
    () => {
        addPlayer();
        startCaptureInput();
        startRender();
    }
)