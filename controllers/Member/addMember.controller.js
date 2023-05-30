const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const User = require("../../models/Users.model.js");
const Post = require("../../models/Posts.model.js");
const { StatusCode } = require("../../utils/constants.js");
const { jsonGenerate } = require("../../utils/helpers.js");
const Member = require("../../models/Member.model.js");
const rooms = require("../../models/Room.model.js");

const addMember = async (req, res) => {
  try {
    const newPost = await Member.create({ ...req.body });
    // await newPost.save();
    // wait Service.create({
    // return res.status(200).json({ message: "Post created successfully" });
    if (newPost) {
      if (req?.body?.roomId) {
        // const room = await rooms.findById({ _id: req?.body.roomId });
        const result1 = await rooms?.findByIdAndUpdate(
          { _id: req?.body.roomId },
          {
            $push: { member: newPost },
          }
        );
        return res.json(
          jsonGenerate(StatusCode.OK, "Cập Nhật Thành Viên Thành Công", result1)
        );
      }
    }
    return res.json(jsonGenerate(StatusCode.OK, "Thêm Thành Viên Thành Công"));
  } catch (error) {
    return res.status(500).json({ message: error.message, error });
  }
};

module.exports = addMember;
