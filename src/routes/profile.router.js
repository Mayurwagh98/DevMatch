const express = require("express");
const userAuth = require("../middlewares/auth");
const {
  userProfile,
  updateProfile,
  deleteProfile,
} = require("../controller/profile.controller");

const router = express.Router();

router.get("/profile/view", userAuth, userProfile);
router.patch("/profile/edit", userAuth, updateProfile);
router.delete("/profile/delete", userAuth, deleteProfile);

module.exports = router;
