const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const User = require("../../models/Users.model.js");
const Post = require("../../models/Posts.model.js");
const { StatusCode } = require("../../utils/constants.js");
const { jsonGenerate } = require("../../utils/helpers.js");

const interactPost = async (req, res) => {
  try {
    const { _id, userId } = req.query;
    try {
      const post = await Post.findById(_id);
      let hasValue = post.likes.includes(req.userId);
      // console.log(hasValue); // true
      if (!hasValue) {
        await post.updateOne({ $push: { likes: req.userId } });
        return res.json(jsonGenerate(StatusCode.SUCCESS, "Like Succssfully"));
      } else {
        await post.updateOne({ $pull: { likes: req.userId } });
        return res.json(jsonGenerate(StatusCode.SUCCESS, "UnLike Succssfully"));
      }
    } catch (error) {
      return res.status(500).json("Internal server error ");
    }
  } catch (error) {}
};

module.exports = interactPost;
