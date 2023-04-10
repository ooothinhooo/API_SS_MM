const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const User = require("../../models/Users.model.js");
const { StatusCode } = require("../../utils/constants.js");
const { jsonGenerate } = require("../../utils/helpers.js");

const Register = async (req, res) => {
  const JWT_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET;
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    const {
      form,
      first_name,
      last_name,
      username,
      email,
      password,
      avatar,
      isSex,
      phone,
    } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const userExist = await User.findOne({
      $or: [
        {
          email: email,
        },
        {
          username: username,
        },
      ],
    });

    //!User or Email already exists
    if (userExist) {
      return res.json(
        jsonGenerate(
          StatusCode.UNPROCESSABLE_ENTITY,
          "User or Email already exists"
        )
      );
    }
    //! save to db
    try {
      const result = await User.create({
        form: form,
        username: username,
        email: email,
        password: hashPassword,
        avatar: avatar,
        first_name: first_name,
        last_name: last_name,
        isSex: isSex,
        phone: phone,
      });

      const token = Jwt.sign({ userId: result._id }, JWT_TOKEN_SECRET);
      //! Registration successful
      res.json(
        jsonGenerate(StatusCode.OK, "Registration successful", {
          userId: result._id,
          token: token,
        })
      );
    } catch (error) {
      console.log(error);
    }
  } else {
    res.json(
      jsonGenerate(
        StatusCode.VALIDATION_ERROR,
        "Validation error",
        errors.mapped()
      )
    );
  }
};
module.exports = Register;
