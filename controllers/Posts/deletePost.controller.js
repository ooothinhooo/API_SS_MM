const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const User = require("../../models/Users.model.js");
const Post = require("../../models/Posts.model.js");
const Comment = require("../../models/Comment.model.js");
const { StatusCode } = require("../../utils/constants.js");
const { jsonGenerate } = require("../../utils/helpers.js");

const deletePost = async (req, res) => {
  try {
    const { _id } = req.query;
    const result = await Post.findOne({
      $and: [{ _id }, { userId: req.userId }],
    });
    if (!result) {
      return res.json(
        jsonGenerate(StatusCode.BADREQUEST, "Could not delete", null)
      );
    }
    const post = await Post.findOneAndDelete({ _id: _id });
    await Comment.deleteMany({ _id: { $in: post.comments } });
    if (post) {
      const user = await User.findOneAndUpdate(
        { _id: req.userId },
        { $pull: { posts: _id } }
      );
    }
    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message, error });
  }
};

module.exports = deletePost;
