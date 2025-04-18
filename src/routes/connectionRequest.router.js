const express = require("express");
const {
  connectionRequest,
  requestReview,
} = require("../controller/connectionRequest.controller");
const userAuth = require("../middlewares/auth");
const router = express.Router();

router.post(
  "/request/send/:status/:receiverUserId",
  userAuth,
  connectionRequest
);
router.post("/request/review/:status/:requestId", userAuth, requestReview);

module.exports = router;
