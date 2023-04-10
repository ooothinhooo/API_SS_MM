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
    const { newWater, oldWater, roomId } = req.query;
    const result = await Room.findOne({
      $and: [{ _id: roomId }, { userId: req.userId }],
    });
    if (result) {
      const x = await Room.updateOne({ _id: roomId }, { $pop: { water: 1 } });
      return res.json(jsonGenerate(StatusCode.OK, "Xoa Thanh cong"));
    } else {
      return res.json(jsonGenerate(StatusCode.BADREQUEST, "Xoa Thất Bại"));
    }

  } catch (error) {}
};

module.exports = deleteWater;
