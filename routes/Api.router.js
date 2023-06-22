const express = require("express");
const featuredPost = require("../controllers/Posts/featuredPost.controller.js");
const findOnePost = require("../controllers/Posts/findOnePost.controller.js");
const searchPost = require("../controllers/Posts/searchPost.controller.js");
const findRoom = require("../controllers/Room/findRoom.controller.js");

const router = express.Router();

router.get("/listposts", featuredPost);
router.get("/getonepost", findOnePost);
router.get("/search", searchPost);
router.get("/findroombill", findRoom);

module.exports = router;
