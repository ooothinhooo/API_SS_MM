const express = require("express");
const registerMotel = require("../controllers/Motels/registerMotel.controller.js");
const addRoom = require("../controllers/Motels/addRoom.controller.js");
const deleteRoom = require("../controllers/Motels/deleteRoom.controller.js");
const listRoom = require("../controllers/Motels/ListRoom.controller.js");
const getOneRoom = require("../controllers/Motels/getOneRoom.controller.js");

const router = express.Router();

router.post("/register_motel", registerMotel);
router.post("/addroom", addRoom);
router.delete("/deleteroom", deleteRoom);
//?
router.post("/listroom", listRoom);
router.get("/getoneroom", getOneRoom);

// router.post("/", Register);

module.exports = router;
