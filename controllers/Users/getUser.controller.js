const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const User = require("../../models/Users.model.js");

const { StatusCode } = require("../../utils/constants.js");
const { jsonGenerate } = require("../../utils/helpers.js");

const getUser = async (req, res) => {
  try {
    // var uid = req.query.uid;
    const infoCreators = await User.findById({ _id: req.userId })
      .select("-password")
      //   .select("-password")
      .populate("Posts")
      .populate("SavePost")
      .populate("Motel")
      .exec();

    return res.json(jsonGenerate(StatusCode.SUCCESS, `User`, infoCreators));
  } catch (error) {
    return res.json(
      jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Error", error)
    );
  }
};

module.exports = getUser;
