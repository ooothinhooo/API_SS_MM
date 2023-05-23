const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const User = require("../../models/Users.model.js");
const Room = require("../../models/Room.model.js");
const Motels = require("../../models/Motels.model.js");

const { StatusCode } = require("../../utils/constants.js");
const { jsonGenerate } = require("../../utils/helpers.js");
const Service = require("../../models/Services.model.js");

const createService = async (req, res) => {
  try {
    const { motelId, name, value, unit } = req.query;

    // const user = await User.findById(req.userId)
    const result = await Service.create({
      motelId: motelId,
      name: name,
      value: value,
      unit: unit,
    });
    const motel = await Motels.findOneAndUpdate(
      { _id: motelId },
      {
        $push: { services: result },
      }
    );

    return res.json(
      jsonGenerate(
        StatusCode.OK,
        `Thêm dịch vụ --- ${name} --- thành công`,
        result
      )
    );
  } catch (error) {}
};

module.exports = createService;
