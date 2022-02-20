const express = require("express");
const camera = require("raspberry-pi-camera-native");

const app = express();

camera.start({
    width: 1280,
    height: 720,
    fps: 30,
    encoding: "JPEG",
    quality: 7
});

app.get("/stream.mjpg", (req, res) => {

    console.log(req.socket.remoteAddress + " connected.");

    res.writeHead(200, {
        "Cache-Control": "no-store, no-cache, must-revalidate, pre-check=0, post-check=0, max-age=0",
        "Pragma": "no-cache",
        "Connection": "close",
        "Content-Type": "multipart/x-mixed-replace; boundary=--myboundary"
    });

    let isReady = true;
    const frameHandler = (frame) => {

        if (!isReady) return;
        isReady = false;

        res.write(`--myboundary\nContent-Type: image/jpg\nContent-length: ${frame.length}\n\n`);
        res.write(frame, () => isReady = true);
    }

    const frameEmitter = camera.on("frame", frameHandler);
    req.on("close", () => {
        frameEmitter.removeListener("frame", frameHandler);
        console.log(req.socket.remoteAddress + " disconnected.");
    });
});

app.listen(3000, () => console.log("App listening."));