const express = require("express");
const addMemberToRoom = require("../controllers/Room/addMemberToRoom.controller.js");
const deleteRoom = require("../controllers/Room/deleteMemberToRoom.controller.js");
// const editRoom = require("../controllers/Motels/editRoom.controller.js");
const editRoom = require("../controllers/Room/editMemberToRoom.controller.js");
const addEle = require("../controllers/Electricity/add_ele.controller.js");
const deleteEle = require("../controllers/Electricity/delete_ele.controller.js");
const addWater = require("../controllers/Water/add_water.controller.js");
const deleteWater = require("../controllers/Water/delete_water.controller.js");
const CreateBill = require("../controllers/Bill/CreateBill.js");
const UpdateBill = require("../controllers/Bill/UpdateBill.js");
const DeleteBill = require("../controllers/Bill/DeleteBill.js");
const DeleteAllBill = require("../controllers/Bill/DeleteAllBill.js");

const router = express.Router();

router.post("/add", addMemberToRoom);
router.delete("/delete", deleteRoom);
router.put("/edit", editRoom);
// router.post("/", Register);

router.post("/createbill", CreateBill);
router.post("/updatebill", UpdateBill);
router.delete("/deletebill", DeleteBill);
router.delete("/deleteallbill", DeleteAllBill);

router.post("/addele", addEle);
router.delete("/deleteele", deleteEle);
//!

router.post("/addwater", addWater);
router.delete("/deletewater", deleteWater);

module.exports = router;
