const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const User = require("../../models/Users.model.js");
const Room = require("../../models/Room.model.js");
const Motels = require("../../models/Motels.model.js");

const { StatusCode } = require("../../utils/constants.js");
const { jsonGenerate } = require("../../utils/helpers.js");
const Service = require("../../models/Services.model.js");

const registerMotel = async (req, res) => {
  try {
    const JWT_TOKEN_SECRET = process.env.JWT_TOKEN_SECRET;

    const result = await Motels.create({
      userId: req.userId,
      motelName: req.body.motelName,
      phone: req.body.phone,
    });

    // console.log(result?._id);
    if (result) {
      ServiceData = [
        { motelId: result, name: "Tiền Điện", value: "3000", unit: "kwh" },
        { motelId: result, name: "Tiền Nước", value: "8000", unit: "met" },
      ];
      const ServiceArray = [];
      ServiceData.map((item) => {
        ServiceArray.push(Service.create(item));
        console.log(
          ` Created service: ${item.name} - ${item.value} - ${item.unit}`
        );
      });

      const service = await Promise.all(ServiceArray);
      const motel = await Motels.findOneAndUpdate(
        { _id: result },
        {
          $push: { services: service },
        }
      );
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
