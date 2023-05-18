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
  const JWT_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET;

  const result = await Motels.create({
    userId: req.userId,
    motelName: req.body.motelName,
    motelInfo: req.body.Info,
  });
  // console.log(result?._id);
  if (result) {
    const userx = await User.findOneAndUpdate(
      { _id: req.userId },
      {
        Motel: result?._id,
      }
    );
    if (result) {
      const user = await User.findOne({ _id: req.userId });
      const token = Jwt.sign({ userId: user._id }, JWT_TOKEN_SECRET);
      return res.json(
        jsonGenerate(StatusCode.OK, "Login Successful", {
          userId: user?._id,
          uid: user?.uid,
          username: user?.username,
          email: user?.email,
          avatar: user?.avatar,
          access: user?.access,
          token: token,
          first_name: user?.first_name,
          last_name: user.last_name,
          form: user?.form,
          Motel: user?.Motel,
        })
      );
    }
    return res.json(jsonGenerate(StatusCode.OK, "fail", null));
  }
  } catch (error) {}
};

module.exports = registerMotel;
