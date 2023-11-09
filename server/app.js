const express = require("express");
const app = express();
const PORT = 3000;
const http = require("http");
const cors = require("cors");
const socketIo = require("socket.io");
const server = http.createServer(app);
const io = socketIo(server);
const path = require("path");
const fs = require("fs");
const audioFilePath = path.join(__dirname, "../piano", "pianoC.mp3");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static(__dirname));
app.use("/piano", express.static(path.join(__dirname, "../piano")));

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

app.get("/socket", (req, res) => {
  fs.readFile(audioFilePath, { encoding: "base64" }, (err, data) => {
    if (err) {
      console.error("Error reading audio file: ", err);
      return;
    }
    io.emit("audio", data);
    // res.send("Audio data sent to clients");
    res.sendFile(path.join(__dirname + "/socket.html"));
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
