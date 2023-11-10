const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const audioFilePath = path.join(__dirname, "../sound");

router.use(express.static(__dirname));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));
router.use((req, res, next) => {
  req.io = req.app.get("io");
  next();
});

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/totalnote.html"));
});

router.post("/piano", (req, res) => {
  console.log(req.body.note);
  const note = req.body.note;
  switch (note) {
    case "C":
      fs.readFile(
        path.join(audioFilePath, "pianoC.mp3"),
        { encoding: "base64" },
        (err, data) => {
          if (err) {
            console.error("Error reading audio file: ", err);
            return;
          }
          req.io.emit("audio", data);
        }
      );
      break;
    case "D":
      fs.readFile(
        path.join(audioFilePath, "pianoD.mp3"),
        { encoding: "base64" },
        (err, data) => {
          if (err) {
            console.error("Error reading audio file: ", err);
            return;
          }
          req.io.emit("audio", data);
        }
      );
      break;
    case "E":
      fs.readFile(
        path.join(audioFilePath, "pianoE.mp3"),
        { encoding: "base64" },
        (err, data) => {
          if (err) {
            console.error("Error reading audio file: ", err);
            return;
          }
          req.io.emit("audio", data);
        }
      );
      break;
    case "F":
      fs.readFile(
        path.join(audioFilePath, "pianoF.mp3"),
        { encoding: "base64" },
        (err, data) => {
          if (err) {
            console.error("Error reading audio file: ", err);
            return;
          }
          req.io.emit("audio", data);
        }
      );
      break;
    case "G":
      fs.readFile(
        path.join(audioFilePath, "pianoG.mp3"),
        { encoding: "base64" },
        (err, data) => {
          if (err) {
            console.error("Error reading audio file: ", err);
            return;
          }
          req.io.emit("audio", data);
        }
      );
      break;
    case "C+":
      fs.readFile(
        path.join(audioFilePath, "pianoC+.mp3"),
        { encoding: "base64" },
        (err, data) => {
          if (err) {
            console.error("Error reading audio file: ", err);
            return;
          }
          req.io.emit("audio", data);
        }
      );
      break;
    default:
      res.send("Default behavior...");
      break;
  }
  //   if (note === "C") {
  //     fs.readFile(
  //       path.join(audioFilePath, "pianoC.mp3"),
  //       { encoding: "base64" },
  //       (err, data) => {
  //         if (err) {
  //           console.error("Error reading audio file: ", err);
  //           return;
  //         }
  //         req.io.emit("audio", data);
  //       }
  //     );
  //   } else if (note === "D") {
  //     fs.readFile(
  //       path.join(audioFilePath, "pianoD.mp3"),
  //       { encoding: "base64" },
  //       (err, data) => {
  //         if (err) {
  //           console.error("Error reading audio file: ", err);
  //           return;
  //         }
  //         req.io.emit("audio", data);
  //       }
  //     );
  //   } else if (note === "E") {
  //     fs.readFile(
  //       path.join(audioFilePath, "pianoD.mp3"),
  //       { encoding: "base64" },
  //       (err, data) => {
  //         if (err) {
  //           console.error("Error reading audio file: ", err);
  //           return;
  //         }
  //         req.io.emit("audio", data);
  //       }
  //     );
  //   }

  res.status(200).send(req.body.note);
});

router.post("/sym", (req, res) => {
  console.log(req.body.note);
  fs.readFile(
    path.join(audioFilePath, "sym.mp3"),
    { encoding: "base64" },
    (err, data) => {
      if (err) {
        console.error("Error reading audio file: ", err);
        return;
      }
      const io = req.app.get("io");
      io.emit("audio", data);
    }
  );
  res.status(200).send(req.body.note);
});

router.post("/tri", (req, res) => {
  console.log(req.body.note);
  //py로부터 계이름 post요청을 받았으면 이제 홈url로 그에 맞는 audio파일을 보내주어야한다.
  const io = req.app.get("io");
  io.emit("note", req.body.note);
  res.status(200).send(req.body.note);
});

router.post("/cats", (req, res) => {
  console.log(req.body.note);
  //py로부터 계이름 post요청을 받았으면 이제 홈url로 그에 맞는 audio파일을 보내주어야한다.
  const io = req.app.get("io");
  io.emit("note", req.body.note);
  res.status(200).send(req.body.note);
});

module.exports = router;
