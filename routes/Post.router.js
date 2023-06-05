const express = require("express");
const createPost = require("../controllers/Posts/createPost.controller.js");
const deletePost = require("../controllers/Posts/deletePost.controller.js");
const updatePost = require("../controllers/Posts/updatePost.controller.js");
const interactPost = require("../controllers/Posts/interactPost.controller.js");
const findOnePost = require("../controllers/Posts/findOnePost.controller.js");
const savePost = require("../controllers/Posts/savePost.controller.js");
const featuredPost = require("../controllers/Posts/featuredPost.controller.js");

const router = express.Router();

router.post("/create", createPost);
router.post("/update", updatePost);
router.delete("/delete", deletePost);
router.post("/interact", interactPost);
router.get("/findone", findOnePost);
router.post("/save", savePost);
router.get("/featured", featuredPost);

module.exports = router;
