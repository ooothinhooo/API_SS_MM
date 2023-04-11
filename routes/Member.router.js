const express = require("express");
const addMember = require("../controllers/Member/addMember.controller.js");

const router = express.Router();

router.post("/add", addMember);

// router.post("/", Register);

module.exports = router;
