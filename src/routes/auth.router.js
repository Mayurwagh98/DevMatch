const express = require("express");
const { signup, login } = require("../controller/auth.controller");
const userAuth = require("../middlewares/auth");

const router = express.Router();

router.post("/auth/signup", signup);
router.post("/auth/login", userAuth, login);

module.exports = router;
