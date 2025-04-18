const express = require("express");
const userAuth = require("../middlewares/auth");
const { requestesReceived } = require("../controller/user.controller");
const router = express.Router();

router.get("/user/requests/received", userAuth, requestesReceived);

module.exports = router;
