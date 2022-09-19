const express = require("express");
const { signup, login } = require("../controllers/auth");
const { createChannel } = require("../controllers/channel");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ message: "Hello from revirt-chat powered by streamIO" });
});

router.post("/signup", signup);

router.post("/login", login);

router.post("/channel", createChannel);

module.exports = router;
