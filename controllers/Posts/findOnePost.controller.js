const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const User = require("../../models/Users.model.js");
const Post = require("../../models/Posts.model.js");
const { StatusCode } = require("../../utils/constants.js");
const { jsonGenerate } = require("../../utils/helpers.js");

const findOnePost = async (req, res) => {
  try {
    // const { _id } = req.body;
    const list = await Post.findById({ _id: req.query._id })
      .populate("userId likes", "username avatar first_name last_name")
      .populate({
        path: "comments",
        populate: {
          path: "userId likes",
          select: "username avatar first_name last_name",
        },
      })
      .sort({ createdAt: -1 });
    return res.json(jsonGenerate(StatusCode.OK, "All Posts List", list));
  } catch (error) {
    return res.json(
      jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Error", error)
    );
  }
};

module.exports = findOnePost;
