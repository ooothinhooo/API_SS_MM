const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const User = require("../../models/Users.model.js");

const { StatusCode } = require("../../utils/constants.js");
const { jsonGenerate } = require("../../utils/helpers.js");

const Login = async (req, res) => {
  const JWT_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET;

  const errors = validationResult(req);

  if (errors.isEmpty()) {
    const { username, password, email } = req.body;
    const user = await User.findOne({
      $or: [
        {
          email: email,
        },
        {
          username: username,
        },
      ],
    });

    if (!user) {
      return res.json(
        jsonGenerate(
          StatusCode.UNPROCESSABLE_ENTITY,
          "Username or password is incorrect"
        )
      );
    }
    const verified = bcrypt.compareSync(password, user.password);
    const token = Jwt.sign({ userId: user._id }, JWT_TOKEN_SECRET);

    if (!verified) {
      return res.json(jsonGenerate(201, "Username or password is incorrect"));
    }

    if (user.access == "admin") {
      return res.json(
        jsonGenerate(100, "ADMIN => Login Successful", {
          userId: user._id,
          uid: user.uid,
          username: username,
          email: user.email,
          avatar: user.avatar,
          access: user.access,
          token: token,
          first_name: user.first_name,
          last_name: user.last_name,
          form: user.form,
          motelId: user.Motel,
        })
      );
    }

    return res.json(
      jsonGenerate(StatusCode.OK, "Login Successful", {
        userId: user._id,
        uid: user.uid,
        username: username,
        email: user.email,
        avatar: user.avatar,
        access: user.access,
        token: token,
        first_name: user.first_name,
        last_name: user.last_name,
        form: user.form,
        Motel: user.Motel,
      })
    );
  }
  res.json(jsonGenerate(202, "Validatiion error", errors.mapped()));
};

module.exports = Login;
