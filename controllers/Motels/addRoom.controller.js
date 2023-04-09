const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const User = require("../../models/Users.model.js");
const Room = require("../../models/Room.model.js");
const Motels = require("../../models/Motels.model.js");

const { StatusCode } = require("../../utils/constants.js");
const { jsonGenerate } = require("../../utils/helpers.js");

const addRoom = async (req, res) => {
  try {
    const { room_Code, motel_Id } = req.body;
    // const user = await User.findById(req.userId)
    const result = await Room.create({
      room_Code: room_Code,
    });
    if (result) {
      const Motel = await Motels.findOneAndUpdate(
        { _id: motel_Id },
        {
          $push: { Room: result },
        }
      );
      return res.json(
        jsonGenerate(
          StatusCode.SUCCESS,
          `Thêm phòng ${room_Code} thành công`,
          result
        )
      );
    }
  } catch (error) {}
};

module.exports = addRoom;
