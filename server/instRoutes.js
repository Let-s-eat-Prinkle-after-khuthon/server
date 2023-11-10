const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const path = require("path");

router.use(express.static(__dirname));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/totalnote.html"));
});

router.post("/piano", (req, res) => {
  console.log(req.body.note);
  //py로부터 계이름 post요청을 받았으면 이제 홈url로 그에 맞는 audio파일을 보내주어야한다.
  //지금은 임시로 req.body.note를 넣어놨지만 이 자리에 audio파일 base64로 인코딩해서 보내줄 예정이다.
  const io = req.app.get("io");
  io.emit("note", req.body.note);
  res.status(200).send(req.body.note);
});

router.post("/sym", (req, res) => {
  console.log(req.body.note);
  //py로부터 계이름 post요청을 받았으면 이제 홈url로 그에 맞는 audio파일을 보내주어야한다.
  const io = req.app.get("io");
  io.emit("note", req.body.note);
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
