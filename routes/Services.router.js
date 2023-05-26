const express = require("express");
const createService = require("../controllers/Services/createService.controller.js");
const deleteService = require("../controllers/Services/deleteService.controller.js");
const addServiceToRoom = require("../controllers/Services/addServiceToRoom.controller.js");
const getListServiceMotel = require("../controllers/Services/getListServiceMotel.controller.js");
const updateService = require("../controllers/Services/updateService.controller.js");

const router = express.Router();

router.get("/listservice", getListServiceMotel);
router.post("/create", createService);
router.delete("/delete", deleteService);
router.put("/update", updateService);
router.post("/addservice", addServiceToRoom);

// router.post("/", Register);

module.exports = router;
