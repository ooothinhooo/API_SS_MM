const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const User = require("../../models/Users.model.js");
const Room = require("../../models/Room.model.js");
const Motels = require("../../models/Motels.model.js");

const { StatusCode } = require("../../utils/constants.js");
const { jsonGenerate } = require("../../utils/helpers.js");

const deleteWater = async (req, res) => {
  try {
    const x = await Room.updateOne(
      { _id: req.body.roomId },
      { $pop: { water: 1 } }
    );
    return res.json(jsonGenerate(StatusCode.ACCEPTED, "Xoa Thanh cong"));
  } catch (error) {}
};

module.exports = deleteWater;
