const express = require("express");
const addMemberToRoom = require("../controllers/Room/addMemberToRoom.controller.js");
const deleteRoom = require("../controllers/Room/deleteMemberToRoom.controller.js");
// const editRoom = require("../controllers/Motels/editRoom.controller.js");
const editRoom = require("../controllers/Room/editMemberToRoom.controller.js");
const addEle = require("../controllers/Electricity/add_ele.controller.js");
const deleteEle = require("../controllers/Electricity/delete_ele.controller.js");
const addWater = require("../controllers/Water/add_water.controller.js");
const deleteWater = require("../controllers/Water/delete_water.controller.js");

const router = express.Router();

router.post("/add", addMemberToRoom);
router.delete("/delete", deleteRoom);
router.put("/edit", editRoom);
// router.post("/", Register);

router.post("/addele", addEle);
router.delete("/deleteele", deleteEle);
//!

router.post("/addwater", addWater);
router.delete("/deletewater", deleteWater);

module.exports = router;
