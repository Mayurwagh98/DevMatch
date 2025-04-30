const express = require("express");
const userAuth = require("../middlewares/auth");
const { chat } = require("../controller/chat.controller");
const router = express.Router();

router.get("/chat/:receiverId", userAuth, chat);

module.exports = router;
