const express = require("express");
const featuredPost = require("../controllers/Posts/featuredPost.controller.js");
const findOnePost = require("../controllers/Posts/findOnePost.controller.js");
const searchPost = require("../controllers/Posts/searchPost.controller.js");

const router = express.Router();

router.get("/listposts", featuredPost);
router.get("/getonepost", findOnePost);
router.get("/search", searchPost);

module.exports = router;
