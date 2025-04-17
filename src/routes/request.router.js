const express = require("express");
const userAuth = require("../middlewares/auth");
const { sendConnectionReq } = require("../controller/request.controller");
const router = express.Router();

router.post("/request/send", userAuth, sendConnectionReq);

module.exports = router;
