const express = require("express");
const { signup, login, logout } = require("../controller/auth.controller");
const userAuth = require("../middlewares/auth");

const router = express.Router();

router.post("/auth/signup", signup);
router.post("/auth/login", login);
router.post("/auth/logout", logout);

module.exports = router;
