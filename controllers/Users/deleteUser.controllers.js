const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const User = require("../../models/Users.model.js");

const { StatusCode } = require("../../utils/constants.js");
const { jsonGenerate } = require("../../utils/helpers.js");
const Posts = require("../../models/Posts.model.js");
const Motels = require("../../models/Motels.model.js");

const deleteUser = async (req, res) => {
  try {
    const { _id } = req.query._id;
    const user = await User.findById(_id);

    await Posts.deleteMany({
      _id: { $in: user?.Posts },
    });
    await Motels.deleteMany({
      _id: { $in: user?.Motel },
    });
    await User?.findByIdAndRemove({ _id });
    // return res.json(result);
    return res.json(jsonGenerate(StatusCode.SUCCESS, "deleted", null));
  } catch (error) {
    return res.json(
      jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Could not delete", null)
    );
  }
};

module.exports = deleteUser;
