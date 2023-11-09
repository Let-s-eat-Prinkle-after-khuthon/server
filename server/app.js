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

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.static(__dirname));
app.use("/piano", express.static(path.join(__dirname, "../piano")));

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("note", (data) => {
    //시그널링 데이터를 다른 피어로 전달
    //signal이라는 이벤트로 송신오면 메세지가 data인수에 담긴다
    console.log(data);

    //클라이언트로 메세지 송신
    //note이라는 이벤트로 data 송신
    io.emit("note", data);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

app.get("/socket", (req, res) => {
  res.sendFile(path.join(__dirname + "/socket.html"));
});

app.post("/piano", (req, res) => {
  const audioFilePath = path.join(__dirname, "../piano", "pianoC.mp3");
  res.sendFile(audioFilePath);
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
