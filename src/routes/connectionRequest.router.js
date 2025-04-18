const express = require("express");
const {
  connectionRequest,
} = require("../controller/connectionRequest.controller");
const userAuth = require("../middlewares/auth");
const router = express.Router();

router.post(
  "/request/send/:status/:receiverUserId",
  userAuth,
  connectionRequest
);

module.exports = router;
