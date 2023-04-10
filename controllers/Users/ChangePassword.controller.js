const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const User = require("../../models/Users.model.js");

const { StatusCode } = require("../../utils/constants.js");
const { jsonGenerate } = require("../../utils/helpers.js");

const changePassword = async (req, res) => {
  const { oldPassword, password } = req.query;

  try {
    const user = await User.findById(req.userId);
    const salt = await bcrypt.genSalt(10);
    const verified = bcrypt.compareSync(oldPassword, user.password);
    if (!verified)
      return res.json(
        jsonGenerate(
          StatusCode.VALIDATION_ERROR,
          "Mật Khẩu Hiện Tại Không Chính Xác"
        )
      );
    const hashedPassword = await bcrypt.hash(password, salt);
    const verifiedNew = bcrypt.compareSync(password, user.password);
    if (verifiedNew) {
      return res.json(
        jsonGenerate(
          StatusCode.VALIDATION_ERROR,
          "Mật Khẩu Mới Trùng Mật Khẩu Cũ"
        )
      );
    }
    await User.findByIdAndUpdate(req.userId, { password: hashedPassword });
    return res.json(
      jsonGenerate(
        StatusCode.SUCCESS,
        "Thay Đổi Mật Khẩu Thành Công",
        hashedPassword
      )
    );
  } catch (error) {
    return res.status(500).json("Internal server error ");
  }
};

module.exports = changePassword;
