const express = require("express");
const Login = require("../controllers/Account/Login.controller.js");
const Register = require("../controllers/Account/Register.controller.js");

const router = express.Router();

router.post("/login", Login);
router.post("/register", Register);

module.exports = router;
