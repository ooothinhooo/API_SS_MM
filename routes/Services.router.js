const express = require("express");
const createService = require("../controllers/Services/createService.controller.js");
const deleteService = require("../controllers/Services/deleteService.controller.js");
const addServiceToRoom = require("../controllers/Services/addServiceToRoom.controller.js");

const router = express.Router();

router.post("/create", createService);
router.delete("/delete", deleteService);
// router.post("/update", createService);
router.post("/addservice", addServiceToRoom);

// router.post("/", Register);

module.exports = router;
