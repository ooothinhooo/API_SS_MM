const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const User = require("../../models/Users.model.js");

const { StatusCode } = require("../../utils/constants.js");
const { jsonGenerate } = require("../../utils/helpers.js");

const findOneUser = async (req, res) => {
  try {
    // var uid = req.query.uid;
    const infoCreators = await User.findById({ _id: req.query._id })
      .select("-password")
      //   .select("-password")
      .populate("Posts")
      .populate("SavePost")
      .exec();

    return res.json(
      jsonGenerate(StatusCode.SUCCESS, `User => ${req.query._id}`, infoCreators)
    );
  } catch (error) {
    return res.json(
      jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Error", error)
    );
  }
};

module.exports = findOneUser;
