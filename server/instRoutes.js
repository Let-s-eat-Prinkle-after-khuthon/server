const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("라우터 제대로 되는지 테스트중");
});

module.exports = router;
