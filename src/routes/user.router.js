const express = require("express");
const userAuth = require("../middlewares/auth");
const {
  requestesReceived,
  getMyConnections,
  getMyFeed,
} = require("../controller/user.controller");
const router = express.Router();

router.get("/user/requests/received", userAuth, requestesReceived);
router.get("/user/my_connections", userAuth, getMyConnections);
router.get("/user/feed", userAuth, getMyFeed);

module.exports = router;
