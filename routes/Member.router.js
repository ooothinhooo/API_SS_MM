const express = require("express");
const addMember = require("../controllers/Member/addMember.controller.js");
const listMember = require("../controllers/Member/ListMemberOnMotel.controller.js");
const deleteMember = require("../controllers/Member/deleteMember.controller.js");

const router = express.Router();

router.post("/add", addMember);
router.put("/delete", deleteMember);
router.get("/listmember", listMember);

// router.post("/", Register);

module.exports = router;
