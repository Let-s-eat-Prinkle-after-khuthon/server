const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const path = require("path");

router.use(express.static(__dirname));
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/socket.html"));
});

router.post("/", (req, res) => {
  console.log(req.body.note);
  res.status(200).send(req.body.note);
});

module.exports = router;
