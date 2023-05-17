const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const User = require("../../models/Users.model.js");
const Post = require("../../models/Posts.model.js");
const { StatusCode } = require("../../utils/constants.js");
const { jsonGenerate } = require("../../utils/helpers.js");
const Member = require("../../models/Member.model.js");

const getOneMember = async (req, res) => {
  try {
    const result = await Member.findById({ _id: req.query.memberId }).populate(
      "roomId"
    );
    return res.json(
      jsonGenerate(StatusCode.OK, "Thông tin thành viên", result)
    );
  } catch (error) {
    return res.status(500).json({ message: error.message, error });
  }
};

module.exports = getOneMember;
