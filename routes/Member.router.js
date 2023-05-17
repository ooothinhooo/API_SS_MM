const express = require("express");
const addMember = require("../controllers/Member/addMember.controller.js");
const listMember = require("../controllers/Member/ListMemberOnMotel.controller.js");
const deleteMember = require("../controllers/Member/deleteMember.controller.js");
const listMemberOnRoom = require("../controllers/Member/ListMemberOnRoom.controller.js");
const listMemberNoRoom = require("../controllers/Member/ListMemberNoRoom.controller.js");
const editMember = require("../controllers/Member/editMember.controller.js");
const getOneMember = require("../controllers/Member/getOneMember.controller.js");

const router = express.Router();

router.post("/add", addMember);
router.post("/edit", editMember);
router.put("/delete", deleteMember);
router.get("/listmember", listMember);
router.get("/listmemberonroom", listMemberOnRoom);
router.get("/listmembernoroom", listMemberNoRoom);
router.get("/info", getOneMember);

// router.post("/", Register);

module.exports = router;
