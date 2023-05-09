const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const User = require("../../models/Users.model.js");
const Room = require("../../models/Room.model.js");
const Motels = require("../../models/Motels.model.js");

const { StatusCode } = require("../../utils/constants.js");
const { jsonGenerate } = require("../../utils/helpers.js");

const registerMotel = async (req, res) => {
  try {
    const result = await Motels.create({
      userId: req.userId,
      motelName: req.body.motelName,
      motelInfo: req.body.Info,
    });
    // console.log(result?._id);
    if (result) {
      const user = await User.findOneAndUpdate(
        { _id: req.userId },
        {
          Motel: result?._id,
        }
      );
      // console.log(user);
      return res.json(
        jsonGenerate(StatusCode.OK, "created Succssfully", result)
      );
    }
  } catch (error) {}
};

module.exports = registerMotel;
