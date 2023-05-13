const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const User = require("../../models/Users.model.js");
const Post = require("../../models/Posts.model.js");
const { StatusCode } = require("../../utils/constants.js");
const { jsonGenerate } = require("../../utils/helpers.js");
const Member = require("../../models/Member.model.js");

const listMember = async (req, res) => {
  try {
    const result = await Member.find({ motelId: req.query.motelId });
    return res.json(jsonGenerate(StatusCode.SUCCESS, `List Motel`, result));
  } catch (error) {
    return res.status(500).json({ message: error.message, error });
  }
};

module.exports = listMember;
