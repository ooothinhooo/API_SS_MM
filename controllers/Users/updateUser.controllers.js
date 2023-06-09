const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const User = require("../../models/Users.model.js");

const { StatusCode } = require("../../utils/constants.js");
const { jsonGenerate } = require("../../utils/helpers.js");

const updateUser = async (req, res) => {
  try {
    const _id = req.userId;
    const { first_name, last_name, email, phone, avatar, isSex } = req.body;
    const data = { first_name, last_name, email, phone, avatar, isSex };
    const UserInfo = await User.findById(_id);
    let userExist = false;
    if (UserInfo.email != email) {
      userExist = await User.findOne({
        $or: [
          {
            email: email,
          },
        ],
      });
    }

    //!User or Email already exists
    if (userExist) {
      return res.json(
        jsonGenerate(
          StatusCode.UNPROCESSABLE_ENTITY,
          " Email  already exists",
          UserInfo.email
        )
      );
    }
    try {
      const result = await User.findByIdAndUpdate(_id, data);
      return res.json(
        jsonGenerate(
          StatusCode.OK,
          "Update Personal Information Successfully",
          result
        )
      );
    } catch (error) {
      return res.status(500).json("Internal server error ");
    }
  } catch (error) {}
};

module.exports = updateUser;
