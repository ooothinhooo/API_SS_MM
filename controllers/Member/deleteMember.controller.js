const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const User = require("../../models/Users.model.js");
const Post = require("../../models/Posts.model.js");
const { StatusCode } = require("../../utils/constants.js");
const { jsonGenerate } = require("../../utils/helpers.js");
const Member = require("../../models/Member.model.js");

const deleteMember = async (req, res) => {
  try {
    const result = await Member.findByIdAndDelete(req.query._id);
    return res.status(200).json({ message: " Delete successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message, error });
  }
};

module.exports = deleteMember;
