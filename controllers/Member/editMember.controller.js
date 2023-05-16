const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const User = require("../../models/Users.model.js");
const Post = require("../../models/Posts.model.js");
const { StatusCode } = require("../../utils/constants.js");
const { jsonGenerate } = require("../../utils/helpers.js");
const Member = require("../../models/Member.model.js");

const editMember = async (req, res) => {
  try {
    const result = await Member.findByIdAndUpdate(
      { _id: req.query.memberId },
      { ...req.body }
    );

    return res.json(
      jsonGenerate(StatusCode.OK, "Cập Nhật Thành Viên Thành Công", result)
    );
  } catch (error) {
    return res.status(500).json({ message: error.message, error });
  }
};

module.exports = editMember;
