const express = require("express");
const userAuth = require("../middlewares/auth");
const { userProfile } = require("../controller/profile.controller");

const router = express.Router();

router.get("/profile/view", userAuth, userProfile);

module.exports = router;
