const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const User = require("../../models/Users.model.js");
const Post = require("../../models/Posts.model.js");
const { StatusCode } = require("../../utils/constants.js");
const { jsonGenerate } = require("../../utils/helpers.js");

const createPost = async (req, res) => {
  try {
    const newPost = new Post({ ...req.body, userId: req.userId });
    await newPost.save();

    const post = await Post.findById({ _id: newPost._id }).populate(
      "userId likes",
      "username avatar first_name last_name"
    );
    if (newPost) {
      const user = await User.findOneAndUpdate(
        { _id: req.userId },
        {
          $push: { Posts: newPost },
        }
      );
    }
    return res
      .status(200)
      .json({ message: "Post created successfully", newPost: post });
  } catch (error) {
    return res.status(500).json({ message: error.message, error });
  }
  //   try {
  //     const result = await Post.create({
  //       userId: req.userId,
  //       ...req.body,
  //     });

  //     if (result) {
  //       const user = await User.findOneAndUpdate(
  //         { _id: req.userId },
  //         {
  //           $push: { posts: result },
  //         }
  //       );
  //       const post = await Post.findById({ _id: result._id }).populate(
  //         "user likes",
  //         "username avatar first_name last_name"
  //       );
  //       return res.json(
  //         jsonGenerate(StatusCode.SUCCESS, "Posts created Succssfully", post)
  //       );
  //     }
  //   } catch (error) {
  //     return res.json(
  //       jsonGenerate(
  //         StatusCode.UNPROCESSABLE_ENTITY,
  //         "Something went wrong",
  //         error
  //       )
  //     );
  //   }
};

module.exports = createPost;
