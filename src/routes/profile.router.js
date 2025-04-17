const express = require("express");
const userAuth = require("../middlewares/auth");
const {
  userProfile,
  updateProfile,
} = require("../controller/profile.controller");

const router = express.Router();

router.get("/profile/view", userAuth, userProfile);
router.patch("/profile/edit", userAuth, updateProfile);

module.exports = router;
