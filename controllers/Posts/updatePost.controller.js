const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const User = require("../../models/Users.model.js");
const Post = require("../../models/Posts.model.js");
const { StatusCode } = require("../../utils/constants.js");
const { jsonGenerate } = require("../../utils/helpers.js");

const updatePost = async (req, res) => {
  try {
    const result = await Post.findOne({
      $and: [{ _id: req.query._id }, { userId: req.userId }],
    });
    if (result) {
      await Post.findByIdAndUpdate({ _id: req.query._id }, req.body);
      return res.json(
        jsonGenerate(StatusCode.OK, "Post Update Successfully", null)
      );
    }
  } catch (error) {
    return res.status(500).json({ message: error.message, error });
  }
};

module.exports = updatePost;
