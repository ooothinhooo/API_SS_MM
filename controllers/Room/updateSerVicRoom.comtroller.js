const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const User = require("../../models/Users.model.js");
const Room = require("../../models/Room.model.js");
const Motels = require("../../models/Motels.model.js");

const { StatusCode } = require("../../utils/constants.js");
const { jsonGenerate } = require("../../utils/helpers.js");

const updateServiceToRoom = async (req, res) => {
  try {
    const data = ({
      roomId,
      checkIn,
      roomFee,
      deposit,
      electricityPrice,
      waterPrice,
      term,
    } = req.body);

    const result = await Room.findByIdAndUpdate({ _id: roomId }, data);
    return res.json(jsonGenerate(StatusCode.OK, "Cập Nhật Thành Công", result));
  } catch (error) {}
};

module.exports = updateServiceToRoom;
