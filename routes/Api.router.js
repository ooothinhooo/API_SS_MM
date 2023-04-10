const express = require("express");
const featuredPost = require("../controllers/Posts/featuredPost.controller.js");

const router = express.Router();

router.get("/listposts", featuredPost);

module.exports = router;
